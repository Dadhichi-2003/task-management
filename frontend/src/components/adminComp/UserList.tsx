import { Button, Input, Modal, Table, TableProps, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { TaskAssignDailog } from "../TaskAssignDailog";
import { SearchOutlined } from "@ant-design/icons";
import { getAuth } from "firebase/auth";
import axios from "axios";

interface userType {
  key: string;
  username: string;
  email: string;
}

interface EmployeeDocType {
  id: string;
  userData: {
    username: string;
    email: string;
    role: string;
  };
}

export const UserList = () => {
  const [users, setUsers] = useState<userType[]>([]);
  const [username, setUsername] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<userType | null>(null);
  const [loading, setLoading] = useState(false); 

  const showModal = (record: userType) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const fetchUsers = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const idToken = await user?.getIdToken();

    try {
      setLoading(true); 
      const response = await axios.get("http://localhost:3000/api/users/all", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      const employees = response.data
        .filter((emp: EmployeeDocType) => emp.userData.role !== "admin")
        .map((emp: EmployeeDocType) => ({
          key: emp.id,
          username: emp.userData.username,
          email: emp.userData.email,
        }));

      setUsers(employees);
      console.log("Fetched users:", employees);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);  
    }
  };

  const removeUser = async (uid: string) => {
    try {
      const token = await getAuth().currentUser?.getIdToken();
      const response = await axios.delete(`http://localhost:3000/api/users/remove/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const updatedUsers = users.filter((user) => user.key !== uid);
        setUsers(updatedUsers);
      } else {
        const errorData = await response.data;
        console.error("Error deleting user:", errorData.message || errorData.error);
      }
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

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
      key: "action",
      render: (_, record) => (
        <>
          <Button
            danger
            onClick={() => removeUser(record.key)}
            style={{ marginRight: 8 }}
          >
            Remove user
          </Button>
          <Button type="primary" onClick={() => showModal(record)}>
            Assign task
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Find user"
        prefix={<SearchOutlined />}
        className="my-4"
      />

      {loading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <Table<userType>
          dataSource={users.filter((user) =>
            user.username.toLowerCase().includes(username.toLowerCase())
          )}
          columns={columns}
          rowKey="key"
        />
      )}

      {selectedRecord && (
        <Modal
          title="Assign Task"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <TaskAssignDailog
            record={selectedRecord}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      )}
    </>
  );
};
