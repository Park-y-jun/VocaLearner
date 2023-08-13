import { Routes, Route, Link} from "react-router-dom";

import Head from "./Head/head";
import Home from "./Home/home";
import About from "./List/list";
import Dashboard from "./Main/main";
import NoMatch   from "./VocaLearn/vocaLearn";

export default function App() {
  return (
    <div>
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

        <Link to="/about">about</Link>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {/* <Routes>
          <Route path="/" element={<Head />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes> */}
    </div>
  );
}






