import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Catalogo from "./pages/catalogo/Catalogo";
import Carrito from "./pages/carrito/Carrito";
import Tendencias from "./pages/tendencias/Tendencias";
import Soporte from "./pages/soporte/Soporte";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/tendencias" element={<Tendencias />} />
          <Route path="/soporte" element={<Soporte />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
