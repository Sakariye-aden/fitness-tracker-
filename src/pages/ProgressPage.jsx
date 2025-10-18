import React, { useEffect, useState } from 'react'
 import { Bar ,Doughnut , Line } from 'react-chartjs-2'
 import { Chart as Chartjs } from 'chart.js/auto'
import { useAuth } from '../context/AuthContext'
import supabase from '../lib/supabase'
import { FetchLatestExercise } from '../lib/exercise'

const ProgressPage = () => {
     
    const [userData , setUserData] = useState([]);
    const [recentExercise , setRecentExercise] = useState([]);


    const {user , isLoading } = useAuth()

    useEffect(()=>{


           const fetchExercises = async () =>{
              
              try {
                 const {data , error}= await supabase.from('exercises')
                             .select('*')
                             .eq('author_id', user.id) 

                       if(error) throw new Error('error is happen :',error)    
                        
                      console.log('progressData :',data);  
                    
                     setUserData(data || []) 
              } catch (error) {
                 console.error(error);
              }
           }
         
           fetchExercises()
          //  get Recent Active 
          const getRecentActvity = async ()=>{
             try {
               const result = await FetchLatestExercise(user.id , 3 )

                console.log('result :',result);
                setRecentExercise(result || [])
             } catch (error) {
               console.log(error);
             }
          }

          getRecentActvity()
          
    },[user.id])


  

    const TotalReps = userData.reduce((prev , next)=>{
        return prev + next.reps
      },0)
      
 
    const TotalDuration = userData.reduce((prev, next)=>{
         return prev + next.duration 
    },0)
   


  return (
 
       <div className='min-h-screen bg-gray-50'>
          <div className='max-w-4xl mx-auto'>
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
                <div className='p-2'>
                   <h2 className='text-xl text-gray-800 font-medium'>Recent Activity</h2>
                   
                </div>
          </div>
       </div>

  )
}

export default ProgressPage