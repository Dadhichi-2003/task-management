import {
  Button,
  Input,
  InputRef,
  Modal,

  Space,
  Table,
  TableColumnType,
  TableProps,
} from "antd";
import  { useEffect, useRef, useState } from "react";
import { TaskDialog } from "./TaskDialog";
import { useAtom } from "jotai";
// import { taskAtom } from "../../atom/atomStore";
import { Dayjs } from "dayjs";
// import Highlighter from 'react-highlight-words'
import { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

type FieldType = {
  key:string;
  id:string;
  taskTitle: string;
  taskDescription: string;
  assignedName: string;
  task: string;
  priority: string;
  assignDate: Dayjs;
  deadline: Dayjs;
};

export const AssignTask = () => {
  // const [taskData] = useAtom(taskAtom);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [tasks,setTasks] = useState<FieldType[]>([]);
  
  useEffect(()=>{
    const fetchTasks = async()=>{
      try {
        const res = await axios.get("http://localhost:3000/api/tasks/all");
        const data = res.data;
        console.log("tasks data",data);
        const taskWithKeys = data.tasks.map((task:any)=>({
          ...task,key:task.id
        }))
        setTasks(data.tasks)
      } catch (error:any) {
        console.log("error occured",error.message);
        
      }
    }
    fetchTasks();
  },[])
  

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: FieldIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  type FieldIndex = keyof FieldType;

  const getColumnSearchProps = (
    dataIndex: FieldIndex
  ): TableColumnType<FieldType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });



  const handlewithdrawClick = async(id:string)=>{
    try {
      await axios.delete(`http://localhost:3000/api/tasks/delete/${id}`);
      const updatedTasks = tasks.filter((task)=> task.id !== id);
      console.log("updatedtasks",updatedTasks);
      
      setTasks(updatedTasks);
      console.log("Task deleted successfully");
    } catch (error) {
      console.log(error);
    }
  }

const columns: TableProps<FieldType>["columns"] = [
  {
    title: "Task Title",
    dataIndex: "taskTitle",
    key: "taskTitle",
    ...getColumnSearchProps('taskTitle'),
  },
  {
    title: "TasK Description",
    dataIndex: "taskDescription",
    key: "taskDescription",
    ...getColumnSearchProps('taskDescription'),
  },
  {
    title: "Assigned To",
    dataIndex: "assignedName",
    key: "assignedName",
    ...getColumnSearchProps('assignedName'),
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "prority",
    ...getColumnSearchProps('priority'),
  },
  {
    title: "Assigned Date",
    dataIndex: "assignDate",
    key: "assignDate",
    // ...getColumnSearchProps('taskTitle'),
  },
  {
    title: "Deadline",
    dataIndex: "deadline",
    key: "deadline"
    // render: (date: Dayjs) => date.format("DD-MM-YYYY"),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (index, record) => (
      <Button id={index} onClick={()=> handlewithdrawClick(record.id)} variant="solid"  color="red">
        withdraw task
      </Button>
    ),
  },
];

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
        footer={[]}
      >
        <TaskDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </Modal>
      <Table<FieldType> columns={columns} dataSource={tasks} ></Table>
    </div>
  );
};
