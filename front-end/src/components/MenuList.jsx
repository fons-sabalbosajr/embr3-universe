import React, { useState } from "react";
import { ConfigProvider, Menu, Button, Tooltip } from "antd";
import {
  DashboardFilled,
  CheckCircleFilled,
  PushpinFilled,
  DownCircleFilled,
  GlobalOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const MenuList = ({ refreshDashboard }) => {
  const handleDashboardClick = () => {
    refreshDashboard(); // Call the refresh function
  };

  const handleExportDataClick = () => {
    navigate("/universe/exportdata"); // navigate to Export Data
  };

  const handleRegionDataClick = () => {
    navigate("/universe/region"); // navigate to Regional Data
  };

  const isMenuSelected = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <ConfigProvider>
      <div className="menu-bar-container">
        <Menu
          mode="inline"
          className="menu-bar"
          theme="dark"
          defaultOpenKeys={["reports"]}
        >
          <Menu.Item
            key="dashboard"
            icon={<DashboardFilled />}
            className="menu-bar-item"
          >
            <Link
              to="/universe/dashboard"
              className="link-menu"
              onClick={handleDashboardClick}
            >
              Dashboard
            </Link>
          </Menu.Item>

          <Menu.Item
            key="region"
            icon={<GlobalOutlined />}
            className="menu-bar-item"
          >
            <Link
              to="/universe/region"
              className="link-menu"
              onClick={handleRegionDataClick}
            >
              R3 Monitoring Table
            </Link>
          </Menu.Item>

          <Menu.SubMenu
            key="submonitoring"
            icon={<CheckCircleFilled />}
            title="Per Provinces"
          >
            <Menu.Item key="submonitoring-1">
              <Link
                to="/universe/province"
                className={`link-menu-hover ${
                  isMenuSelected("province") ? "selected" : ""
                }`}
              >
                Aurora
              </Link>
            </Menu.Item>

            <Menu.Item key="submonitoring-2">
              <Link
                to="/universe/province"
                className={`link-menu-hover ${
                  isMenuSelected("province") ? "selected" : ""
                }`}
              >
                Bataan
              </Link>
            </Menu.Item>

            <Menu.Item key="submonitoring-3">
              <Link
                to="/universe/province"
                className={`link-menu-hover ${
                  isMenuSelected("province") ? "selected" : ""
                }`}
              >
                Bulacan
              </Link>
            </Menu.Item>
            <Menu.Item key="submonitoring-4">
              <Link
                to="/universe/province"
                className={`link-menu-hover ${
                  isMenuSelected("province") ? "selected" : ""
                }`}
              >
                Nueva Ecija
              </Link>
            </Menu.Item>
            <Menu.Item key="submonitoring-5">
              <Link
                to="/universe/province"
                className={`link-menu-hover ${
                  isMenuSelected("province") ? "selected" : ""
                }`}
              >
                Pampanga
              </Link>
            </Menu.Item>
            <Menu.Item key="submonitoring-6">
              <Link
                to="/universe/province"
                className={`link-menu-hover ${
                  isMenuSelected("province") ? "selected" : ""
                }`}
              >
                Tarlac
              </Link>
            </Menu.Item>
            <Menu.Item key="submonitoring-7">
              <Link
                to="/universe/province"
                className={`link-menu-hover ${
                  isMenuSelected("province") ? "selected" : ""
                }`}
              >
                Zambales
              </Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu
            key="subreports"
            icon={<PushpinFilled />}
            title="Reports"
          >
            <Menu.Item key="subreports-1">
              <Link
                to="/universe/survey"
                className={`link-menu-hover ${
                  isMenuSelected("survey") ? "selected" : ""
                }`}
              >
                Survey List
              </Link>
            </Menu.Item>
            <Menu.Item key="subreports-2">
              <Link
                to="/universe/mbu"
                className={`link-menu-hover ${
                  isMenuSelected("mbu") ? "selected" : ""
                }`}
              >
                Manila Bay Unit
              </Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.Item key="export" icon={<DownCircleFilled />}>
            <Link
              to="/universe/exportdata"
              className="link-menu"
              onClick={handleExportDataClick}
            >
              Export Data
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </ConfigProvider>
  );
};

export default MenuList;
