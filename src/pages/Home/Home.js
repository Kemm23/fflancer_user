import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./Home.module.scss";
import { userInfo } from "~/store/reducers/customerSlice";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userInfo());
  }, []);
  return <div className={styles.content}>Home Page</div>;
}

export default Home;
