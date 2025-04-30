
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  FormProps,
  Input,
  Select,

} from "antd";
import { Dayjs } from "dayjs";
import {  useSetAtom } from "jotai";

import { taskAtom } from "../../atom/atomStore";

type PropsType = { 
  isModalOpen : boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>; 
}

export const TaskDialog:React.FC<PropsType> = ({isModalOpen,setIsModalOpen}) => {
  type FieldType = {
    task: string;
    assignedto: string;
    deadLine: Dayjs;
  };

  const setTask = useSetAtom(taskAtom);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    setTask((prev) => [...prev, values]);
    setIsModalOpen(false)
    
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
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
          >
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}
              options={[
                {
                  value: "hit_patel",
                  label: "hit_patel",
                },
                {
                  value: "sneha_kumar",
                  label: "sneha_kumar",
                },
                {
                  value: "ravi_shah",
                  label: "ravi_shah",
                },
                {
                  value: "anjali_mehta",
                  label: "anjali_mehta",
                },
                {
                  value: "amit_prajapati",
                  label: "amit_prajapati",
                },
              ]}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Set Deadline"
            name="deadLine"
            rules={[{ required: true, message: "Give deadline of task" }]}
          >
            <DatePicker onChange={onChangeDate} />
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
