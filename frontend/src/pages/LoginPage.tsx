import { Button, Form, FormProps, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const LoginPage = () => {
  const navigate = useNavigate();

  type FieldType = {
    email?: string;
    password?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email!, values.password!);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Login failed:", error);
      }
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-2xl w-200 text-center rounded-2xl bg-gray-100">
        <h1 className="text-2xl m-5 text-center font-bold my-5">LOGIN</h1>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="flex justify-center items-center gap-3"
        >
          <div>
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="enter your Email" />
            </Form.Item>
            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password placeholder="enter your password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
            <Form.Item>
              <p>
                Don't have an account? <Link to="/signup">Signup</Link>
              </p>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
