import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification, Spin } from "antd";
import { Link } from "react-router-dom";
import API from "~/config/fetchApi";

import storage from "~/untils/storage";
import styles from "./Login.module.scss";
import { useState } from "react";


function Login() {
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    const { email, password } = values;
    const params = { email, password };
    setLoading(true)
    const login = await API.requestPostAPI("/login", params);
    if (login.data) {
      storage.setToken(login.data.accessToken);
      setLoading(false)
      notification.success({
        message: "Login Success",
        duration: 3,
      });
      window.location.href = "/";
    } else {
      setLoading(false)
      notification.error({
        message: "Username or password is incorrect",
        duration: 3,
      });
    }
  };
  
  return (
    <Spin spinning={loading}>
      <div className={styles.container}>
        <Form
          name="login"
          className={styles.loginForm}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <div className={styles.title}>
            <h1>FFlancer - Customer</h1>
            <h2>Login</h2>
          </div>
  
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
  
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              {
                min: 6,
                message: "Please enter at least 6 characters",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
  
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Save Login</Checkbox>
            </Form.Item>
  
            <a className={styles.loginForgot} href="/">
              Forgot password
            </a>
          </Form.Item>
  
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.loginButton}>
              Log in
            </Button>
            Do not have an account ? <Link to="/register">Register</Link>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
}

export default Login;
