// Universe.jsx
import React, { useState, useEffect } from 'react';
import { Button, Layout, theme, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from './components/Logo';
import MenuList from './components/MenuList';
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Dashboard from './menu-component/Dashboard';
import './index.css';
import Province from './menu-province/Province';

const { Header, Sider, Content } = Layout;

function DashboardContent() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshDashboard = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

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
      .get('http://localhost:8081')
      .then((res) => {
        if (res.data.Status === 'Success') {
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
      .get('http://localhost:8081/logout')
      .then((res) => {
        setAuth(false);
        setName('');
        navigate('/home', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {auth && (
        <Sider
          width={250}
          collapsible
          trigger={null}
          collapsed={collapsed}
          className='sidebar'
        >
          <Logo />
          <MenuList refreshDashboard={DashboardContent.refreshDashboard} />
          <Tooltip title='Logout' placement='left' arrowPointAtCenter>
            <Button
              icon={<LogoutOutlined />}
              onClick={handleDelete}
              className='btn-logout'
              style={{ backgroundColor: '#B6BBC4' }}
            ></Button>
          </Tooltip>
        </Sider>
      )}
      <Layout>
        {auth && (
          <Header style={{ padding: 0, backgroundColor: '#31304D' }}>
            <Tooltip title='Toggle Menu' placement='left' arrowPointAtCenter>
              <Button
                type='text'
                className='toggle'
                onClick={() => setCollapsed(!collapsed)}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                style={{ backgroundColor: '#B6BBC4' }}
              />
            </Tooltip>
            <h6 className='user-name'>Hi, {name}</h6>
          </Header>
        )}
        {auth && (
        <Content style={{ padding: "24px", backgroundColor: colorBgContainer }}>
        <DashboardContent />
        {/* ... (other code) */}
      </Content>
        )}
      </Layout>
    </Layout>
  );
}

export default Universe;
