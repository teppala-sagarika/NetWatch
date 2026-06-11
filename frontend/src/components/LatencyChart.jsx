import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function LatencyChart({
  history
}) {

  const data = {

    labels:
      history.map(
        item => item.time
      ),

    datasets: [

      {
        label:
          "Latency (ms)",

        data:
          history.map(
            item => item.latency
          ),

        borderColor:
          "#3b82f6",

        tension: 0.3
      }

    ]

  };
console.log("History:", history);
  return (
    <div
      style={{
        marginTop: "30px",
        background: "#1e293b",
        padding: "20px",
        borderRadius: "10px"
      }}
    >
      <Line data={data} />
    </div>
  );
}

export default LatencyChart;