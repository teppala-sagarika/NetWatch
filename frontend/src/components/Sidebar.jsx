import {
  FaServer,
  FaChartLine,
  FaBell,
  FaNetworkWired
} from "react-icons/fa";
import {
    useNavigate
}
from "react-router-dom";
import { Link } from "react-router-dom";
function Sidebar() {
  const navigate =
useNavigate();
const user = JSON.parse(
    localStorage.getItem("user")
);
const logout = () => {
    localStorage.clear();
    window.location.href = "/";
};
 return (
  <div className="sidebar">
    <div
    style={{
        marginBottom: "25px"
    }}
>

    <h3>

        Welcome,

    </h3>

    <p>

        {user?.name}

    </p>

</div>

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
        <button
onClick={logout}
>

Logout

</button>
      </li>

      <li>
        <Link
          to="/devices"
          className="sidebar-link"
        >
          <FaNetworkWired />
          Devices
        </Link>
        <button
onClick={logout}
>

Logout

</button>
      </li>

      <li>
        <Link
          to="/alerts"
          className="sidebar-link"
        >
          <FaBell />
          Alerts
        </Link>
        <button
onClick={logout}
>

Logout

</button>
      </li>

      <li>
        <Link
          to="/analytics"
          className="sidebar-link"
        >
          <FaServer />
          Analytics
        </Link>
        <button
onClick={logout}
>

Logout

</button>
      </li>

    </ul>

  </div>
);
}

export default Sidebar;