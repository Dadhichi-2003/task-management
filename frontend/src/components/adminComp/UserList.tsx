import { Button, Input, Popover, Space, Table, TableProps } from "antd";
import React, { useState } from "react";
import { TaskAssignDailog } from "../TaskAssignDailog";
import { SearchOutlined } from "@ant-design/icons";

interface userType {
  username: string;
  email: string;
  key: number; // uid avse ahiya
  // role : string  // role avse ema hiya roles field add krvani thse
}

const usersData: userType[] = [
  { username: "hit_patel", email: "hit.patel@example.com", key: 1 },
  { username: "sneha_kumar", email: "sneha.kumar@example.com", key: 2 },
  { username: "ravi_shah", email: "ravi.shah@example.com", key: 3 },
  { username: "anjali_mehta", email: "anjali.mehta@example.com", key: 4 },
  { username: "amit_prajapati", email: "amit.prajapati@example.com", key: 5 },
];

export const UserList = () => {
  const [username, setUsername] = useState("");

  const columns: TableProps<userType>["columns"] = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",

      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      dataIndex: '"action',
      key: "action",
      render: (_, record) => (
        <>
          {console.log(record.key)}
          <Button
            variant="solid"
            color="danger"
            onClick={() => {
              removeUser(record.key);
            }}
          >
            Remove user
          </Button>{" "}
          <Space />
          <Popover
            content={<TaskAssignDailog record={record} />}
            title="Assign Task"
            trigger="click"
          >
            <Button variant="solid" color="primary">
              {" "}
              Assign task
            </Button>
          </Popover>
        </>
      ),
    },
  ];

  const removeUser = (key: number) => {
    const updatedUsers = users.filter((user) => user.key !== key);
    setUsers(updatedUsers);

    // users.splice(key-1,1);
    // const updatedUser= users;

    // setUsers(updatedUser)

    // console.log(updatedUser);
  };

  const [users, setUsers] = useState<userType[]>(usersData);

  return (
    <>
      <Input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="Find user"
        prefix={<SearchOutlined />}
        className="my-4"
      ></Input>
      <Table<userType>
        dataSource={users.filter((user) =>
          user.username.toLowerCase().includes(username.toLowerCase())
        )}
        columns={columns}
      />
    </>
  );
};
