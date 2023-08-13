import { Routes, Route, Link} from "react-router-dom";

import Head from "./Head/head";
import Home from "./Home/home";
import About from "./List/list";
import Dashboard from "./Main/main";
import NoMatch   from "./VocaLearn/vocaLearn";

import "./app.css"

export default function App() {
  return (
    <div>
      <header>
        <Link to="/"  className="header-list">Home</Link>
        <Link to="/" className="header-list">Create VocaList</Link>
        <Link to="/about" className="header-list">Daily Check</Link>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}






