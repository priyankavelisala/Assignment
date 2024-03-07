import React from "react";
import "./TableUI.css";

const TableUI = ({
  data,
  searchTerm,
  sortBy,
  page,
  onSearchChange,
  onSortChange,
  onPrevPage,
  onNextPage
  
}) => {
  return (
    <div className="container">
      <h1>Employee Data</h1>
      <div className="search-sort-container">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search with Name or Location"
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>
        <div className="sort-bar">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={onSortChange}
          >
            <option value="">Select an Option</option>
            <option value="date" >Date</option>
            <option value="time" >Time</option>
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>SNo</th>
            <th>Cust_Name</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index}>
              <td>{record.id}</td>
              <td>{record.cust_name}</td>
              <td>{record.location}</td>
              <td>{record.phone}</td>
              <td>
                <div className="created-at">
                  <div>Date: {record.created_at.split("T")[0]}</div>
                  <div>Time: {record.created_at.split("T")[1]}</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={onPrevPage}>Previous</button>
        <span>Page {page} of 6</span>
        <button onClick={onNextPage}>Next</button>
      </div>
    </div>
  );
};

export default TableUI;
