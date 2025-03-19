import React, { useEffect } from "react";
import { useDispatch} from "react-redux";
import { fetchChartData } from "./redux/slices/dataSlice";
import Header from "./components/Header/Header";
import SankeyChart from "./components/SankeyChart/SankeyChart";
import EditForm from "./components/EditForm/EditForm";
import styles from "./App.module.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChartData());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Header />
      <SankeyChart />
      <EditForm />
    </div>
  );
}

export default App;