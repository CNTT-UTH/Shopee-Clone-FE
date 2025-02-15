import React from 'react'

const Dashboard = () => {
  return (
    <div className="p-6 px-10 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 shadow rounded-lg flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Sales</h3>
          <p className="text-2xl text-green-500">$5000</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Orders</h3>
          <p className="text-2xl text-blue-500">1200</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-700">Pending Orders</h3>
          <p className="text-2xl text-yellow-500">50</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-700">New Products</h3>
          <p className="text-2xl text-purple-500">15</p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 shadow rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700">Sales Overview</h2>
        <div className="mt-4">
          {/* Placeholder for chart */}
          <div className="bg-gray-200 h-64 flex items-center justify-center">
            <span className="text-gray-500">Chart goes here</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
