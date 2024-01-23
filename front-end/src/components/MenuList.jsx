import React from "react";
import { ConfigProvider } from "antd";
import { Menu } from "antd";
import {
  DashboardFilled,
  CheckCircleFilled,
  PushpinFilled,
  DownCircleFilled,
  LogoutOutlined,
} from "@ant-design/icons";

import axios from 'axios'; 

const MenuList = () => {
  return (
    <ConfigProvider>
      <Menu mode="vertical" className="menu-bar">
        <Menu.Item key="dashboard" icon={<DashboardFilled />}>
          Dashboard
        </Menu.Item>

        <Menu.SubMenu
          key="submonitoring"
          icon={<CheckCircleFilled />}
          title="Monitoring Table"
        >
            <Menu.Item key='submonitoring-1'>Aurora</Menu.Item>
            <Menu.Item key='submonitoring-2'>Bataan</Menu.Item>
            <Menu.Item key='submonitoring-3'>Bulacan</Menu.Item>
            <Menu.Item key='submonitoring-4'>Nueva Ecija</Menu.Item>
            <Menu.Item key='submonitoring-5'>Pampanga</Menu.Item>
            <Menu.Item key='submonitoring-6'>Tarlac</Menu.Item>
            <Menu.Item key='submonitoring-7'>Zambales</Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu
          key="subreports"
          icon={<PushpinFilled />}
          title="Reports"
        >
            <Menu.Item key='subreports-1'>Survey</Menu.Item>
            <Menu.Item key='subreports-2'>Manila Bay Unit</Menu.Item>
        </Menu.SubMenu>

        <Menu.Item key="export" icon={<DownCircleFilled />}>
          Export Data
        </Menu.Item>
      </Menu>
    </ConfigProvider>
  );
};

export default MenuList;
