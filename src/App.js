import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
  useNavigate,
} from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <Router>
      {/* Header */}
      <header className="header">
        <div className="logo">
          <Link to="/"> <b>BikeStore  </b></Link>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/launch">Explore Bikes</Link>
          <button className="feed-btn">Feed</button>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="launch" element={<Launch />}>
            <Route path="" element={<LaunchIndex />} />
            <Route path=":slug" element={<LaunchBike />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Not Found!</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

function Home() {
  return (
    <div className="home">
      <h1>Welcome to BikeStore</h1>
      <p>Explore the best bikes for every adventure!</p>
      <Link to="/launch" className="shop-now-btn">
        Explore Now
      </Link>
    </div>
  );
}

function Launch() {
  return (
    <div className="launch">
      <h1>Our Bikes Collection</h1>
      <Outlet />
    </div>
  );
}

function LaunchIndex() {
  return (
    <ul className="bike-list">
      {Object.entries(bikes).map(([slug, { name, img, inStock }]) => (
        <li key={slug} className={inStock ? "in-stock" : "out-of-stock"}>
          <Link to={slug}>
            <h2>{name}</h2>
            <img src={img} alt={name} />
          </Link>
          <p className="stock-status">
            {inStock ? "In Stock" : "Out of Stock"}
          </p>
          <button className="buy-now-btn" disabled={!inStock}>
            {inStock ? "Buy Now" : "Unavailable"}
          </button>
        </li>
      ))}
    </ul>
  );
}

function LaunchBike() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const bike = bikes[slug];

  if (!bike) {
    return <h2>Bike Not Found!</h2>;
  }

  const { name, img, inStock } = bike;

  return (
    <div className="bike-details">
      <h2>{name}</h2>
      <img src={img} alt={name} />
      <p className="stock-status">
        {inStock ? "Available Now!" : "Currently Unavailable"}
      </p>
      <button
        className="buy-now-btn"
        disabled={!inStock}
        onClick={() => alert("Thank you for purchasing your bike!")}
      >
        {inStock ? "Buy Now" : "Out of Stock"}
      </button>
      <button className="back-btn" onClick={() => navigate("/launch")}>
        Back to Collection
      </button>
    </div>
  );
}


// Sample Data
const bikes = {
  "BMW S 1000 RR": {
    name: "BMW S 1000 RR",
    img: " https://ae-pic-a1.aliexpress-media.com/kf/Sc227fc3fcd324cba960ff1b3fec20a3dP/WELLY-1-12-2021-BMW-S1000-RR-Motorcycle-Simulation-Alloy-Model-Collection-Decoration-Gifts-Toys-for.jpg_640x640Q90.jpg_.webp  ",
    inStock: true,
  },
  "2019 Yamaha R6": {
    name: " 2019 Yamaha R6",
    img: "https://i.redd.it/orq0ty5mnbsa1.jpg",
    inStock: false,
  },
  "kawasaki-ninja-h2r": {
    name: "kawasaki-ninja-h2r",
    img: "https://cdn.pixabay.com/photo/2021/04/19/05/12/kawasaki-ninja-h2r-6190254_960_720.jpg",
    inStock: true,
  },
};
