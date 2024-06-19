import { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const StickyNavBar = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 20) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <nav className={isSticky ? "sticky" : ""}>
        <div className="nav-content">
          <div className="logo">
            <Link to="/Home">Kettlebell</Link>
          </div>
          <ul className="nav-links">
            <li>
            <Link to="/Home">Home</Link>
            </li>
            <li>
            <Link to="/Your Recipes">Your Recipes</Link>
            </li>
            <li>
            <Link to="/">Log Out</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default StickyNavBar;
