

import React, { useState, useEffect } from "react";
import HealthMetricsService from "../services/HealthMetricsService";

const Dashboard = () => {
  const [healthMetrics, setHealthMetrics] = useState({
    heartRate: 0,
    bloodPressure: "",
    steps: 0,
  });

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const metricsData = await HealthMetricsService.getMetrics();
        setHealthMetrics(metricsData);
      } catch (error) {
        console.error("Error fetching health metrics:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Health Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Heart Rate Card */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Heart Rate</h2>
          <p className="text-2xl text-blue-500">
            {healthMetrics.heartRate} BPM
          </p>
        </div>

        {/* Blood Pressure Card */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Blood Pressure</h2>
          <p className="text-lg">{healthMetrics.bloodPressure}</p>
        </div>

        {/* Steps Card */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Steps Taken</h2>
          <p className="text-2xl text-green-500">{healthMetrics.steps} steps</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
