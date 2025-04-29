import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, Popover, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { CgGoogleTasks } from "react-icons/cg";
import { FaRegBell, FaTasks } from "react-icons/fa";
import { SiGoogletasks } from "react-icons/si";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const content = (
    <div className="flex flex-col justify-center item-center gap-1">
      <p> Hit patel</p>
      <p> Hit12@gmail.com</p>
    </div>
  );

  
  const items = [
    {
      key: "1",
      icon: <FaTasks size={20} />,
      label: "To do",
    },
    {
      key: "2",
      icon: <CgGoogleTasks size={25} />,
      label: "Task Status",
    },
  ]
  
  
  return (
    <>
      <Layout className="h-screen">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <div className="text-3xl  text-white flex justify-center items-center m-4">
            <SiGoogletasks />
            {collapsed === false && (
              <span className="hidden md:flex mx-4"> tasky </span>
            )}
          </div>
          <Menu
            
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <div className="flex justify-between items-center">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <div className="flex justify-center  items-center gap-6 mr-5">
                <FaRegBell className="size-5" />
                <Popover content={content} title="User Detail">
                  <Avatar className="size-20">U</Avatar>
                </Popover>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {items?.map((item)=>{
                return <>
                    {
                        item.key === "1" && <> tasks </>
                    }
                    {/* {
                        item.key === "2" && <> STATUS </>
                    } */}
                </>
            })}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
