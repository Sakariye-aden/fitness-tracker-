import React, { useEffect, useState } from 'react'
 import { Bar ,Doughnut , Line } from 'react-chartjs-2'
 import { Chart as Chartjs } from 'chart.js/auto'
import { useAuth } from '../context/AuthContext'
import supabase from '../lib/supabase'
import { FetchLatestExercise } from '../lib/exercise'
import { GiTrophyCup } from 'react-icons/gi'
import { BsStars } from 'react-icons/bs'
import { Link } from 'react-router'

const ProgressPage = () => {
     
    const [userData , setUserData] = useState([]);
    const [recent , setRecent] = useState([]);
    const [isLoading , setIsloading]= useState(false)

    const {user } = useAuth()

    useEffect(()=>{

          //  fetch All exercises
           const fetchExercises = async () =>{
              
              setIsloading(true)
              try {
                 const {data , error}= await supabase.from('exercises')
                             .select('*')
                             .eq('author_id', user.id) 

                       if(error) throw new Error('error is happen :',error)    
                        
                      console.log('progressData :',data);  
                    
                     setUserData(data || []) 
              } catch (error) {
                 console.error(error);
              }finally{
                setIsloading(false)
              }
           }
         
           fetchExercises()

          //  get Recent Active 
          const getRecentActvity = async ()=>{
             try {
               const result = await FetchLatestExercise(user.id , 3 )

                // console.log('result :',result);
                setRecent(result || [])
               
             } catch (error) {
               console.log(error);
             }
          }

          getRecentActvity()
          
    },[])


     
   const getDifferentColor= (color)=>{
     switch(color){
       case 'Beginner':
         return 'bg-blue-200  font-medium '
       case 'Intermediate':
         return 'bg-yellow-100 font-medium '
       case 'Advanced':
         return 'bg-green-200 font-medium '
     }
   }

// TotalReps
    const TotalReps = userData.reduce((prev , next)=>{
        return prev + next.reps
      },0)
      
//  Total Duration
    const TotalDuration = userData.reduce((prev, next)=>{
         return prev + next.duration 
    },0)

    if(isLoading){
       return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
    )
    }
   


     if(userData.length == 0 ){
      return (
          <div className='flex flex-col items-center mt-20 min-h-screen text-center'>
              <h2 className='text-2xl font-semibold my-2'>No progress yet..</h2>
              <p className='text-gray-500 mb-4 px-4'>you haven't logged any workouts yet. start your frist session now!</p>
              <Link to={'/workout'} className='bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition'>
                Go to workout Page
              </Link>
            </div>
      )
     }



     

  return (
 
       <div className='min-h-screen bg-gray-50'>
          <div className='max-w-4xl mx-auto min-h-screen'>
               {/* header */}
               <div>
                  <h1 className='p-2 text-gray-700 text-3xl font-bold'>Your Progress</h1>
                    <p className='px-2 text-gray-500 text-lg'>Track how far you've come!</p>
               </div>

               <div className='flex justify-end mt-4 mb-8'>
                 <select className='border-none bg-gray-200 p-1 rounded text-gray-800 font-normal'>
                   <option value="weak">This week</option>
                   <option value="month">This Month</option>
                   <option value="All">All time</option>
                 </select>
               </div>
               {/* cards */}
               <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 mx-10 md:mx-6 my-6'>
                  <div className='flex flex-col space-y-1 items-center bg-white py-2 rounded'>
                     <p className='text-xl font-bold '>{userData.length}</p>
                     <span>Total Exercises</span>
                  </div>
                  <div className='flex flex-col space-y-1 items-center bg-white py-2 rounded'>
                     <p className='text-xl font-bold '>{TotalDuration}</p>
                     <span>Total Duration</span>
                  </div>
                  <div className='flex flex-col space-y-1 items-center bg-white py-2 rounded'>
                     <p className='text-xl font-bold '>{TotalReps} reps</p>
                     <span>Total Reps </span>
                  </div>
                  <div className='flex flex-col space-y-1 items-center bg-white py-2 rounded'>
                     <p className='text-xl font-bold '>Intermediate</p>
                     <span>Most Common</span>
                  </div>
               </div>
               {/* Charts */}
                <div className='p-4 grid grid-cols-1 md:grid-cols-2 gap-4  mx-6 md:mx-3'>
                   {/* bar chart */}
                   <div className='p-2 bg-white shadow max-h-[300px]'>
                      <h2 className='text-gray-700 text-lg font-medium my-2'>workouts Per Week</h2>
                      <Bar 
                         data={{
                            labels:['week-1', 'week-2','week-3','week-4'],
                            datasets:[
                              {
                                label:'Week ',
                                data:[4,10,7,3,12],
                                backgroundColor:['blue'],
                                borderRadius:5,
                                barThickness:40
                              }
                              
                           ]
                         }}
                         options={{
                            plugins:{
                              legend:{
                                display:false
                              }
                            }
                         }}
                        
                       />
                   </div>
                   <div className='p-2 bg-white shadow max-h-[300px]'>
                      <h2>Total Duration</h2>
                      <Line  
                       data={{
                            labels:['Day-1', 'Day-2','Day-3','Day-4'],
                            datasets:[
                              {
                                label:'here',
                                data:[3,10,4,13,20,25 ,30],
                                backgroundColor:['rgba(0,0,255,0.3)'],
                                borderRadius:10,
                                 borderWidth:2,
                                 borderColor:'blue',
                                 fill:true,
                                 tension:0.5
                              }
                              
                           ]
                         }}
                         options={{
                            plugins:{
                              legend:{
                                display:false
                              },
                              tooltip:{
                                enabled:true
                              }
                            },
                            elements:{
                                line:{
                                 borderJoinStyle:'round'
                                },
                                point: {
                                  radius: 0.8
                                 }

                            },
                             spanGaps: true,
                         }}
                       />
                   </div>
                </div>
                {/* Recently */}
                <div className='p-2 mx-6 bg-white rounded shadow-md'>
                   <h2 className='text-xl text-gray-800 font-medium px-2'>Recent Activity</h2>
                   <div className='my-4 '>
                      {
                        recent.map((item)=>(
                          <div key={item.id} className='flex justify-between items-center py-2 px-2'>
                            <div className='flex space-x-2 '>
                               <img src={item.feature_image} alt="photo"  className='h-13 w-15  object-cover rounded-md'/>
                               <div className=''>
                                  <span className='block font-medium '>{item.exercise_name}</span>
                                  <span className='text-sm text-gray-800'>{item.reps} reps - {item.duration} sec</span>
                               </div>
                            </div>
                             <div>
                               <button className={`py-1 px-3 rounded-md ${getDifferentColor(item.exercise_type)}`}>
                                {item.exercise_type}
                               </button>
                             </div>
                          </div>
                        ))  
                      }
                   </div> 
                </div>

                {/* acheivements */}
                <div className='p-2 mx-6 my-4 bg-white rounded shadow-md'>
                     <h2 className='text-xl text-gray-800 font-medium px-2'>Achievements</h2>
                   <div className='flex flex-col space-y-6 md:flex-row md:space-x-15  p-2 my-4 '>
                      <div className='flex space-x-2'>
                        <GiTrophyCup className='text-amber-400 text-2xl'/> 
                        <span className='text-gray-800 font-medium text-md'>Completed 10 workouts! </span>
                      </div>
                      <div className='flex space-x-2'>
                        <BsStars className='text-amber-400 text-2xl'/>
                         <span className='text-gray-800 font-medium text-md' >100 reps milestone reached!</span>          
                      </div>
                   </div> 
                </div>
          </div>
       </div>

  )
}

export default ProgressPage