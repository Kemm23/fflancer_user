import { Button,  Form, Input, InputNumber, notification, Select, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import API from "~/config/fetchApi";

import styles from "./RegisterFreelancer.module.scss";

function RegisterFreelancer() {
    
  const onFinish = async (values) => {
    console.log({...values, rate: 5, language: values.language.toString()})
    await API.requestPostAPI("/freelancers/register", {...values, rate: 5, language: values.language.toString()})
    .then(() => {
        notification.success({
            message: "Register success",
            duration: 3
        })
        window.location.href = "/"
    })
    .catch((error) => {
        notification.error({
            message: "Register failed",
            duration: 3
        })
        console.log(error)})
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.container}>
      <Form
        name="register"
        className={styles.registerForm}
        initialValues={{
          remember: true,
          ["gender"]: "unknown",
        }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className={styles.title}>
          <h1>FFlancer - Customer</h1>
          <h2>Register Freelancer</h2>
        </div>

        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input your title!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Your Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Your Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Your Number"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your number",
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Gender" name="gender">
          <Select
            style={{
              width: "100%",
            }}
            options={[
              {
                value: "male",
                label: "Male",
              },
              {
                value: "female",
                label: "Female",
              },
              {
                value: "unknown",
                label: "Unknown",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Your Experience"
          name="experience"
          rules={[
            {
              required: true,
              message: "Please type something!",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Your Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please type something!",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Your AVG Earning"
          name="averageIncome"
          rules={[
            {
              required: true,
              message: "Please type something!",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Skill" name="language">
          <Select
            style={{
              width: "100%",
            }}
            rules={[
              {
                required: true,
                message: "Please type something!",
              },
            ]}
            mode="tags"
            options={[
              {
                value: "Java",
                label: "JAVA",
              },
              {
                value: "Html",
                label: "HTML",
              },
              {
                value: "Css",
                label: "CSS",
              },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.registerButton}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegisterFreelancer;
