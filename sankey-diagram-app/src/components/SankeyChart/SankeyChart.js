import React from 'react';
import { Chart } from 'react-google-charts';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './SankeyChart.module.css';

const SankeyChart = () => {
  const { flows,loading } = useSelector((state) => state.data);
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className={styles.chartContainer}>
        <p>Loading chart...</p>
      </div>
    );
  }

  // Ensure flows is an array and transform it to 2D array for Sankey
  const safeFlows = Array.isArray(flows) ? flows : [];
  const chartData = [
    ['From', 'To', 'Amount'], // Header row
    ...safeFlows.map((flow) => [t(flow.from), t(flow.to), flow.amount]),
  ];

  return (
    <div className={styles.chartContainer}>
      <Chart
        chartType="Sankey"
        width="100%"
        height="400px"
        data={chartData}
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