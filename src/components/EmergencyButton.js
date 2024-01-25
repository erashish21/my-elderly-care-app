

import React from "react";

const EmergencyButton = () => {
  const handleEmergencyClick = () => {

    alert("Emergency call initiated!");
  };

  return (
    <div className="container mx-auto mt-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Emergency Button</h1>

      {/* Emergency Button */}
      <button
        onClick={handleEmergencyClick}
        className="bg-red-500 text-white py-4 px-8 rounded-full text-xl font-bold hover:bg-red-600"
      >
        EMERGENCY
      </button>

      <p className="mt-4 text-gray-700">
        Click the button in case of emergency to initiate a call for help.
      </p>
    </div>
  );
};

export default EmergencyButton;
