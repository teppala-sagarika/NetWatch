import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function MetricsChart({ history }) {
  const data = {
    labels: history.labels,

    datasets: [
      {
        label: "CPU %",
        data: history.cpu,
        borderColor: "rgb(255,99,132)",
      },

      {
        label: "Memory %",
        data: history.memory,
        borderColor: "rgb(54,162,235)",
      },

      {
        label: "Disk %",
        data: history.disk,
        borderColor: "rgb(75,192,192)",
      },
    ],
  };

  return (
    <div className="chart-box">
      <Line data={data} />
    </div>
  );
}

export default MetricsChart;