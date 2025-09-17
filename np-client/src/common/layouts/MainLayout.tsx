import { Avatar, Col, Input, Layout, Menu, Row } from "antd";
import {
    HomeOutlined,
    InfoCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const MainLayout = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Sidebar */}
            <Sider
                collapsible
                collapsed={collapsed}
                trigger={null} // ẩn nút mặc định
                style={{
                    background: "#fff",
                    borderRight: "1px solid #f0f0f0",
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        height: 50,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: collapsed ? 20 : 20,
                        color: "#1677ff",
                        transition: "all 0.3s",
                    }}
                >
                    {collapsed ? "M" : "MyApp"}
                </div>

                {/* Menu */}
                <Menu
                    mode='vertical'
                    selectedKeys={[location.pathname]}
                    items={[
                        {
                            key: "/",
                            icon: <HomeOutlined />,
                            label: <Link to="/">Home</Link>,
                        },
                        {
                            key: "/about",
                            icon: <InfoCircleOutlined />,
                            label: <Link to="/about">About</Link>,
                        },
                        {
                            key: '/personal-task',
                            icon: <UserOutlined />,
                            label: <Link to='/personal-task'>Cá nhân</Link>
                        },
                        {
                            key: '/group-task',
                            icon: <TeamOutlined />,
                            label: <Link to='/group-task'>Nhóm</Link>
                        }
                    ]}
                />
            </Sider>

            {/* Layout Content */}
            <Layout>
                {/* Header */}
                <Header
                    style={{
                        background: "#fff",
                        padding: "0 10px",
                        borderBottom: "1px solid #f0f0f0",
                        display: 'flex',
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: 50,
                        // borderRadius: 10
                    }}
                >

                    <Row style={{ width: '100%', justifyContent: 'flex-end' }}>
                        <Col flex={1} onClick={() => setCollapsed(!collapsed)} style={{ cursor: 'pointer', fontSize: 18 }}>
                            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        </Col>
                        <Col flex={100}>
                            <Search
                                placeholder="Tìm kiếm nhanh..."
                                allowClear
                                enterButton
                                style={{ width: 800, paddingTop: 15, paddingLeft: 10, borderRadius: 10 }}
                                size='middle'
                            />
                        </Col>
                        <Col offset={4}>
                            <Avatar
                                style={{ paddingRight: 10, backgroundColor: 'gray' }}
                            />
                        </Col>
                    </Row>
                </Header>

                {/* Nội dung */}
                <Content
                    style={{
                        margin: "16px",
                        padding: 24,
                        background: "#fff",
                        borderRadius: 10,
                        transition: "all 0.3s",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
