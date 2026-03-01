import React from 'react';

const AdminDashboardHome = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      {/* Icon/Visual Decoration */}
      <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <i className="fa-solid fa-unlock-keyhole text-3xl"></i>
      </div>

      {/* Text Content */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to the Admin Dashboard
      </h1>
      
      <p className="text-gray-500 max-w-md leading-relaxed">
        You have full access to system management. Use the sidebar on the left to 
        <span className="font-semibold text-gray-700"> create new users</span>, 
        <span className="font-semibold text-gray-700"> manage customers</span>, 
        or update existing records in the database.
      </p>

      {/* Quick Tips/Status */}
      <div className="mt-10 grid grid-cols-1 gap-4 text-left">
        <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <i className="fa-solid fa-circle-info text-blue-500"></i>
          <span>Database connection is active and secure.</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;