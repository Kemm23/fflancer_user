import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

function Report() {
  return (
    <div style={{margin: 30}}>
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard">
            <HomeOutlined /> Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <strong>Statistical Report</strong>
          </Breadcrumb.Item>
        </Breadcrumb>
        <h1>List Report</h1>
        <p>Select a report type you want to view</p>
    </div>
  );
}

export default Report;
