export const callStudentDataApi = async () => {
    try {
      const response = await fetch("/api/seta/leaderboardapi", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to get student data");
      }
  
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  