import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="data:image/jpeg;base64,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"
          alt=""
        />
        <p>
        Welcome to FlavorHand Food Blog! We are your ultimate destination for all things food-related. Explore a variety of recipes, ask questions, and share your culinary creations. Join our community of food enthusiasts and embark on a flavorful adventure together!
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((cat) => (
            <Link to={`/?cat=${cat.name}`} className="link" key={cat._id}>
              <li className="sidebarListItem">{cat.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}