import {
  FaServer,
  FaChartLine,
  FaBell,
  FaNetworkWired
} from "react-icons/fa";
import { Link } from "react-router-dom";
function Sidebar() {

 return (
  <div className="sidebar">

    <h2>NetWatch</h2>

    <ul>

      <li>
        <Link
          to="/"
          className="sidebar-link"
        >
          <FaChartLine />
          Dashboard
        </Link>
      </li>

      <li>
        <Link
          to="/devices"
          className="sidebar-link"
        >
          <FaNetworkWired />
          Devices
        </Link>
      </li>

      <li>
        <Link
          to="/alerts"
          className="sidebar-link"
        >
          <FaBell />
          Alerts
        </Link>
      </li>

      <li>
        <Link
          to="/analytics"
          className="sidebar-link"
        >
          <FaServer />
          Analytics
        </Link>
      </li>

    </ul>

  </div>
);
}

export default Sidebar;