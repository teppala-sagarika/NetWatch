import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import LatencyChart
from "../components/LatencyChart";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function DeviceDetails() {

  const { id } = useParams();
const [availability,
setAvailability] =
useState(0);
  const [device, setDevice] =
    useState(null);
const [history, setHistory] =
  useState([]);
  useEffect(() => {

    const loadDevice =
      async () => {

        try {

         const deviceRes =
  await API.get(
    `/devices/${id}`
  );

setDevice(
  deviceRes.data
);

const availabilityRes =
  await API.get(
    `/devices/${id}/availability`
  );

setAvailability(
  availabilityRes.data
    .availability
);

const historyRes =
  await API.get(
    `/devices/${id}/history`
  );

setHistory(

  historyRes.data
    .reverse()
    .map(log => ({

      time:
        new Date(
          log.timestamp
        )
        .toLocaleTimeString(),

      latency:
        log.latency

    }))

);

        } catch (error) {

          console.log(error);

        }

      };

    loadDevice();

  }, [id]);

  if (!device)
    return (
      <h2>
        Loading Device...
      </h2>
    );

  return (

  <div className="layout">

    <Sidebar />

    <div className="main-content">

      <Link to="/devices">
        ← Back
      </Link>

      <h1>
        {device.name}
      </h1>

      <h3>
        Host:
        {device.host}
      </h3>

      <hr />

      <h2>
        Current Status:
        {device.status}
      </h2>

      <h2>
        Current Latency:
        {device.currentLatency} ms
      </h2>

      <h2>
        Average Latency:
        {device.averageLatency} ms
      </h2>

      <h2>
        Maximum Latency:
        {device.maxLatency} ms
      </h2>

      <h2>
  Availability:
  {availability}%
</h2>

      <LatencyChart
        history={history}
      />

    </div>

  </div>

);
}



export default DeviceDetails;