import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, Popover, Switch, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import  { useEffect, useState } from "react";
import { CgGoogleTasks } from "react-icons/cg";
import { FaRegBell, FaTasks } from "react-icons/fa";
import { SiGoogletasks } from "react-icons/si";
import { TaskList } from "./userComp/TaskList";
import { TaskStatus } from "./userComp/TaskStatus";
import { PiUserListBold } from "react-icons/pi";
import { LuListTodo, LuPanelBottom } from "react-icons/lu";
import { UserList } from "./adminComp/UserList";
import { AssignTask } from "./adminComp/AssignTask";
import { AdminPanel } from "./adminComp/AdminPanel";
import {  onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedkey , setSelectedkey ] = useState("1");
  const [isChecked , setIsChecked] = useState(false);
  const [user,setUser] = useState<User | null>(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  
  const navigate = useNavigate();

  useEffect(()=>{
    const unsub =  onAuthStateChanged(auth,(user)=>{
      setUser(user);
    })
    return ()=> unsub();
  },[user]);


  const handleLogout = async()=>{
    try {
     await auth.signOut();
     navigate("/login");
    } catch (error) {
      console.log("error",error);
    }
  }

  const content = (
    <div className="flex flex-col justify-center item-center gap-1">
      <p>{user?.displayName}</p>
      <p>{user?.email}</p>
      <Button type="primary" danger size="small" onClick={handleLogout}>
  Log Out
</Button>

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
  

  const adminItems = [
    {
      key:"1",
      icon: <LuPanelBottom size={25}/>,
      label: "Admin Panel"
    },
    {
      key:"2",
      icon:<LuListTodo size={22}/>,
      label:"Assign Task"
    },
    {
      key:"3",
      icon: <PiUserListBold size={22} />,
      label : "User List",
    },

   
  ]  

  
  const handleUserRole = (checked:boolean) => {
    setIsChecked(checked);
    setSelectedkey("1"); 
  }

  
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
            selectedKeys={[selectedkey]}
            items={isChecked ? adminItems : items}
            onClick={({key})=>{setSelectedkey(key)}}
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
                <Switch checkedChildren="Admin" unCheckedChildren="user" checked={isChecked} onChange={handleUserRole}></Switch>
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
            {!isChecked && selectedkey === "1" && <TaskList/> } 
            {!isChecked && selectedkey === "2" && <TaskStatus/> } 
            
            {isChecked && selectedkey === "1" && <AdminPanel/> } 
            {isChecked && selectedkey === "2" && <AssignTask/> } 
            {isChecked && selectedkey === "3" && <UserList/> } 

          
          
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
