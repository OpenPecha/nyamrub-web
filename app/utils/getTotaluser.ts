export default async function getTotalUser(url: string) {
  try {
    const response = await fetch(url); 
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
