// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

type AdminJwtPayload = {
  exp?: number;
  role?: string;
  [key: string]: any;
};

export default function PrivateRoute() {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // Decodificar el token
    const decoded = jwtDecode<AdminJwtPayload>(token);

    // Revisar expiración (exp está en segundos)
    const now = Date.now() / 1000;
    if (!decoded.exp || decoded.exp < now) {
      localStorage.removeItem('adminToken'); // limpiar token viejo
      return <Navigate to="/login" replace />;
    }

    // Si tenés roles en el token, podés chequear acá
    if (decoded.role && decoded.role !== 'admin') {
      return <Navigate to="/login" replace />;
    }

    return <Outlet />; // deja entrar a /admin
  } catch (err) {
    // Si el token no es válido
    localStorage.removeItem('adminToken');
    return <Navigate to="/login" replace />;
  }
}
