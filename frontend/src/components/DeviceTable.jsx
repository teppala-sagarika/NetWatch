import API from "../services/api";
import { Link } from "react-router-dom";
function DeviceTable({ devices, refresh }) {

  const deleteDevice = async (id) => {
    try {

      await API.delete(`/devices/${id}`);

      refresh();

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="table-container">

      <h2>Network Devices</h2>

      <table>

        <thead>

          <tr>
            <th>Name</th>
            <th>Host</th>
            <th>Status</th>
            <th>Latency</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {devices?.map((device) => (

            <tr key={device._id}>

              <td>

  <Link
    to={`/device/${device._id}`}
  >
    {device.name}
  </Link>

</td>

              <td>{device.host}</td>

              <td>

<span
className={
  device.status ===
  "Online"

  ? "online"

  : "offline"
}
>

{device.status}

</span>

</td>

              <td>{device.latency} ms</td>

              <td>

                <button
                  onClick={() =>
                    deleteDevice(device._id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default DeviceTable;