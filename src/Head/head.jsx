import { Link ,Outlet } from "react-router-dom";

import "./head.css"

const Head = () => {
  return (
    <header>
      <nav className="menu">
        <a href="/" data-menu="two">
          Home
        </a>

        <a href="/" data-menu="two">
          Create VocaList
        </a>

        <a href="/" data-menu="three">
          Daily Check
        </a>
      </nav>

      <Outlet />
    </header>
  );
}

export default Head;