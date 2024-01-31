import { Button, Layout, theme, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import Dashboard from "./menu-component/Dashboard";
import "./index.css";
import Logo from "./components/Logo";
import MenuList from "./components/MenuList";
import Region from "./menu-component/Region";
import ExportData from "./menu-component/ExportData";
import Survey from "./menu-component/Survey";
import MBU from "./menu-component/MBU";
import Province from "./menu-province/Province";

const { Header, Sider, Content } = Layout;

function DashboardContent() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      <Dashboard key={refreshKey} />
    </div>
  );
}

function Universe() {
  const [collapsed, setCollapsed] = useState(false);
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8081")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setAuth(false);
      });
  }, []);

  const handleDelete = () => {
    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        setAuth(false);
        setName("");
        navigate("/home", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {auth && (
        <Sider
          width={250}
          collapsible
          trigger={null}
          collapsed={collapsed}
          className="sidebar"
        >
          <Logo />
          <MenuList
            refreshDashboard={DashboardContent.refreshDashboard}
            navigate={navigate}
          />
          <Tooltip title="Logout" placement="left">
            <Button
              icon={<LogoutOutlined />}
              onClick={handleDelete}
              className="btn-logout"
              style={{ backgroundColor: "#B6BBC4" }}
            ></Button>
          </Tooltip>
        </Sider>
      )}
      <Layout>
        {auth && (
          <Header style={{ padding: 0, backgroundColor: "#31304D" }}>
            <Tooltip title="Toggle Menu" placement="left">
              <Button
                type="text"
                className="toggle"
                onClick={() => setCollapsed(!collapsed)}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                style={{ backgroundColor: "#B6BBC4" }}
              />
            </Tooltip>
            <h6 className="user-name">Hi, {name}</h6>
          </Header>
        )}
        {auth && (
           <Content
           style={{ padding: "24px", backgroundColor: colorBgContainer }}
         >
           <Routes>
             <Route path="dashboard" element={<Dashboard />} />
             <Route path="region" element={<Region />} />
             <Route path="province" element={<Province />} />
             <Route path="survey" element={<Survey />} />
             <Route path="mbu" element={<MBU />} />
             <Route path="exportdata" element={<ExportData />} />
           </Routes>
         </Content>
        )}
      </Layout>
    </Layout>
  );
}

export default Universe;
