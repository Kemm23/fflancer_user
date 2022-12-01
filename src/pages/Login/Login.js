import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { isAdmin } from "~/store/reducers/adminSlice";
import storage from "~/until/storage";
import styles from "./Login.module.scss";

function Login() {
  const loading = useSelector((state) => state.adminReducer.isLoading);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    const { email, password } = values;
    await dispatch(isAdmin({ email, password }));
    if (Array.isArray(storage.get())) {
      notification.error({
        message: "Username or password is incorrect",
        duration: 3,
      });
    } else {
      notification.success({
        message: "Login Success",
        duration: 3,
      });
      window.location.href = '/dashboard';
      // navigate("/dashboard", {replace: true});
    }
  };
  return (
    <Spin spinning={loading}>
      <div className={styles.container}>
        <Form
          name="normal_login"
          className={styles.loginForm}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <div className={styles.title}>
            <img src={require("~/assets/img/logo/logo.png")} />
            <h1>FFlancer - Admin</h1>
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
            Do not have an account ? <a href="/">Contact now</a>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
}

export default Login;
