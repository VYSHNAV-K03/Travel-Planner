import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/login");
  };

  console.log(user);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Travel Planner
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user?.role !== "admin" &&
              user?.role !== "packagemanger" &&
              user?.role !== "guide" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/browse-guides">
                      Browse Guides
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/translator">
                      Translator
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/weather">
                      Weather
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/tour-packages">
                      Tour Packages
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/bookings">
                      Bookings
                    </Link>
                  </li>
                </>
              )}
            {}
            {user?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin Dashboard
                </Link>
              </li>
            )}
            {user?.role === "guide" && (
              <li className="nav-item">
                <Link className="nav-link" to="/bookings-guide">
                  Bookings
                </Link>
              </li>
            )}
            {user?.role === "packagemanger" && (
              <li className="nav-item">
                <Link className="nav-link" to="/package-panel">
                  Package Manager Dashboard
                </Link>
              </li>
            )}
            {/* {user?.role === 'guide' &&
            <li className="nav-item">
              <Link className="nav-link" to="/guide-panel">Guide Dashboard</Link>
            </li>
            } */}
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-danger ms-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary ms-2" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
