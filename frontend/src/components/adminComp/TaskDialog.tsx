import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  message,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { createTask } from "../../atom/task.atom";
import axios from "axios";
import { auth } from "../../firebase/firebase";

type PropsType = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type FieldType = {
  taskTitle: string;
  taskDescription: string;
  assignedTo: string;
  priority: string;
  assignDate: Dayjs;
  deadline: Dayjs;
};

type UserType = {
  id: string;
  userData: {
    username: string;
    email: string;
    role:string;
  };
};


export const TaskDialog: React.FC<PropsType> = ({ setIsModalOpen }) => {
  const setCreateTask = useSetAtom(createTask);
  const [users, setUsers] = useState<UserType[]>([]);

  const fetchUsers = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await axios.get("http://localhost:3000/api/users/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data); 
      console.log("users",res.data);
      
    } catch (error) {
      message.error("Failed to fetch users");
      console.error("User fetch error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onFinish = async (values: FieldType) => {
    console.log("Form values:", values);  
  
    const payload = {
      taskTitle: values.taskTitle,
      taskDescription: values.taskDescription,
      assignedTo: values.assignedTo,
      priority: values.priority,
      assignDate: values.assignDate.toISOString(), 
      deadline: values.deadline.toISOString(),
    };
    
  
    console.log("Payload:", payload);

    try {
      await setCreateTask(payload);
      message.success("Task assigned successfully!");
      setIsModalOpen(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error assigning task", error);
      }
    }
  };
  

  return (
    <Form
      name="taskForm"
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 700 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Task Title"
        name="taskTitle"
        rules={[{ required: true, message: "Please enter the task title" }]}
      >
        <Input placeholder="Enter task title" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Task Description"
        name="taskDescription"
        rules={[{ required: true, message: "Please enter task description" }]}
      >
        <Input placeholder="Enter task description" />
      </Form.Item>

      <Form.Item<FieldType>
        label="AssignedTo"
        name="assignedTo"
        rules={[{ required: true, message: "Please assign the task" }]}
      >
       <Select placeholder="Select user">
  {users.map((user) => (
    <Select.Option key={user.id} value={user.id}>
      {user.userData.username}
    </Select.Option>
  ))}
</Select>

      </Form.Item>

      <Form.Item<FieldType>
        label="Priority"
        name="priority"
        rules={[{ required: true, message: "Please select priority" }]}
      >
        <Select
          placeholder="Select priority"
          options={[
            { value: "Important", label: "Important" },
            { value: "Moderate", label: "Moderate" },
            { value: "Low", label: "Low" },
          ]}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="Assign Date"
        name="assignDate"
        initialValue={dayjs()}
        rules={[{ required: true, message: "Please select assign date" }]}
      >
        <DatePicker format="DD-MM-YYYY" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Deadline"
        name="deadline"
        rules={[{ required: true, message: "Please select deadline" }]}
      >
        <DatePicker format="DD-MM-YYYY" />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Assign Task
      </Button>
    </Form>
  );
};
