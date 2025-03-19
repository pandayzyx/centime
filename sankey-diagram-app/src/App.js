import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChartData } from "./redux/slices/dataSlice";
import Header from "./components/Header/Header";
import SankeyChart from "./components/SankeyChart/SankeyChart";
import EditForm from "./components/EditForm/EditForm";
import { useTranslation } from "react-i18next";
import styles from "./App.module.css";

function App() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { income, expenditure } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchChartData());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Header />
      <SankeyChart data={{ income, expenditure }} />
      <EditForm />
    </div>
  );
}

export default App;