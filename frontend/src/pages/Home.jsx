import React from 'react';
import { Link } from 'react-router';

const Home = () => {
  return (
  
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-2">
          CRM Midterm Project
        </h1>
        <p className="text-gray-600 text-lg">
          Please select your access role to continue
        </p>
      </div>

      {/* Button Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        
        {/* Admin Access Card */}
        <Link 
          to="/admin" 
          className="group p-8 bg-white border-2 border-transparent hover:border-red-500 rounded-2xl shadow-lg transition-all text-center"
        >
          <div className="text-4xl mb-4">🛡️</div>
          <h2 className="text-2xl font-bold text-gray-800 group-hover:text-red-600 transition-colors">Admin Access</h2>
          <p className="mt-2 text-gray-500 text-sm">Manage users, full customer control, and assignments.</p>
        </Link>

        {/* Manager Access Card */}
        <Link 
          to="/manager" 
          className="group p-8 bg-white border-2 border-transparent hover:border-blue-500 rounded-2xl shadow-lg transition-all text-center"
        >
          <div className="text-4xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Manager Access</h2>
          <p className="mt-2 text-gray-500 text-sm">View team customers and update project statuses.</p>
        </Link>

        {/* Team Member Access Card */}
        <Link 
          to="/team-member" 
          className="group p-8 bg-white border-2 border-transparent hover:border-green-500 rounded-2xl shadow-lg transition-all text-center"
        >
          <div className="text-4xl mb-4">👥</div>
          <h2 className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">User/Team Member Access</h2>
          <p className="mt-2 text-gray-500 text-sm">View and manage your assigned customer list.</p>
        </Link>

      </div>
    </div>
  );
};

export default Home;