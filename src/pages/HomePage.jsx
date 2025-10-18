import React, { useState } from 'react'

const HomePage = () => {
 const [quote] = useState("Every step counts. Keep moving!");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Fitness. Transform Your Life.</h1>
        <p className="text-lg md:text-xl mb-6">Stay motivated, monitor progress, and reach your goals.</p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Start Tracking</button>
          <button className="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition">View Progress</button>
        </div>
      </section>

      {/* Daily Summary */}
      <section className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 py-10 px-4">
        {[
          { label: "Steps", value: "8,420" },
          { label: "Calories", value: "560 kcal" },
          { label: "Active Minutes", value: "42 min" },
          { label: "Water Intake", value: "2.5 L" },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-lg shadow-md p-4 text-center">
            <h3 className="text-xl font-semibold">{item.value}</h3>
            <p className="text-sm text-gray-500">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Goals Section */}
      <section className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Weekly Goals</h2>
        <div className="space-y-4">
          {[
            { label: "Workouts", progress: 3, total: 5 },
            { label: "Steps", progress: 42000, total: 70000 },
          ].map((goal) => (
            <div key={goal.label}>
              <div className="flex justify-between text-sm mb-1">
                <span>{goal.label}</span>
                <span>{goal.progress}/{goal.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all"
                  style={{ width: `${(goal.progress / goal.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="text-center py-10 px-4 bg-blue-50">
        <p className="text-xl italic text-blue-700">{quote}</p>
      </section>

    </div>
  );

}

export default HomePage