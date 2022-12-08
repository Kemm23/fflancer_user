import { ArrowRightOutlined, CheckCircleOutlined, FieldTimeOutlined, SendOutlined } from "@ant-design/icons";
import { Button, List, Tabs } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getListJob } from "~/store/reducers/customerSlice";
import storage from "~/untils/storage";
import styles from "./Jobs.module.scss";

function Jobs() {
  const listJob = useSelector((state) => state.customerSlice.listJob);
  const userLogin = storage.getData()
  const dispatch = useDispatch();

  const negative = useNavigate()

  useEffect(() => {
    const params = { accountId: userLogin.id };
    dispatch(getListJob(params));
  }, []);

  const items = [
    {
      label: (
        <div style={{ textAlign: "center", color: "orange" }}>
          <FieldTimeOutlined />
          <div>Pending</div>
        </div>
      ),
      key: "item-1",
      children: Boolean(listJob) && (
        <List
          size="large"
          header={<b>JOB IN PENDING</b>}
          bordered
          dataSource={listJob.filter((job) => job.status === 1)}
          renderItem={(item) => (
              <List.Item
              actions={[<Button type="primary" onClick={() => negative(`/job/${item.id}`)}>GO TO DETAIL<ArrowRightOutlined /></Button>]}>
                <List.Item.Meta 
                title={item.subject}
                description={<div style={{color: "black"}}>
                    <div><strong>Salary: </strong>{item.salary}$</div>
                    <div><strong>Response Date: </strong>{item.response_date.slice(0, 10).split("-").reverse().join("/")}</div>
                    <div>{item.description}</div>
                </div>}
                />
              </List.Item>
          )}
        />
      ),
    },
    {
      label: (
        <div style={{ textAlign: "center", color: "orange" }}>
          <SendOutlined />
          <div>Processing</div>
        </div>
      ),
      key: "item-2",
      children: Boolean(listJob) && (
        <List
          size="large"
          header={<b>JOB IN PROCESSING</b>}
          bordered
          dataSource={listJob.filter((job) => job.status === 2 || job.status === 3)}
          renderItem={(item) => (
              <List.Item
              actions={[<Button type="primary" onClick={() => negative(`/job/${item.id}`)}>GO TO DETAIL<ArrowRightOutlined /></Button>]}>
                <List.Item.Meta 
                title={item.subject}
                description={<div style={{color: "black"}}>
                    <div><strong>Salary: </strong>{item.salary}$</div>
                    <div><strong>Response Date: </strong>{item.response_date.slice(0, 10).split("-").reverse().join("/")}</div>
                    <div>{item.description}</div>
                </div>}
                />
              </List.Item>
          )}
        />
      ),
    },
    {
      label: (
        <div style={{ textAlign: "center", color: "orange" }}>
          <CheckCircleOutlined />
          <div>Success</div>
        </div>
      ),
      key: "item-3",
      children: Boolean(listJob) && (
        <List
          size="large"
          header={<b>JOB SUCCESS</b>}
          bordered
          dataSource={listJob.filter((job) => job.status === 4)}
          renderItem={(item) => (
              <List.Item
              actions={[<Button type="primary" onClick={() => negative(`/job/${item.id}`)}>GO TO DETAIL<ArrowRightOutlined /></Button>]}>
                <List.Item.Meta 
                title={item.subject}
                description={<div style={{color: "black"}}>
                    <div><strong>Salary: </strong>{item.salary}$</div>
                    <div><strong>Response Date: </strong>{item.response_date.slice(0, 10).split("-").reverse().join("/")}</div>
                    <div>{item.description}</div>
                </div>}
                />
              </List.Item>
          )}
        />
      ),
    },
  ];

return (
    <div className={styles.container}>
      <h1>My Owner Jobs</h1>
      <div className={styles.wrapper}>
        <Tabs  centered size="large" style={{ width: "100%"}} items={items} />
      </div>
    </div>
  );
}

export default Jobs;
