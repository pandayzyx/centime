import React from 'react';
import { Chart } from 'react-google-charts';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './SankeyChart.module.css';

const SankeyChart = () => {
  const { flows } = useSelector((state) => state.data);
  const { t } = useTranslation();

  const data = [
    ['From', 'To', 'Amount'],
    ...flows.map(([from, to, amount]) => [t(from), t(to), amount]),
  ];

  return (
    <div className={styles.chartContainer}>
      <Chart
        chartType="Sankey"
        width="100%"
        height="400px"
        data={data}
        options={{
          sankey: {
            node: {
              label: { fontSize: 14 },
              interactivity: true,
            },
          },
        }}
      />
    </div>
  );
};

export default SankeyChart;