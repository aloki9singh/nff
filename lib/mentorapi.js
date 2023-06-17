export const callSchedulePostApiMentor = async (data) => {
    try {
      const response = await fetch("/api/mentorsSchedule", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to Add Schedule");
      }
  
      return response.json();
    } catch (error) {
      // Handle the error
    }
  };
  
  export const callMentorPostApiMentor = async (data) => {
    try {
      const response = await fetch("/api/mentorsdetail", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to Add Schedule");
      }
  
      return response.json();
    } catch (error) {
      // Handle the error
    }
  };
  
  export const callMentorGetApiMentor = async (id) => {
    try {
      const response = await fetch(`/api/mentorsdetail/${id}`);
  
      if (!response.ok) {
        throw new Error("Failed to Add Schedule");
      }
  
      return response.json();
    } catch (error) {
      // Handle the error
    }
  };
  
  export const callScheduleGetApiMentor = async (data) => {
    try {
      const response = await fetch("/api/mentorsSchedule", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to Get Schedule");
      }
  
      return response.json();
    } catch (error) {
      // Handle the error
    }
  };
  