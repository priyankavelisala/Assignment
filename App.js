import React, { useState, useEffect } from "react";
import "./App.css";
import TableUI from "./components/TableUI";
import fetchData from "./api";

const App = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);

  const fetchDataFromApi = async () => {
    try {
      const jsonData = await fetchData(searchTerm, sortBy, page);
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [searchTerm, sortBy, page]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
   setSortBy(e.target.value);

  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="App">
      <TableUI
        data={data}
        searchTerm={searchTerm}
        sortBy={sortBy}
        page={page}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
};

export default App;
