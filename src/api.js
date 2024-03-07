const fetchData = async (
  searchTerm = "",
  sortBy = "",
  page = 1
) => {
  try {
    const queryParams = new URLSearchParams({
      searchTerm,
      sortBy,
      page,
    });

    const url = `http://localhost:8080/data?${queryParams.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchData;
