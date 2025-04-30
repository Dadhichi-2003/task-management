import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  FormProps,
  Input,
} from "antd";
import { Dayjs } from "dayjs";
import React from "react";

interface TaskAssignDailogProps {
  record: {
    username: string;
    email: string;
    key: number;
  };
}

export const TaskAssignDailog: React.FC<TaskAssignDailogProps> = ({
  record,
}) => {
  type FieldType = {
    task: string;
    assignedto: string;
    deadLine: Dayjs;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    let _values = {
      ...values,
      deadLine: values.deadLine.format("MM-DD-YYYY"),
    };
    console.log("Success:", _values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div>
      <Form
        name="basic"
        // labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 700 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="flex flex-col justify-start items-start">
          <Form.Item<FieldType>
            label="Task Description"
            name="task"
            rules={[{ required: true, message: "please enter the task" }]}
          >
            <Input placeholder="Enter task" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Assigned to "
            name="assignedto"
            rules={[{ required: true, message: "assign task " }]}
            initialValue={record.username}
          >
            <Input placeholder="" value={record.username} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Set Deadline"
            name="deadLine"
            rules={[{ required: true, message: "Give deadline of task" }]}
          >
            <DatePicker format="DD-MM-YYYY" onChange={onChange} />
          </Form.Item>
        </div>
        <Button
          variant="solid"
          color="primary"
          htmlType="submit"
          className="text-center"
        >
          {" "}
          Assign
        </Button>
      </Form>
    </div>
  );
};
