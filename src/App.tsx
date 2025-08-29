// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Statics from "./sections/Statics";
import AboutMobile from "./sections/AboutMobile";
import About from "./sections/About";
import Services from "./sections/Services";
import Gallery from "./sections/Gallery";
import Testimonials from "./sections/Testimonials";
import FAQ from "./sections/FAQ";
import Contact from "./sections/Contact";

import Login from "./sections/Login";
import Admin from "./sections/Admin";
import PrivateRoute from "./components/PrivateRoute";

import Success from "./components/Success";
import Cancel from "./components/Cancel";

function App() {
  const location = useLocation();

  // Rutas donde el navbar no debe mostrarse
  const hiddenNavbarRoutes = ["/admin", "/login", "/success", "/cancel"];

  // Verifica si la ruta actual coincide exactamente con alguna de las anteriores
  const hideNavbar = hiddenNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Statics />
              <AboutMobile />
              <About />
              <Services />
              <Gallery />
              <Testimonials />
              <FAQ />
              <Contact />
            </>
          }
        />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Stripe */}
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        {/* Protected Admin */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
