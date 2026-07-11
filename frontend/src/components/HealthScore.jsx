function HealthScore({ devices }) {

  const total = devices.length;

  const online =
    devices.filter(
      device => device.status === "Online"
    ).length;

  const offline =
    devices.filter(
      device =>
        device.status === "Offline"
    ).length;

  const serverError =
    devices.filter(
      device =>
        device.status === "Server Error"
    ).length;

  const totalLatency =
    devices.reduce(

      (sum, device) =>

        sum + (device.latency || 0),

      0

    );

  const avgLatency =
    total
      ? Math.round(
          totalLatency / total
        )
      : 0;

  const score =
    total
      ? Math.round(
          (online / total) * 100
        )
      : 100;

  let status =
    "Excellent";

  if (score < 100)
    status = "Warning";

  if (score < 70)
    status = "Critical";

  const color =
    score === 100
      ? "#22c55e"
      : score >= 70
      ? "#f59e0b"
      : "#ef4444";

  return (

    <div className="health-card">

      <h2>
        Service Health
      </h2>

      <h1
        style={{
          color
        }}
      >
        {score}%
      </h1>

      <p>{status}</p>

      <div className="stats">

        <div>

          Online:
          {online}

        </div>

        <div>

          Offline:
          {offline}

        </div>

        <div>

          Avg:
          {avgLatency} ms

        </div>

      </div>

    </div>

  );

}

export default HealthScore;