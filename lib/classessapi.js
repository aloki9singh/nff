export async function fetchClasses() {
    try {
      const response = await fetch('/api/mentorsSchedule');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  