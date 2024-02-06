import React, { useEffect, useState } from "react";
import axios from "axios";
import "./region.css";
import {
  Modal as AntModal,
  Input,
  Select,
  Tooltip,
  Form,
  Button,
  Tabs,
  Cascader,
  DatePicker,
  InputNumber,
  Mentions,
  TreeSelect,
  Row,
  Col,
} from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Pagination } from "antd";

const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

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

  const [editedData, setEditedData] = useState({
    "ECC Reference No": "",
    "Proponent Name": "",
    "Project Title": "",
    "Complete Address": "",
    PSIC_Code: "",
    "Industry Category Project Type": "",
    "Industry Category Sub-Type": "",
    "Industry Classfication": "",
    "Other Project Type": "",
    "Within Manila Bay Area": "",
    "Receiving Waterbody (Major River & River system)": "",
    "Number of Employees": "",
    "BOD_kg/day": "",
    Longitude: "",
    Latitude: "",
    "Congressional District": "",
    Street: "",
    Barangay: "",
    City: "",
    Province: "",
    // Add other fields as needed
  });

  const [componentSize, setComponentSize] = useState("small");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  //modals for opening details
  const openModal = async (row) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/get-details-by-serial-number/${row["Serial No"]}`
      );

      const details = response.data;

      setSelectedRow(row);
      AntModal.info({
        title: `Project Title: ${row["Serial No"]}`,

        content: (
          <div>
            {" "}
            <Tabs type="card">
              <TabPane tab="General Info." key="1">
                <Form
                  layout="horizontal"
                  initialValues={{
                    size: componentSize,
                    InputNumber: details["ECC Reference No"],
                    Input: details["Proponent Name"],
                    TextArea: details["Project Title"],
                    PSIC_Code: details["PSIC_Code"],
                    Industry_Category_Project_Type:
                      details["Industry Category Project Type"],
                    Industry_Category_Sub_Type:
                      details["Industry Category Sub-Type"],
                    Industry_Classification: details["Industry Classification"],
                    Other_Project_Type: details["Other Project Type"],
                    Within_Manila_Bay_Area: details["Within Manila Bay Area"],
                    Receiving_Waterbody:
                      details[
                        "Receiving Waterbody (Major River & River system)"
                      ],
                    Number_of_Employees: details["Number of Employees"],
                    BOD_kg_per_day: details["BOD_kg/day"],
                    Longitude: details["Longitude"],
                    Latitude: details["Latitude"],
                    Congressional_District: details["Congressional District"],
                    Complete_Address: details["Complete Address"],
                    Street: details["Street"],
                    Barangay: details["Barangay"],
                    City: details["City"],
                    Province: details["Province"],
                    // Add other fields as needed
                  }}
                  onValuesChange={onFormLayoutChange}
                  size={componentSize}
                  style={{
                    maxWidth: 1200,
                    display: "grid",
                    alignItems: "center",
                  }}
                  variant="filled"
                  colon={false}
                  labelCol={{ flex: "150px" }}
                  labelAlign="left"
                  labelWrap
                  wrapperCol={{
                    flex: 1,
                  }}
                >
                  <Row>
                    <Col span={12} offset={0}>
                      {" "}
                      <Form.Item label={<span className="form-item-label">ECC Reference No.</span>} name="InputNumber" className="form-item">
                        <Input className="input-item" />
                      </Form.Item>
                      <Form.Item label={<span className="form-item-label">Proponent Name</span>} name="Input" className="form-item">
                        <Input className="input-item" />
                      </Form.Item>
                      <Form.Item label={<span className="form-item-label">Project Title</span>} name="TextArea" className="form-item">
                        <Input.TextArea className="input-item" />
                      </Form.Item>
                      <Form.Item
                        label={<span className="form-item-label">Industry Category Project Type</span>}
                        name="Industry_Category_Project_Type" className="form-item"
                      >
                        <Input className="input-item" />
                      </Form.Item>
                      <Form.Item
                        label={<span className="form-item-label">Industry Category Sub Type</span>}
                        name="Industry_Category_Sub_Type" className="form-item"
                      >
                        <Input.TextArea className="input-item" />
                      </Form.Item>
                      <Form.Item
                        label={<span className="form-item-label">Industry Classification</span>}
                        name="Industry_Classification" className="form-item"
                      >
                        <Input className="input-item" />
                      </Form.Item>
                      <Form.Item
                        label={<span className="form-item-label">Other Project Type</span>}
                        name="Other_Project_Type" className="form-item"
                      >
                        <Input className="input-item" />
                      </Form.Item>

                      <Form.Item
                        label={<span className="form-item-label">Within Manila Bay Area</span>}
                        name="Within_Manila_Bay_Area" className="form-item"
                      >
                        <Input className="input-item-short" />
                      </Form.Item>

                      <Form.Item
                        label={<span className="form-item-label">Receiving Water Body</span>}
                        name="Receiving_Waterbody" className="form-item"
                      >
                        <Input className="input-item-short" />
                      </Form.Item>
                    </Col>

                    <Col span={12} offset={0}>
                      <Form.Item
                        label={<span className="form-item-label">No. of Employees</span>}
                        name="Number_of_Employees" className="form-item"
                      >
                        <Input className="input-item-short" />
                      </Form.Item>

                      <Form.Item
                        label={<span className="form-item-label">BOD</span>}
                        name="BOD_kg_per_day" className="form-item"
                      >
                        <Input className="input-item-short" addonAfter={<span className="input-addon">kg/day</span>} />
                      </Form.Item>

                      <Form.Item
                        label={<span className="form-item-label">Latitude</span>}
                        name="Latitude" className="form-item"
                      >
                        <Input className="input-item-short" addonAfter={<span className="input-addon">°</span>} />
                      </Form.Item>

                      <Form.Item
                        label={<span className="form-item-label">Longitude</span>}
                        name="Longitude" className="form-item"
                      >
                        <Input className="input-item-short" addonAfter={<span className="input-addon">°</span>} />
                      </Form.Item>

                      <Form.Item
                        label={<span className="form-item-label">Congressional District</span>}
                        name="Congressional_District" className="form-item"
                      >
                        <Input className="input-item-short" />
                      </Form.Item>

                      <Form.Item
                        label={<span className="form-item-label">Complete Address</span>}
                        name="Complete_Address" className="form-item"
                      >
                        <Input.TextArea className="input-item" />
                      </Form.Item>

                      <Form.Item
                        label={<span className="form-item-label">Street</span>}
                        name="Street" className="form-item"
                      >
                        <Input className="input-item" />
                      </Form.Item>

                      <Form.Item
                        label={<span className="form-item-label">Barangay</span>}
                        name="Barangay" className="form-item"
                      >
                        <Input className="input-item-short" />
                      </Form.Item>

                      <Form.Item
                        label={<span className="form-item-label">City</span>}
                        name="City" className="form-item"
                      >
                        <Input className="input-item-short" />
                      </Form.Item>

                      <Form.Item
                        label={<span className="form-item-label">Province</span>}
                        name="Province" className="form-item"
                      >
                        <Input className="input-item-short" />
                      </Form.Item>
                      
                    </Col>
                  </Row>
                </Form>
              </TabPane>
              <TabPane tab="Concerned Unit" key="2"></TabPane>
            </Tabs>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                className="modal-update-button"
                onClick={() => handleUpdate(row)}
              >
                Update
              </button>
              <button
                className="modal-close-button"
                onClick={() => AntModal.destroyAll()}
              >
                Close
              </button>
            </div>
          </div>
        ),
        onOk() {},
        width: 1200,
        okButtonProps: { hidden: true },
      });
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  return (
    <div>
      <div className="header-panel">
        <div className="header-content">
          <h5>Test Data Aurora</h5>
          <button className="add-industry-button">Add Industry</button>
        </div>

        <div className="search-container">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search any keyword..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="search-icon-container">
              <div className="search-icon">
                <Tooltip title="Search keyword..." placement="right">
                  <SearchOutlined />
                </Tooltip>
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
            <Pagination
              simple
              current={currentPage}
              total={filteredData.length}
              pageSize={itemsPerPage}
              showSizeChanger={false}
              onChange={paginate}
              className="ant-pagination"
            />
          </div>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th
                  className="serial-no-column"
                  style={{ textAlign: "center" }}
                >
                  Serial No
                </th>
                <th
                  className="proponent-column"
                  style={{ textAlign: "center" }}
                >
                  Proponent
                </th>
                <th
                  className="project_title-column"
                  style={{ textAlign: "center" }}
                >
                  Project Title
                </th>
                <th className="action-column" style={{ textAlign: "center" }}>
                  Actions
                </th>
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
                      style={{ margin: "0 auto", display: "block" }}
                    >
                      <EyeOutlined />
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
