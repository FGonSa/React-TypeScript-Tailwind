import { Navigate, Outlet } from 'react-router-dom';
import { useGeneralStore } from '../store/useGeneralStore';


export const ProtectedRoute = () => {
  const isAuthenticated = useGeneralStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    // Si no está logueado, redirigimos a /login
    return <Navigate to="/login" replace />;
  }

  // Si está logueado, renderiza los hijos (páginas privadas)
  return <Outlet />;
};