import { DownOutlined, PoweroffOutlined } from "@ant-design/icons";
import { Menu, Space } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./DefaultLayout.module.scss";

function DefauLayout({ children }) {
  const nagative = useNavigate()
  const items = [
    { label: <Link to="/freelancers">FIND TALENT</Link>, key: "item-1" },
    { label: <Link to="/jobs">FIND OWNER JOBS</Link>, key: "item-2" },
    { label: <Link to="/jobs-freelancer">FIND FREELANCER JOB</Link>, key: "item-3" },
    { label: "ABOUT US", key: "item-4" },
    { label: <div><a href="/login" onClick={() => {localStorage.clear()}}><Space><PoweroffOutlined />Logout</Space></a></div>, key: "item-5" },
  ];
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo} onClick={() => nagative("/")}>
          <img src={require("~/assets/img/logo/logo.png")} />
          <div>FFlancer</div>
        </div>
        <Menu className={styles.nav} mode="horizontal" items={items} selectedKeys={false} />
      </div>
      <div className={styles.container}>{children}</div>
      <div className={styles.footer}>© 2021 FFLance® Global Inc.</div>
    </>
  );
}

export default DefauLayout;
