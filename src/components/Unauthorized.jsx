import React from 'react';

export const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Unauthorized</h2>
        <p className="text-gray-600">You do not have permission to access this application.</p>
      </div>
    </div>
  );
};