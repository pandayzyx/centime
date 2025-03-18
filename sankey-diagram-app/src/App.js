import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, addEntry, deleteEntry, updateEntry } from "./features/dataSlice";
import { SankeyChart } from "./components/SankeyChart";
import { Header } from "./components/Header";
import { useTranslation } from "react-i18next";

export default function App() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const data = useSelector((state) => state.data.items);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <Header />
      <h1 className="text-center text-2xl font-bold my-4">{t("title")}</h1>
      <SankeyChart data={data} onAdd={addEntry} onDelete={deleteEntry} onUpdate={updateEntry} />
    </div>
  );
}
