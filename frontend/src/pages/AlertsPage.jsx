import Sidebar from "../components/Sidebar";
import Alerts from "../components/Alerts";

function AlertsPage() {

  return (

    <div className="layout">

      <Sidebar />

      <div className="main-content">

        <h1>Alerts</h1>

        <Alerts />

      </div>

    </div>

  );
}

export default AlertsPage;