function HealthScore({
  devices
}) {

  let score = 100;

  let online = 0;

  let offline = 0;

  let totalLatency = 0;

  devices.forEach(device => {

    if (
      device.status ===
      "Offline"
    ) {
      score -= 20;
      offline++;
    } else {
      online++;
    }

    if (
      device.latency > 100
    ) {
      score -= 10;
    }

    totalLatency +=
      device.latency || 0;
  });

  score =
    Math.max(score, 0);

  const avgLatency =
    devices.length
      ? Math.round(
          totalLatency /
          devices.length
        )
      : 0;

  let status =
    "Excellent";

  if (score < 90)
    status = "Warning";

  if (score < 70)
    status = "Critical";

const color =
  score >= 90
    ? "#22c55e"
    : score >= 70
    ? "#f59e0b"
    : "#ef4444";

  return (
    <div className="health-card">

      <h2>
        Network Health
      </h2>

      <h1
  style={{
    color: color
  }}
>
  {score}%
</h1>

      <p>
        {status}
      </p>

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
          {avgLatency}ms
        </div>

      </div>

    </div>
  );
}

export default HealthScore;