import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { processOAuthRedirect } from "../../lib/authService";

const OAuthSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Process the OAuth redirect with token
    try {
      processOAuthRedirect();
      // Navigate to home or dashboard
      navigate("/");
    } catch (error) {
      console.error("Error processing OAuth redirect:", error);
      // Navigate to login on error
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Processing Login
        </h2>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <p className="text-center mt-4 text-gray-600">
          Please wait while we complete your login...
        </p>
      </div>
    </div>
  );
};

export default OAuthSuccess;
