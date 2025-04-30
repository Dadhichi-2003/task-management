import { Button, Table, TableProps } from "antd";
import React, { useState } from "react";

export const TaskStatus = () => {
  interface taskType {
    task: string;
    deadLine: string;
    assignedBy: string;
    assignedto: string;
    status: string;
    key: number; // apda case ma uid ka taskID avse
  }

  const tasksData: taskType[] = [
    {
      task: "Make a login page",
      deadLine: "12-02-2026",
      assignedBy: "Joe",
      assignedto: "Bharat",
      status: "In progress",
      key: 1,
    },
    {
      task: "Design dashboard UI",
      deadLine: "15-04-2026",
      assignedBy: "Amit",
      assignedto: "Sneha",
      status: "Incomplete",
      key: 2,
    },
    {
      task: "Implement JWT auth",
      deadLine: "18-03-2026",
      assignedBy: "Joe",
      assignedto: "Ravi",
      status: "In progress",
      key: 3,
    },
    {
      task: "Fix navbar bug",
      deadLine: "10-02-2026",
      assignedBy: "Karan",
      assignedto: "Anjali",
      status: "Complete",
      key: 4,
    },
    {
      task: "Create API for tasks",
      deadLine: "20-02-2026",
      assignedBy: "Neha",
      assignedto: "Bharat",
      status: "In progress",
      key: 5,
    },
  ];

  const columns: TableProps<taskType>["columns"] = [
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
      // render:
    },
    {
      title: "AssignedBy",
      dataIndex: "assignedBy",
      key: "assignedBy",
    },
    {
      title: "Deadline",
      dataIndex: "deadLine",
      key: "deadLine",
      sorter: {
        compare: (a, b) => a.deadLine.localeCompare(b.deadLine),
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          {record.status === "Complete" && (
            <Button color="green" variant="text">
              {" "}
              Completed
            </Button>
          )}
          {record.status === "Incomplete" && (
            <Button color="red" variant="text">
              {" "}
              Incomplete
            </Button>
          )}
          {record.status === "In progress" && (
            <Button color="blue" variant="text">
              {" "}
              In Progress
            </Button>
          )}
        </>
      ),
    },
  ];
  const [tasks, setTask] = useState<taskType[]>(tasksData);

  //   const inProgresstask = tasks.filter((task=> task.status === "In progress" ))
  const completeTask = tasks.filter(
    (task) => task.status === "Complete" || "Incomplete"
  );
  console.log(tasks);

  return (
    <>
      <Table<taskType> columns={columns} dataSource={completeTask} />
    </>
  );
};
