import React, { useEffect, useState } from "react";
import axios from "axios";
import "./region.css";
import { Modal as AntModal, Select } from "antd";
import { EyeOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const getColorByPermitType = (permitType) => {
  switch (permitType) {
    case "ECC Manual":
      return "blue"; // Set the background color for ECC Manual
    case "ECC Online":
      return "green"; // Set the background color for ECC Online
    case "CNC Manual":
      return "orange"; // Set the background color for CNC Manual
    case "CNC Online":
      return "purple"; // Set the background color for CNC Online
    default:
      return "transparent"; // Default background color
  }
};

const formatProjectTitle = (item) => {
  const concatenatedValues = item["ConcatenatedValues"];
  const valuesArray = concatenatedValues.split("\n").filter(Boolean); // Split values by new line and remove empty strings
  const permitType = valuesArray[2];

  console.log("Permit Type:", permitType);

  return (
    <div>
      <strong>{valuesArray[0]}</strong>
      {valuesArray.slice(1).map((value, index) => (
        <div
          key={index}
          style={{
            fontStyle: "italic",
            backgroundColor:
              index === 1 ? getColorByPermitType(permitType) : "transparent",
          }}
        >
          {index === 0 && <span>Complete Address: </span>}
          {index === 1 && <span>Permit Type: </span>}
          {index === 2 && <span>Reference Code: </span>}
          {index === 3 && <span>Date Approved: </span>}
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
};

const Region = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [eccProcessTypes, setEccProcessTypes] = useState([]);

  useEffect(() => {
    const fetchEccProcessTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/get-ecc-process-types"
        );
        setEccProcessTypes(response.data);
      } catch (err) {
        console.error("Error fetching ECC process types:", err);
      }
    };

    fetchEccProcessTypes();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/get-universe-au"
        );
        const updatedData = response.data.map((item) => ({
          ...item,
          "Project Title": `${item["Project Title"]} - ${
            item["Complete Address"] || ""
          } - ${item["ECC Process Type"] || ""} - ${
            item["ECC Reference No"] || ""
          } - ${item["Date Approved"] || ""}`,
        }));
        setData(updatedData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const headers = Object.keys(data[0] || {}).filter(
    (header) => header !== "id"
  ); // Dynamic headers

  // Calculate the index range based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //modals for opening details
  const openModal = (row) => {
    setSelectedRow(row);
    AntModal.info({
      title: `Details for Serial No: ${row["Serial No"]}`,
      content: (
        <div>
          {/* Display other details as needed */}
          <p>Proponent: {row["Proponent Name"]}</p>
          <p>Project Title: {row["Project Title"]}</p>
        </div>
      ),
      onOk() {},
    });
  };

  return (
    <div>
      <div className="header-panel">
        <div className="header-content">
          <h5>Aurora Test Data</h5>
          <button className="add-industry-button">Add Industry</button>
        </div>

        <div className="search-container">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="search-icon-container">
              <div className="search-icon">
                <SearchOutlined />
              </div>
            </div>
          </div>

          <div className="ecc-process-type-filter">
            <label>Permit Type: &nbsp;</label>
            <Select
              style={{ width: 150 }}
              placeholder="--all--"
              allowClear
              onChange={(value) => setEccProcessTypeFilter(value)}
            >
              {eccProcessTypes.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="pagination-container">
          <div className="pagination-dropdown">
            <label>Show: &nbsp;</label>
            <select onChange={(e) => setItemsPerPage(Number(e.target.value))}>
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={-1}>-show all--</option>
            </select>
            <label>entries</label>
          </div>

          <div className="pagination">
            <button onClick={prevPage}>Previous</button>
            <button onClick={nextPage}>Next</button>
          </div>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th className="serial-no-column">Serial No</th>
                <th className="proponent-column">Proponent</th>
                <th className="project_title-column">Project Title</th>
                <th className="action-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedRow(item)}
                  className={selectedRow === item ? "selected-row" : ""}
                  onMouseEnter={() => setSelectedRow(item)}
                  onMouseLeave={() => setSelectedRow(null)}
                >
                  <td className="serial-no-column">{item["Serial No"]}</td>
                  <td className="proponent-column">{item["Proponent Name"]}</td>
                  <td className="project_title-column">
                    {formatProjectTitle(item)}
                  </td>
                  <td className="action-column">
                    <button
                      className="action-button view-button"
                      onClick={() => openModal(item)}
                      title="View"
                    >
                      <EyeOutlined />
                    </button>
                    <button className="action-button edit-button" title="Edit">
                      <EditOutlined />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-data-container">
            <p>Total Entries: {data.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Region;
