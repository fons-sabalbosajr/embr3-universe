import { useState, useEffect } from "react";
import { Button, Layout, theme, Tooltip } from "antd";
import "./index.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Logo from "./components/Logo";
import MenuList from "./components/MenuList";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

const { Header, Sider } = Layout;

function Universe() {
  const [collapsed, setcollapsed] = useState(false);
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
    <>
      {auth ? (
        <Layout>
          <Sider
            width={250}
            collapsed={collapsed}
            collapsible
            trigger={null}
            className="sidebar"
          >
            <Logo />
            <MenuList />
            <Tooltip title="Logout">
            <Button
              icon={<LogoutOutlined />}
              onClick={handleDelete}
              style={{ marginLeft: "25px", marginBottom: "10px" }}
            ></Button>
            </Tooltip>
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <Button
                type="text"
                className="toggle"
                onClick={() => setcollapsed(!collapsed)}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              />
            </Header>
          </Layout>
        </Layout>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Universe;
