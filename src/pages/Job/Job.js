import clsx from "clsx";
import { Button, Col, Drawer, Rate, Row, Spin, Table, Tag } from "antd";
import { CalendarOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getJobs } from "~/store/reducers/adminSlice";

function Job() {
  const jobs = useSelector((state) => state.adminReducer.jobs.list);
  const totalPage = useSelector((state) => state.adminReducer.jobs.totalPage);
  const isLoading = useSelector((state) => state.adminReducer.isLoading);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState()
  const handleShowDrawer = (data) => {
    setInfo(data)
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getJobs({ cur: 1, page: 6 }));
  }, []);
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: 50,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Renter",
      dataIndex: "renter",
      key: "renter",
    },
    {
      title: "Freelancer",
      dataIndex: "freelancer",
      key: "freelancer",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      render: (text) => <div>{text} $</div>
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => 
      {
        switch(status) {
          case 4:
            return <Tag color="green">Done</Tag>
          case 0:
            return <Tag color="red">Close</Tag>
          case 2:
            return <Tag color="blue">Doing</Tag>
          case 1: 
            return <Tag color="gold">Pending</Tag>
          default:
            return <Tag color="magenta">?</Tag>
        }
      },
    },
    {
      title: "Create at",
      dataIndex: "createAt",
      key: "createAt",
      render: (text) => (
        <div>
          <CalendarOutlined /> {text}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 80,
      render: (_, record) => (
        <Button onClick={() => handleShowDrawer(record.job)}>
          <EditOutlined />
        </Button>
      ),
    },
  ];
  const data = useMemo(() => {
    if (Boolean(jobs)) {
      return jobs.map((job, index) => ({
        key: index + 1,
        subject: job.subject,
        renter: job.account.username,
        freelancer: job.freelancer.name,
        salary: job.salary,
        status: job.status,
        createAt: job.created_at.slice(0, 10).split("-").reverse().join("/"),
        action: "",
        job
      }));
    }
  }, [jobs]);
  return (
    <Spin spinning={isLoading}>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        size="middle"
        pagination={{
          pageSize: 6,
          total: totalPage*6,
          onChange(page) {
            dispatch(getJobs({ cur: page, page: 6 }))
          }
        }}
      />
      {Boolean(info) ? <Drawer
          title="Job Information"
          placement="right"
          size="large"
          onClose={onClose}
          open={open}
        >
          <Row style={{margin: "20px 0"}}>
            <Col span={12}><strong>Subject: </strong>{info.subject}</Col>
            <Col span={12}><strong>Salary: </strong>{info.salary} $</Col>
          </Row>
          <Row style={{margin: "20px 0"}}>
            <Col span={12}><strong>Renter: </strong>{info.account.username}</Col>
            <Col span={12}><strong>Freelancer: </strong>{info.freelancer.name}</Col>
          </Row>
          <Row style={{margin: "20px 0"}}>
            <Col><strong>Description: </strong><div dangerouslySetInnerHTML={{__html: info.description}}></div></Col>
          </Row>
          <Row style={{margin: "20px 0"}}>
            <Col span={12}><strong>Status: </strong>{info.status === 4 && <Tag color="green">Done</Tag>}{info.status === 0 && <Tag color="red">Close</Tag>}{info.status === 2 && <Tag color="blue">Doing</Tag>}{info.status === 1 && <Tag color="gold">Pending</Tag>}</Col>
            <Col span={12}><strong>Result: </strong>{info.result}</Col>
          </Row>
          <Row style={{margin: "20px 0"}}>
          <Col span={12}>
            <strong>Comment: </strong>
            <Rate allowHalf disabled value={info.rate} />
            <div>{info.comment}</div>
          </Col>
          </Row>
        </Drawer> : <></>}
    </Spin>
  );
}

export default Job;
