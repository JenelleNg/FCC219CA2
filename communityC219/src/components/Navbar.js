import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="navbar__brand">FamilyConnect</div>
      <nav className="navbar__links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Posts
        </NavLink>
        <NavLink
          to="/posts/new"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Create Post
        </NavLink>
        {token ? (
          <button
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </header>
  );
}
