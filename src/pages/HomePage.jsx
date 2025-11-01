import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { FetchLatestExercise } from '../lib/exercise';
import { FiPlus } from 'react-icons/fi';
import supabase from '../lib/supabase';



const Daily = [
          { label: "Steps", value: "8,420" },
          { label: "Calories", value: "560 kcal" },
          { label: "Active Minutes", value: "42 min" },
          { label: "Water Intake", value: "2.5 L" },
]

const HomePage = () => {

 const [quote] = useState("Every step counts. Keep moving!");
 const [recent , setIsRecent]= useState([])

 
   const { user, isLoading }=useAuth();

  useEffect(()=>{
           
            //  get Recent Active 
                 const getRecentActvity = async ()=>{
                    try {
                   
                      const {data , error} = await supabase.from('exercises')
                                     .select('*')  
                                     .eq('author_id',user.id)     
                       // console.log('result :',result);
                       setIsRecent(data || [])
                       
                        if(error) throw error
                    } catch (error) {
                      console.log(error);
                    }
                 }
       
                 getRecentActvity()
  },[])


    const weaklyGoals = recent.reduce((current , total)=>{
         return    current + total.reps      
      },0)



      console.log('total: ',weaklyGoals);

   
    if(user && isLoading){
        return (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
      )
    }






  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Fitness. Transform Your Life.</h1>
        <p className="text-lg md:text-xl mb-6">Stay motivated, monitor progress, and reach your goals.</p>
        <div className="flex justify-center gap-4">
          <Link to='workout' className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Start Tracking</Link>
          <Link to='progress' className="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition">View Progress</Link>
        </div>
      </section>

      {/* Daily Summary */}
      <section className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 py-10 px-4">
        {Daily.map((item) => (
          <div key={item.label} className="bg-white rounded-lg shadow-md p-4 text-center">
            {/* <h3 className="text-xl font-semibold">{item.value}</h3> */}
            <p className="text-lg font-medium text-gray-800">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Goals Section */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Weekly Goals</h2>
        {
          recent.length === 0  ?
           (
               <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">No workout Yet</h2>
                  <p className="text-gray-500 max-w-md mx-auto mb-8">
                      You haven't created any workout yet. 
                  </p>
                  <Link
                      to="/workout"
                      className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-xl shadow-md hover:bg-orange-700 transition-colors duration-200"
                  >
                      <FiPlus className="mr-2" />
                      Create Your First workout
                  </Link>
              </div>
           )
           :
           (
             <div className="space-y-4" >
                <div >
                  <div className="text-md mb-1">
                    <span>Workouts </span>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                     <div
                       className={`bg-blue-400 h-3 rounded-full transition-all`}
                            style={{width:`${recent.length}%`}}
                      />
                   </div>
                    <span>Steps </span>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={` bg-blue-400 h-3 rounded-full transition-all `}
                         style={{width:`${weaklyGoals}px`}}
                      />
                    </div>
                  </div>
                </div>    
             </div>    
           )

        }
        
      </div>

      {/* Quote Section */}
      <section className="text-center py-10 px-4 bg-blue-50">
        <p className="text-xl italic text-blue-700">{quote}</p>
      </section>

    </div>
  );

}

export default HomePage