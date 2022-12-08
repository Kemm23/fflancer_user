import {
  Avatar,
  Button,
  Col,
  Divider,
  Drawer,
  Input,
  List,
  Modal,
  Rate,
  Row,
  Space,
  Spin,
  Tag,
  Form,
  DatePicker,
  InputNumber,
  notification,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import API from "~/config/fetchApi";
import { getFreelancers } from "~/store/reducers/freelancerSlice";
import APICode from "~/untils/APICode";
import storage from "~/untils/storage";
import styles from "./Freelancer.module.scss";

function Freelancers() {
  const freelancers = useSelector((state) => state.freelancerSlice.freelancers);
  const userLogin = storage.getData();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [info, setInfo] = useState();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setModal(false);
    setConfirmLoading(true);
    const { salary, subject, description } = values;
    const params = {
      salary,
      subject,
      description,
      accountId: userLogin.id,
      freelancerId: info.id,
    };
    const res = await API.requestPostAPI("/api/job", params);
    console.log(res);
    if (res.status === APICode.SUCCESS) {
      notification.success({
        message: "Create Job Success",
        duration: 3,
      });
      setConfirmLoading(false);
    } else {
      notification.error({
        message: "Failed To Create Job",
        duration: 3,
      });
      setConfirmLoading(false);
    }
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleOpenDrawer = (index) => {
    setInfo(freelancers.data[index]);
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getFreelancers());
  }, []);

  return (
    <div className={styles.container}>
      <h1>See talent who match jobs like yours</h1>
      <Input className={styles.search} placeholder="Some name, skills...." />
      <h2>Get proposals from talent like this</h2>
      <List
        grid={{ gutter: 16, column: 2 }}
        itemLayout="horizontal"
        dataSource={freelancers.data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.thumbnail} />}
              title={
                  <a
                    href="https://ant.design"
                    onClick={(e) => {
                      e.preventDefault();
                      handleOpenDrawer(index);
                    }}
                  >
                    {item.name}
                  </a>
              }
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            <Divider />
          </List.Item>
        )}
      />
      {Boolean(info) ? (
        <Drawer
          title="Freelancer Information"
          placement="right"
          size="large"
          onClose={() => setOpen(false)}
          open={open}
        >
          <Row justify="space-between">
            <Space size="middle">
              <Col>
                <img style={{ borderRadius: "50%" }} src={info.thumbnail} />
              </Col>
              <Col>
                <strong>{info.name}</strong>
                <div>{info.address}</div>
                <Rate allowHalf disabled defaultValue={info.rate} />
              </Col>
            </Space>
            <Button type="primary" onClick={() => setModal(true)} disabled={info.account.id === userLogin.id}>
              Connect
            </Button>
          </Row>
          <Row style={{ margin: "20px 0" }}>
            <Col span={12}>
              <strong>Fullname: </strong>
              {info.name}
            </Col>
            <Col span={12}>
              <strong>Gender: </strong>
              {info.gender}
            </Col>
          </Row>
          <Row style={{ margin: "20px 0" }}>
            <Col span={12}>
              <strong>Phone: </strong>
              {info.phone}
            </Col>
            <Col span={12}>
              <strong>Experience: </strong>
              {info.experience}
            </Col>
          </Row>
          <Row style={{ margin: "20px 0" }}>
            <Col span={12}>
              <strong>Description: </strong>
              <div dangerouslySetInnerHTML={{ __html: info.description }}></div>
            </Col>
            <Col span={12}>
              <strong>Average income: </strong>
              {info.averageIncome}$
            </Col>
          </Row>
          <Row style={{ margin: "20px 0" }}>
            <Col span={12}>
              <strong>Total job success: </strong>
              {info.totalJobDone}
            </Col>
            <Col span={12}>
              <strong>Total income: </strong>
              {info.totalEarning}$
            </Col>
          </Row>
          <Row style={{ margin: "20px 0" }}>
            <Col span={12}>
              <strong>Language: </strong>
              {info.language.split(", ").map((item, index) => (
                <Tag color="geekblue" key={index}>
                  {item}
                </Tag>
              ))}
            </Col>
          </Row>
        </Drawer>
      ) : (
        <></>
      )}
      <Modal
        title="Create Job"
        open={modal}
        okText="Create"
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setModal(false);
          form.resetFields();
        }}
      >
        <Form
          form={form}
          name="basic"
          layout="vertical"
          labelCol={{
            span: 8,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Subject"
            name="subject"
            rules={[
              {
                required: true,
                message: "Please enter the subject",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter the description",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Salary"
            name="salary"
            rules={[
              {
                required: true,
                message: "Please enter the cost",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Response Date"
            name="createAt"
            rules={[
              {
                required: true,
                message: "Please enter the date",
              },
            ]}
          >
            <DatePicker format="YYYY/MM/DD" style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Freelancers;
