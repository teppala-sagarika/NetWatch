function SummaryCards({
  devices,
  alerts
}) {

  const online =
    devices.filter(
      d =>
      d.status === "Online"
    ).length;

  const offline =
    devices.filter(
      d =>
      d.status === "Offline"
    ).length;

  return (

    <div className="cards">

      <div className="card">

        <h3>
          Total Devices
        </h3>

        <h2>
          {devices.length}
        </h2>

      </div>

      <div className="card">

        <h3>
          Online
        </h3>

        <h2>
          {online}
        </h2>

      </div>

      <div className="card">

        <h3>
          Offline
        </h3>

        <h2>
          {offline}
        </h2>

      </div>

      <div className="card">

        <h3>
          Active Alerts
        </h3>

        <h2>
          {alerts.length}
        </h2>

      </div>

    </div>

  );

}

export default SummaryCards;