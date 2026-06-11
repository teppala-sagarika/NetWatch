import { useEffect, useState } from "react";

import API from "../services/api";
import Sidebar from "../components/Sidebar";
import DeviceTable from "../components/DeviceTable";
import AddDevice from "../components/AddDevice";

function DevicesPage() {

  const [devices, setDevices] =
    useState([]);
    const [search, setSearch] =
  useState("");

const [statusFilter,
setStatusFilter] =
  useState("All");

  const loadDevices = async () => {

    const res =
      await API.get("/devices");

    setDevices(res.data);

  };

  useEffect(() => {

    loadDevices();

  }, []);
const filteredDevices =
  devices.filter(device => {

    const matchesSearch =
      device.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      );

    const matchesStatus =

      statusFilter === "All"
      ||

      device.status ===
      statusFilter;

    return (
      matchesSearch &&
      matchesStatus
    );

  });
  return (

    <div className="layout">

      <Sidebar />

      <div className="main-content">

        <h1>Devices</h1>

<div className="filters">

  <input

    type="text"

    placeholder=
    "Search Device"

    value={search}

    onChange={(e) =>
      setSearch(
        e.target.value
      )
    }

  />

  <select

    value={statusFilter}

    onChange={(e) =>
      setStatusFilter(
        e.target.value
      )
    }

  >

    <option>
      All
    </option>

    <option>
      Online
    </option>

    <option>
      Offline
    </option>

  </select>

</div>

<AddDevice
  refresh={loadDevices}
/>

<DeviceTable
  devices={
    filteredDevices
  }
  refresh={loadDevices}
/>

      </div>

    </div>

  );
}

export default DevicesPage;