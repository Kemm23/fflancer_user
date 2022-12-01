import clsx from "clsx";
import { Spin, Table, Tag } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getTransactions } from "~/store/reducers/adminSlice";

function Transaction() {
  const pageS = 6
  const transactions = useSelector((state) => state.adminReducer.transactions.list);
  const totalPage = useSelector((state) => state.adminReducer.transactions.totalPage);
  const isLoading = useSelector((state) => state.adminReducer.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions({cur: 1, page: pageS }));
  }, []);
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: 50,
    },
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <div>{text} $</div>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => 
      {
        switch(type) {
          case 1:
            return <Tag color="geekblue">Recharge</Tag>
          case 2:
            return <Tag color="green">Withdraw</Tag>
          default:
            return <Tag color="magenta">?</Tag>
        }
      },
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text) => (
        <div>
          <CalendarOutlined /> {text}
        </div>
      ),
    },
  ];
  const data = useMemo(() => {
    if (Boolean(transactions)) {
      return transactions.map((transaction, index) => ({
        key: index + 1,
        fullname: transaction.account.username,
        amount: transaction.amount,
        type: transaction.type,
        time: transaction.createdAt.slice(0, 10).split("-").reverse().join("/"),
      }));
    }
  }, [transactions]);
  return (
    <Spin spinning={isLoading}>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        size="middle"
        pagination={{
          pageSize: pageS,
          total: totalPage*pageS,
          onChange(page) {
            dispatch(getTransactions({ cur: page, page: pageS }))
          }
        }}
      />
    </Spin>
  );
}

export default Transaction;
