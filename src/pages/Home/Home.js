import { Button, Col, Input, Row, Space } from "antd";
import styles from "./Home.module.scss";

function Home() {
  return <div className={styles.container}>
    <Row>
    <Col flex="50%">
    <h1>Join the world's work marketplace</h1>
    <p>Find great talent. Build your business.
Take your career to the next level.</p>
    <div className={styles.wrapperSearch}>
        <Input className={styles.search} placeholder="Some name, skill,..." />
        <Button className={styles.btnSearch}>Find Talent</Button>
    </div>
    </Col>
    <Col>
      <img src={require("~/assets/img/banner.jpg")}/>
    </Col>
    </Row>
  </div>;
}

export default Home;
