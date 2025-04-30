import { Button, Modal, Popover, Table, TableProps } from "antd";
import React, { useState } from "react";
import { TaskDialog } from "./TaskDialog";
import { useAtom } from "jotai";
import { taskAtom } from "../../atom/atomStore";
import { Dayjs } from "dayjs";

type FieldType = {
  task: string;
  assignedto: string;
  deadLine: Dayjs;
};

const columns: TableProps<FieldType>["columns"] = [
  {
    title: "task",
    dataIndex: "task",
    key: "task",
  },
  {
    title: "Assigned To",
    dataIndex: "assignedto",
    key: "assignedto",
  },
  {
    title: "DeadLine",
    dataIndex: "deadLine",
    key: "deadline",
    render: (date: Dayjs) => date.format("DD-MM-YYYY"),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, record) => (
      <Button variant="solid" color="red">
        withdraw task
      </Button>
    ),
  },
];
export const AssignTask = () => {
  const [taskData] = useAtom(taskAtom);
  console.log(taskData);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

 
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      
      <Button
        variant="solid"
        color="primary"
        className="my-3 "
        onClick={showModal}
      >
        Assign Task
      </Button>
      <Modal
        title="Assinment of task"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          
        ]}
      >
        <TaskDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </Modal>
      <Table<FieldType> columns={columns} dataSource={taskData}></Table>
    </div>
  );
};
