import {
  useEffect,
  useState
} from "react";

import API
from "../services/api";

function Alerts() {

  const [alerts,
  setAlerts] =
  useState([]);

  const loadAlerts =
  async () => {

    const res =
    await API.get(
      "/alerts"
    );

    setAlerts(
      res.data
    );

  };

  useEffect(() => {

    loadAlerts();

    const interval =
    setInterval(
      loadAlerts,
      5000
    );

    return () =>
    clearInterval(
      interval
    );

  }, []);

  return (

    <div className="alerts">

      <h2>
        Alerts
      </h2>

      {
        alerts.length === 0
        ? (
          <p>
            No Active Alerts
          </p>
        )
        : (
          alerts.map(
            alert => (

              <div
                key={
                  alert._id
                }
                className="alert"
              >

                <strong>
                  {
                    alert.type
                  }
                </strong>

                <p>
                  {
                    alert.message
                  }
                </p>

              </div>

            )
          )
        )
      }

    </div>

  );

}

export default Alerts;