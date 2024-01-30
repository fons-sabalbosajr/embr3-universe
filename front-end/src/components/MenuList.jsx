import React, { useState } from "react";
import { ConfigProvider, Menu, Button, Tooltip } from "antd";
import {
  DashboardFilled,
  CheckCircleFilled,
  PushpinFilled,
  DownCircleFilled,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const MenuList = ({ refreshDashboard }) => {
  const handleDashboardClick = () => {
    refreshDashboard(); // Call the refresh function
  };

  const handleExportDataClick = () => {
    navigate("/universe/exportdata"); // Programmatically navigate to Export Data
  };

  const handleSurveyClick = () => {
    navigate("/universe/survey"); // Programmatically navigate to Survey
  };
  const handleMBUClick = () => {
    navigate("/universe/mbu"); // Programmatically navigate to MBU
  };

  const isMenuSelected = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <ConfigProvider>
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

        <Menu.SubMenu
          key="submonitoring"
          icon={<CheckCircleFilled />}
          title="Monitoring Table"
        >
          <Menu.Item key="submonitoring-1">
            <Link to="/province" className="link-menu">
              Aurora
            </Link>
          </Menu.Item>

          <Menu.Item key="submonitoring-2">
            <Link to="/province" className="link-menu">
              Bataan
            </Link>
          </Menu.Item>

          <Menu.Item key="submonitoring-3">
            <Link to="/province" className="link-menu">
              Bulacan
            </Link>
          </Menu.Item>
          <Menu.Item key="submonitoring-4">
            <Link to="/province" className="link-menu">
              Nueva Ecija
            </Link>
          </Menu.Item>
          <Menu.Item key="submonitoring-5">
            <Link to="/province" className="link-menu">
              Pampanga
            </Link>
          </Menu.Item>
          <Menu.Item key="submonitoring-6">
            <Link to="/province" className="link-menu">
              Tarlac
            </Link>
          </Menu.Item>
          <Menu.Item key="submonitoring-7">
            <Link to="/province" className="link-menu">
              Zambales
            </Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="subreports" icon={<PushpinFilled />} title="Reports">
          <Menu.Item key="subreports-1">
            <Link to="/universe/survey" className={`link-menu-hover ${isMenuSelected('survey') ? 'selected' : ''}`}>
              Survey List
            </Link>
          </Menu.Item>
          <Menu.Item key="subreports-2">
            <Link to="/universe/mbu" className={`link-menu-hover ${isMenuSelected('survey') ? 'selected' : ''}`}>
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
    </ConfigProvider>
  );
};

export default MenuList;
