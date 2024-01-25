

import ApiService from "./ApiService";

const HealthMetricsService = {
  HEALTH_METRICS_ENDPOINT: "health/metrics",

  getMetrics: async () => {
    try {
      const response = await ApiService.get(
        HealthMetricsService.HEALTH_METRICS_ENDPOINT
      );
      return response; 
    } catch (error) {
      console.error("Error in HealthMetricsService:", error);
      throw error;
    }
  },

};

export default HealthMetricsService;
