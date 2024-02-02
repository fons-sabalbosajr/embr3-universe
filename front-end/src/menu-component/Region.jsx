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
  TreeSelect } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Pagination } from "antd";

const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker

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
    "PSIC_Code": "",
    "Industry Category Project Type": "",
    "Industry Category Sub-Type": "",
    "Industry Classfication": "",

    // Add other fields as needed
  });

  const [componentSize, setComponentSize] = useState('small');
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
        title: `Serial No: ${row["Serial No"]}`,

        content: (
          <div>
            {" "}
            <Tabs type="card">
              <TabPane tab="General Info." key="1">
                <Form
                 labelCol={{
                  span: 5,
                }}
                wrapperCol={{
                  span: 10,
                }}
                layout="horizontal"
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                style={{
                  maxWidth: 600,
                }}
                >
                  <Form.Item
                    label="Input"
                    name="Input"
                    rules={[
                      {
                        required: true,
                        message: "Please input!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="InputNumber"
                    name="InputNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input!",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="TextArea"
                    name="TextArea"
                    rules={[
                      {
                        required: true,
                        message: "Please input!",
                      },
                    ]}
                  >
                    <Input.TextArea />
                  </Form.Item>

                  <Form.Item
                    label="Mentions"
                    name="Mentions"
                    rules={[
                      {
                        required: true,
                        message: "Please input!",
                      },
                    ]}
                  >
                    <Mentions />
                  </Form.Item>

                  <Form.Item
                    label="Select"
                    name="Select"
                    rules={[
                      {
                        required: true,
                        message: "Please input!",
                      },
                    ]}
                  >
                    <Select />
                  </Form.Item>

                  <Form.Item
                    label="Cascader"
                    name="Cascader"
                    rules={[
                      {
                        required: true,
                        message: "Please input!",
                      },
                    ]}
                  >
                    <Cascader />
                  </Form.Item>

                  <Form.Item
                    label="TreeSelect"
                    name="TreeSelect"
                    rules={[
                      {
                        required: true,
                        message: "Please input!",
                      },
                    ]}
                  >
                    <TreeSelect />
                  </Form.Item>

                  <Form.Item
                    label="DatePicker"
                    name="DatePicker"
                    rules={[
                      {
                        required: true,
                        message: "Please input!",
                      },
                    ]}
                  >
                    <DatePicker />
                  </Form.Item>

                  <Form.Item
                    label="RangePicker"
                    name="RangePicker"
                    rules={[
                      {
                        required: true,
                        message: "Please input!",
                      },
                    ]}
                  >
                    <RangePicker />
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 6,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
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
