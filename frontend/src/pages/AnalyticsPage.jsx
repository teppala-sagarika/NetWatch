import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import jsPDF from "jspdf";

function AnalyticsPage() {

  const [devices, setDevices] =
    useState([]);

  const loadDevices =
    async () => {

      const res =
        await API.get(
          "/devices"
        );

      setDevices(
        res.data
      );

    };

  useEffect(() => {

    loadDevices();

  }, []);

  const averageLatency =

    devices.length > 0

    ? Math.round(

        devices.reduce(
          (sum, device) =>
            sum + device.latency,
          0
        ) / devices.length

      )

    : 0;

  const sortedDevices =
    [...devices]
      .sort(
        (a, b) =>
          b.latency -
          a.latency
      )
      .slice(0, 5);

const exportCSV = () => {

  const headers =
    "Name,Host,Status,Latency\n";

  const rows =
    devices.map(device =>

      `${device.name},${device.host},${device.status},${device.latency}`

    ).join("\n");

  const csv =
    headers + rows;

  const blob =
    new Blob(
      [csv],
      {
        type:
        "text/csv"
      }
    );

  const url =
    window.URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href = url;

  link.download =
    "network-report.csv";

  link.click();

};
const generatePDF = () => {

  const doc =
    new jsPDF();

  doc.setFontSize(20);

  doc.text(
    "NetWatch Monitoring Report",
    20,
    20
  );

  doc.setFontSize(12);

  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    20,
    35
  );

  doc.text(
    `Total Devices: ${devices.length}`,
    20,
    50
  );

  doc.text(
    `Online Devices: ${
      devices.filter(
        d =>
        d.status === "Online"
      ).length
    }`,
    20,
    60
  );

  doc.text(
    `Offline Devices: ${
      devices.filter(
        d =>
        d.status === "Offline"
      ).length
    }`,
    20,
    70
  );

  let y = 95;

  doc.setFontSize(16);

  doc.text(
    "Device Summary",
    20,
    y
  );

  y += 15;

  doc.setFontSize(11);

  devices.forEach(
    device => {

      doc.text(

        `${device.name} | ${device.status} | ${device.latency} ms`,

        20,

        y

      );

      y += 10;

    }
  );

  doc.save(
    "NetWatch-Report.pdf"
  );

};
  const online =
    devices.filter(
      d =>
      d.status ===
      "Online"
    ).length;

  const offline =
    devices.filter(
      d =>
      d.status ===
      "Offline"
    ).length;

  return (

    <div className="layout">

      <Sidebar />

      <div className="main-content">
         <button
  onClick={exportCSV}
>
  Export CSV
</button>
        <h1>
          Analytics
        </h1>
        <button
  onClick={generatePDF}
>
  Generate PDF Report
</button>

        <div className="cards">

          <div className="card">

            <h3>
              Average Latency
            </h3>

            <h2>
              {averageLatency} ms
            </h2>

          </div>

          <div className="card">

            <h3>
              Online Devices
            </h3>

            <h2>
              {online}
            </h2>

          </div>

          <div className="card">

            <h3>
              Offline Devices
            </h3>

            <h2>
              {offline}
            </h2>

          </div>

        </div>

        <div
          className="table-container"
        >

          <h2>
            Top Latency Devices
          </h2>

          <table>

            <thead>

              <tr>

                <th>
                  Device
                </th>

                <th>
                  Latency
                </th>

              </tr>

            </thead>

            <tbody>

              {
                sortedDevices.map(
                  device => (

                    <tr
                      key={
                        device._id
                      }
                    >

                      <td>
                        {
                          device.name
                        }
                      </td>

                      <td>
                        {
                          device.latency
                        } ms
                      </td>

                    </tr>

                  )
                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}


export default AnalyticsPage;