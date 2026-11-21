import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        My Notes
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/all-notes">All Notes</Link>
        <Link to="/pinned">Pinned Notes</Link>
      </div>
    </nav>
  );
}

export default Navbar;
