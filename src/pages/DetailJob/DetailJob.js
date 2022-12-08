import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, InputNumber, notification, Row, Upload } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import API from "~/config/fetchApi";
import storage from "~/untils/storage";
import styles from "./DetailJob.module.scss";

function DetailJob() {
  const params = useParams();
  const userLogin = storage.getData();
  const [detailJob, setDetailJob] = useState();
  const [freelancer, setFreelancer] = useState();
  const [customer, setCustomer] = useState();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Success:", values);
    const updateJob = { ...detailJob, ...values };
    const result = await API.requestPostAPI("/api/job/update", updateJob);
    console.log(result);
    if (result.status === 200) {
      notification.success({
        message: "Update Success",
        duration: 3,
      });
    } else {
      notification.error({
        message: "Update fail",
        duration: 3,
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    API.requestGetAPI(`/api/job/${params.jobId}`)
      .then((res) => {
        setDetailJob(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (Boolean(detailJob) && userLogin.role === "USER") {
      API.requestGetAPI(`/v1/freelancers/${detailJob?.freelancerId}`)
        .then((res) => {
          setFreelancer(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [detailJob, userLogin.role]);

  useEffect(() => {
    if (userLogin.role === "FREELANCER" && Boolean(detailJob)) {
      API.requestGetAPI(`/api/account/${detailJob?.accountId}`)
        .then((res) => {
          setCustomer(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [detailJob, userLogin.role]);

  useEffect(() => {
    form.setFieldsValue({
      ["salary"]: detailJob?.salary,
    });
  }, [detailJob, form]);

  if (userLogin.role === "USER") {
    const handleCancelJob = async () => {
      await API.requestPostAPI("/api/job/update", { ...detailJob, status: 0 })
        .then(() => {
          setDetailJob({ ...detailJob, status: 0 });
        })
        .catch(() => {
          notification.error({
            message: "Cancel Job Fail",
            duration: 3,
          });
        });
    };

    const handleHandInFile = async () => {
      await API.requestPostAPI("/api/job/update", { ...detailJob, status: 4 })
        .then(() => {
          setDetailJob({ ...detailJob, status: 4 });
        })
        .catch(() => {
          notification.error({
            message: "Get Job Fail",
            duration: 3,
          });
        });
    };

    const statusJob = (type) => {
      switch (type) {
        case 1:
          return (
            <div className={styles.statusJob}>
              <b>Status: Pending</b>
              <Divider />
              <b>Freelancer is confirming job.</b>
            </div>
          );
        case 2:
          return (
            <div className={styles.statusJob}>
              <b>Status: Processing</b>
              <Divider />
              <b>Freelancer is doing job</b>
            </div>
          );
        case 3:
          return (
            <div className={styles.statusJob}>
              <b>Status: Review</b>
              <Divider />
              <div>
                <div>File</div>
                <Upload defaultFileList={[{ name: detailJob?.result }]} disabled></Upload>
                <Button className={styles.btnDownload}>Download</Button>
              </div>
              <Divider />
              <Button className={styles.btnGetJob} type="primary" onClick={handleHandInFile}>
                Done
              </Button>
              <Button type="default" style={{ width: "100%" }} onClick={handleCancelJob}>
                Reject
              </Button>
            </div>
          );
        case 4:
          return (
            <div className={styles.statusJob}>
              <b>Status: Done</b>
              <Divider />
              <div>
                <div>File</div>
                <Upload defaultFileList={[{ name: detailJob?.result }]} disabled></Upload>
                <Button className={styles.btnDownload} type="primary">
                  Download
                </Button>
              </div>
            </div>
          );
        default:
          return <></>;
      }
    };

    return (
      <div className={styles.container}>
        <h1>See What Job You Had</h1>
        <h2>{detailJob?.subject}</h2>
        <Row gutter={50}>
          <Col flex="60%">
            <Form
              name="update"
              form={form}
              layout="vertical"
              labelCol={{
                span: 8,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item label="Salary" name="salary">
                <InputNumber addonBefore="$" style={{ width: "100%" }} disabled={detailJob?.status !== 1} />
              </Form.Item>

              {detailJob?.status === 1 && (
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ background: "orange" }}>
                    Change
                  </Button>
                </Form.Item>
              )}
            </Form>
            <h3>{detailJob?.description}</h3>
            <Divider />
            <Row>
              <Col flex="33%" className={styles.ffItem}>
                <div style={{ marginRight: "1rem" }}>
                  <UserOutlined />
                </div>
                <div>
                  <b>Name</b>
                  <div>{freelancer?.name}</div>
                </div>
              </Col>
              <Col flex="33%" className={styles.ffItem}>
                <div style={{ marginRight: "1rem" }}>
                  <UserOutlined />
                </div>
                <div>
                  <b>Email</b>
                  <div>{freelancer?.account.email}</div>
                </div>
              </Col>
              <Col flex="33%" className={styles.ffItem}>
                <div style={{ marginRight: "1rem" }}>
                  <UserOutlined />
                </div>
                <div>
                  <b>Timeline</b>
                  <div>{detailJob?.created_at.slice(0, 10)}</div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col flex="auto">{statusJob(detailJob?.status)}</Col>
        </Row>
      </div>
    );
  } else if (userLogin.role === "FREELANCER") {
    const handleGetJob = async () => {
      await API.requestPostAPI("/api/job/update", { ...detailJob, status: 2 })
        .then(() => {
          setDetailJob({ ...detailJob, status: 2 });
        })
        .catch(() => {
          notification.error({
            message: "Get Job Fail",
            duration: 3,
          });
        });
    };

    const handleCancelJob = async (e) => {
      e.preventDefault();
      await API.requestPostAPI("/api/job/update", { ...detailJob, status: 0 })
        .then(() => {
          setDetailJob({ ...detailJob, status: 0 });
        })
        .catch(() => {
          notification.error({
            message: "Cancel Job Fail",
            duration: 3,
          });
        });
    };

    const handleHandInFile = async (values) => {
      await API.requestPostAPI("/api/job/update", { ...detailJob, status: 3, result: values.file.file.name })
        .then(() => {
          setDetailJob({ ...detailJob, status: 3, result: values.file.file.name });
        })
        .catch(() => {
          notification.error({
            message: "Get Job Fail",
            duration: 3,
          });
        });
    };

    const statusJob = (type) => {
      switch (type) {
        case 0:
          return (
            <div className={styles.statusJob}>
              <b>Status: Cancel</b>
              <Divider />
              <b>This job is canceled</b>
            </div>
          );
        case 1:
          return (
            <div className={styles.statusJob} style={{ textAlign: "center" }}>
              <b>Status: Pending</b>
              <Divider />
              <Button className={styles.btnGetJob} onClick={handleGetJob}>
                GET JOB
              </Button>
              <Divider />
              <a href="/" onClick={(e) => handleCancelJob(e)}>
                No, skip this job
              </a>
            </div>
          );
        case 2:
          return (
            <div className={styles.statusJob}>
              <b>Status: Doing</b>
              <Divider />
              <Form onFinish={handleHandInFile}>
                <Form.Item
                  name="file"
                  valuePropName="antdChildren"
                  rules={[
                    {
                      required: true,
                      message: "Please upload your file",
                    },
                  ]}
                >
                  <Upload beforeUpload={() => false}>
                    <Button>
                      <UploadOutlined />
                      Click to Upload
                    </Button>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" className={styles.btnGetJob}>
                    Hand In
                  </Button>
                </Form.Item>
              </Form>
            </div>
          );
        case 3:
          return (
            <div className={styles.statusJob}>
              <b>Status: Preview</b>
              <Divider />
              <div>
                <div>File</div>
                <Upload defaultFileList={[{ name: detailJob?.result }]} disabled></Upload>
                <Button className={styles.btnDownload} type="primary">
                  Download
                </Button>
              </div>
            </div>
          );
        case 4:
          return (
            <div className={styles.statusJob}>
              <b>Status: Done</b>
              <Divider />
              <div>
                <div>File</div>
                <Upload defaultFileList={[{ name: detailJob?.result }]} disabled></Upload>
                <Button className={styles.btnDownload} type="primary">
                  Download
                </Button>
              </div>
            </div>
          );
        default:
          return <></>;
      }
    };
    return (
      <div className={styles.container}>
        <h1>See What Job You Had</h1>
        <h2>{detailJob?.subject}</h2>
        <Row gutter={50}>
          <Col flex="60%">
            <Form
              name="update"
              form={form}
              layout="vertical"
              labelCol={{
                span: 8,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item label="Salary" name="salary">
                <InputNumber addonBefore="$" style={{ width: "100%" }} disabled />
              </Form.Item>
            </Form>
            <h3 dangerouslySetInnerHTML={{ __html: detailJob?.description }}></h3>
            <Divider />
            <Row>
              <Col flex="33%" className={styles.ffItem}>
                <div style={{ marginRight: "1rem" }}>
                  <UserOutlined />
                </div>
                <div>
                  <b>Name</b>
                  <div>{customer?.username}</div>
                </div>
              </Col>
              <Col flex="33%" className={styles.ffItem}>
                <div style={{ marginRight: "1rem" }}>
                  <UserOutlined />
                </div>
                <div>
                  <b>Email</b>
                  <div>{customer?.email}</div>
                </div>
              </Col>
              <Col flex="33%" className={styles.ffItem}>
                <div style={{ marginRight: "1rem" }}>
                  <UserOutlined />
                </div>
                <div>
                  <b>Timeline</b>
                  <div>{detailJob?.created_at.slice(0, 10)}</div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col flex="auto">{statusJob(detailJob?.status)}</Col>
        </Row>
      </div>
    );
  }
}

export default DetailJob;
