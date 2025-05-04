import { Button, Form, FormProps, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { signupAtom } from "../atom/auth.atom";

export const SignupPage = () => {
  type FieldType = {
    username?: string;
    email?: string;
    password?: string;
    tech?: string; 
  };
  const navigate = useNavigate();
  const signup = useSetAtom(signupAtom);
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await signup({username:values.username!,email:values.email!,password:values.password!,tech:values.tech!});
      navigate("/login");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="shadow-2xl w-200 text-center rounded-2xl bg-gray-100">
        <h1 className="text-2xl m-5 text-center font-bold my-5">SIGNUP</h1>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="flex justify-center items-center gap-3 "
        >
          <div>
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please Enter Username" }]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "The input is not a valid email address!",
                },
              ]}
            >
              <Input placeholder="Enter your Email" />
            </Form.Item>
            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input type="password" placeholder="Enter your password" />
            </Form.Item>
            <Form.Item<FieldType>
              label="Technology"
              name="tech"
              rules={[{ required: true, message: "Please select your technology" }]}
            >
              <Input placeholder="Enter your technology" />
            </Form.Item>
            <Form.Item>
              <Button color="cyan" variant="outlined" htmlType="submit">
                Signup
              </Button>
            </Form.Item>
            <Form.Item>
              <p>
                Don't have an account? <Link to="/login">Login</Link>
              </p>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
