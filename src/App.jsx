import Navbar from "./components/navbar/Navbar";
import Banner from "./components/banner/Banner";
import Categories from "./components/categories/Categories";
import Products from "./components/products/Products";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Banner />
        <Categories />
        <Products />
      </main>
    </div>
  );
}

export default App;