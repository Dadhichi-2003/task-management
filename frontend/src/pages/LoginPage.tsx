import { Button, Form, FormProps, Input } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const LoginPage = () => {

  const navigate = useNavigate();
  type FieldType = {
    email: string;
    password: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async(values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth,values.email,values.password);

      const idToken = await userCredential.user.getIdTokenResult(true);
      const role = idToken.claims.role;
      console.log("role",);
      console.log("role",idToken.claims);
      await axios.post("http://localhost:3000/api/user/login",{idToken:idToken.token});

      if(role=== "admin"){
        navigate("/assigntask");
      }else{
        navigate("/")
      }
      console.log("authUser",auth.currentUser);
      toast.success("Login Successfully");
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="shadow-2xl w-200 text-center rounded-2xl bg-gray-100  ">
        <h1 className="text-2xl m-5 text-center font-bold my-5"> LOGIN </h1>
        <Form
          name="basic"
          // labelCol={{ span:5 }}
          // wrapperCol={{ span: 20 }}
          // style={{ maxWidth: 500 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="flex justify-center items-center gap-3 "
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
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input placeholder="enter your password" />
            </Form.Item>
            <Form.Item>
              <Button color="cyan" variant="outlined" htmlType="submit">
                Login
              </Button>
            </Form.Item>
            <Form.Item>
              <p>
                {" "}
                don't have an account ? <Link to="/signup"> Signup</Link>{" "}
              </p>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
