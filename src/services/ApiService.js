

const BASE_URL = "https://api.example.com"; 

const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const ApiService = {
  //  GET request
  get: async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`);
      return handleResponse(response);
    } catch (error) {
      console.error("Error in ApiService GET request:", error);
      throw error;
    }
  },

  //  POST request
  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      console.error("Error in ApiService POST request:", error);
      throw error;
    }
  },

};

export default ApiService;
