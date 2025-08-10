import React from 'react';
import { AlertTriangle, BookOpen, RefreshCw, Home, FileText, Mail } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function ErrorPage() {
    const navigate = useNavigate();


  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B0C4D] via-[#2D1B69] to-[#1B0C4D] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main Error Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
          {/* Error Illustration */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* You can replace this with an actual image */}
              <img 
                src="https://via.placeholder.com/200x150/f3f4f6/6b7280?text=Assignment+Not+Found" 
                alt="Assignment Error Illustration"
                className="w-48 h-36 rounded-lg shadow-sm"
                onError={(e) => {
                  // Fallback to icon if image fails to load
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              {/* Fallback icon (hidden by default) */}
              <div className="hidden w-20 h-20 bg-red-100 rounded-full items-center justify-center mx-auto">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
              {/* Academic badge overlay */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#1B0C4D] rounded-full flex items-center justify-center shadow-md">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! URL Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The URL you're looking for seems to have taken an unscheduled break. 
            Don't worry, even the best students need a study break!
          </p>

          {/* Error Code */}
          <div className="bg-gray-50 rounded-lg p-3 mb-6">
            <p className="text-sm text-gray-500 mb-1">Error Code</p>
            <p className="font-mono text-lg font-semibold text-gray-800">404 - URL_NOT_FOUND</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleRefresh}
              className="w-full bg-[#1B0C4D] hover:bg-[#2D1B69] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            
            <button
              onClick={handleGoHome}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#1B0C4D]" />
            Need Help?
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Check if your assignment deadline hasn't passed</li>
            <li>• Verify you're logged into the correct account</li>
            <li>• Ensure your internet connection is stable</li>
            <li>• Try refreshing your browser</li>
          </ul>
        </div>
      </div>
    </div>
  );
}