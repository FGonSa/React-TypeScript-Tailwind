import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import Completadas from "./pages/Completadas";
import Formulario from "./pages/Formulario";
import TaskDetail from "./pages/TaskDetail";
import {LoginPage} from "./pages/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {/* Rutas Públicas */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} index />
            {/* Rutas Privadas */}
            <Route path="/task/:id" element={<TaskDetail />} />
            <Route path="/add" element={<Formulario />} />
            <Route path="/done" element={<Completadas />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
