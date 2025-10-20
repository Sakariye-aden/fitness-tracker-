import React, { useEffect, useOptimistic, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router'
import { FetchLatestExercise } from '../lib/exercise'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { useTransition } from 'react'
import { FiEdit2, FiEye, FiTrash2 } from 'react-icons/fi'

const ManagePage = () => {

     const { user } = useAuth()
    const navigate = useNavigate()
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [totalCount, setTotalCount] = useState(0)
    const [articleToDelete, setArticleToDelete] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isPending , startTransition ] = useTransition()


    const[optimisticArticles, updateOptimisticArticles] = useOptimistic(articles,(state, articleToremove)=>state.filter(article =>article.id !== articleToremove))



     useEffect(()=>{

           if(user){
             fetchUserArticles()
           }else{
             navigate('/signin')
           }

     },[user])

    const fetchUserArticles = async () => {

        try {
            setLoading(true)
            const { data, count } = await FetchLatestExercise(user.id ,50)

            setArticles(data)
            setTotalCount(count[0].count)

            console.log("exercises", data )

        } catch (error) {

            console.error('Error fetching articles:', error)
            setError('Failed to load your articles. Please try again.')
            toast.error('Failed to load your articles')

        } finally {
            setLoading(false)
        }

    }


   


    const formatDate = (dateString) => {
        if (!dateString) return ''

        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }





  return (
   <div className='min-h-screen'>
      <div className='bg-gradient-to-r from-orange-500 to-amber-500 h-60 flex items-center p-2 md:p-4'>
         <div className='w-full flex justify-between items-center gap-8 flex-wrap p-2 md:p-4 '> 
                <div>
                    <h2 className='text-2xl md:text-3xl  text-white font-bold '>Manage Your Workouts </h2>
                    <p className='text-white mt-1'>Create , edit , and Manage your published workouts </p>
                </div>
                <Link to='/workout'className='text-orange-700 bg-white rounded  h-10 px-4  flex space-x-2 shadow-lg items-center'>
                    <LuPlus /> 
                    <span > Create workout</span> 
                </Link>
         </div>
     </div>

      {/* workOut Table  */}
               {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (<div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-700"></div>
                </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                        <FiAlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                        <h3 className="text-lg font-medium text-red-800 mb-2">{error}</h3>
                        <button
                            onClick={fetchUserArticles}
                            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
                        >
                            Try Again
                        </button>
                    </div>
                ) : optimisticArticles.length === 0 ? (


                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                            <FiPlus className="h-10 w-10 text-orange-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Articles Yet</h2>
                        <p className="text-gray-500 max-w-md mx-auto mb-8">
                            You haven't created any articles yet. Start writing your first article and share your knowledge!
                        </p>
                        <Link
                            to="/workout"
                            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-xl shadow-md hover:bg-orange-700 transition-colors duration-200"
                        >
                            <FiPlus className="mr-2" />
                            Create Your First Article
                        </Link>
                    </div>
                ) : (

                    <div className="space-y-8">
                        {/* Published Articles Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <span>Published Articles</span>
                                {articles.length > 0 && (
                                    <span className="ml-3 px-2.5 py-0.5 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                                        {articles.length}
                                    </span>
                                )}
                            </h2>


                            {articles.length > 0 ? (

                                <div className="bg-white rounded-xl overflow-hidden shadow-md">

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Name
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Date
                                                    </th>

                                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Reps
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        duration
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {articles.map(article => (

                                                    <tr key={article.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                                                {article.exercise_name}
                                                            </div>
                                                        </td>

                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-500">
                                                                {formatDate(article.created_at)}
                                                            </div>
                                                        </td>

                                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                                            <div className="text-sm text-gray-500">
                                                                {article.reps}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                                            <div className="text-sm text-gray-500">
                                                                {article.duration}
                                                            </div>
                                                        </td>

                                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                                            <div className="flex justify-end space-x-2">

                                                                <Link
                                                                    // to={`/editor/${article.id}`}
                                                                    className="p-2 text-orange-900 hover:text-orange-800 rounded-full hover:bg-orange-50"
                                                                    title="Edit Article"
                                                                >
                                                                    <FiEdit2 />
                                                                </Link>


                                                                <button
                                                                    // onClick={() => confirmDelete(article)}
                                                                    className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50 cursor-pointer"
                                                                    title="Delete Article"
                                                                >
                                                                    <FiTrash2 />
                                                                </button>

                                                            </div>
                                                        </td>

                                                    </tr>
                                                ))}
                                            </tbody>

                                        </table>

                                    </div>

                                </div>
                            ) : <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100">
                                <p className="text-gray-500">You don't have any published articles yet</p>
                            </div>}
                        </div>
                    </div>
                )} </div>

   </div>
  )
}

export default ManagePage