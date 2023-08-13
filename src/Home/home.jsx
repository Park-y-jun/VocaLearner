import "./home.css"

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="list">
      <ul>
        <Link to="/vocabulary" className="voca">KR Voca</Link>
        <Link to="/vocabulary" className="voca">KR Voca</Link>
        <Link to="/vocabulary" className="voca">KR Voca</Link>
        <Link to="/vocabulary" className="voca">KR Voca</Link>
      </ul>
    </main>
  );
}
 
export default Home;