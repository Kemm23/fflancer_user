import clsx from "clsx";
import { Button, Space, Table, Rate, Tag, Spin, Drawer, Row, Col, Modal } from "antd";
import { DeleteOutlined, EditOutlined, HomeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getFreelancers } from "~/store/reducers/adminSlice";

function Freelancer() {
  let pageSize = 5
  const freelancers = useSelector((state) => state.adminReducer.freelancers.list);
  const totalPage = useSelector((state) => state.adminReducer.freelancers.totalPage);
  const isLoading = useSelector((state) => state.adminReducer.isLoading);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false)
  const [info, setInfo] = useState()
  const handleShowDrawer = (data) => {
    setInfo(data)
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFreelancers({ cur: 1, page: pageSize }));
  }, []);
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: 50,
      fixed: 'left'
    },
    {
      title: "Information",
      dataIndex: "information",
      key: "information",
      render: ({name, avatar}) => <Space><img style={{scale: "0.5", borderRadius: "50%"}} src={avatar}/><strong>{name}</strong></Space>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Phone number",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => (
        <div>
          <HomeOutlined style={{ marginRight: "0.5rem" }} />
          {text}
        </div>
      ),
    },
    {
      title: "Language",
      dataIndex: "languages",
      key: "languages",
      render: (_, {languages}) => <>
        {
         languages.map((language, index) => {
          return (
            <Tag color="geekblue" key={index}>{language}</Tag>
          )
         }) 
        }
      </>,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      width: 100,
      render: (data) => <Rate allowHalf disabled defaultValue={data} />,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 80,
      render: (_, record) => (
          <Space size="middle">
            <Button onClick={() => handleShowDrawer(record.freelancer)}>
              <EditOutlined />
            </Button>
            <Button onClick={() => setConfirm(true)}>
              <DeleteOutlined />
            </Button>
          </Space>
      ),
    },
  ];
  const data = useMemo(() => {
    if (Boolean(freelancers)) {
      return freelancers.map((freelancer, index) => ({
        key: index + 1,
        information: {name: freelancer.name, avatar: freelancer.thumbnail},
        gender: freelancer.gender,
        phone: freelancer.phone,
        address: freelancer.address,
        languages: freelancer.language.split(", "),
        rate: freelancer.rate,
        action: "",
        freelancer
      }));
    }
  }, [freelancers]);
  return (
    <Spin spinning={isLoading}>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        size="small"
        pagination={{
          pageSize: pageSize,
          total: totalPage*pageSize,
          onChange(page) {
            dispatch(getFreelancers({ cur: page, page: pageSize }))
          }
        }}
      />
      {Boolean(info) ? <Drawer
          title="Freelancer Information"
          placement="right"
          size="large"
          onClose={onClose}
          open={open}
        >
          <Row>
              <Space size="middle">
                <Col>
                  <img style={{borderRadius: "50%"}} src={info.thumbnail}/>
                </Col>
                <Col>
                  <strong>{info.name}</strong>
                  <div>{info.address}</div>
                  <Rate allowHalf disabled defaultValue={info.rate} />
                </Col>
              </Space>
          </Row>
          <Row style={{margin: "20px 0"}}>
            <Col span={12}><strong>Fullname: </strong>{info.name}</Col>
            <Col span={12}><strong>Gender: </strong>{info.gender}</Col>
          </Row>
          <Row style={{margin: "20px 0"}}>
            <Col span={12}><strong>Phone: </strong>{info.phone}</Col>
            <Col span={12}><strong>Experience: </strong>{info.experience}</Col>
          </Row>
          <Row style={{margin: "20px 0"}}>
            <Col span={12}><strong>Description: </strong><div dangerouslySetInnerHTML={{__html: info.description}}></div></Col>
            <Col span={12}><strong>Average income: </strong>{info.averageIncome}$</Col>
          </Row>
          <Row style={{margin: "20px 0"}}>
            <Col span={12}><strong>Total job success: </strong>{info.totalJobDone}</Col>
            <Col span={12}><strong>Total income: </strong>{info.totalEarning}$</Col>
          </Row>
          <Row style={{margin: "20px 0"}}>
            <Col span={12}><strong>Language: </strong>{info.language.split(", ").map((item, index) => <Tag color="geekblue" key={index}>{item}</Tag>)}</Col>
          </Row>
        </Drawer> : <></>}
        <Modal title="Are you sure you want to delete user account?" open={confirm} onCancel={() => setConfirm(false)} onOk={() => setConfirm(false)}>
        <p>Deleted data cannot be recovered</p>
      </Modal>
    </Spin>
  );
}

export default Freelancer;
