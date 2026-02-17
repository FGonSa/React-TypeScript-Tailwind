import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGeneralStore } from "../store/useGeneralStore";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const login = useGeneralStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget); // Guardamos el email en el estado para mostrarlo en consola
    const email = formData.get("email") as string;
    console.log("email:", email);

    try {
      // Buscamos el usuario por email en nuestro db.json
      const { data } = await axios.get(
        `http://localhost:4000/users?email=${email}`,
      );

      console.log("Respuesta del servidor:", data);

      if (data.length > 0) {
        login(data[0]); // Guardamos el usuario encontrado
        navigate("/"); // Vamos al home
      } else {
        alert("Usuario no encontrado");
      }
    } catch (error) {
      console.error("Error en login", error);
    }
  };

  return (
    <>
      <div className="bg-gray-800 p-3">
       <form className="flex justify-center" onSubmit={handleLogin}>
             <div className="flex flex-col text-center gap-3">
              
               <label htmlFor="" className="text-white">Login</label>
               <input
                 className="border border-gray-300 bg-white rounded-md p-2"
                 type="text"
                 placeholder="Email"
                 name="email"
               />
                 <button
                   className="bg-red-800 hover:bg-red-950 text-white font-bold py-2 px-4 rounded"
                   type="submit"
                 >
                   Iniciar Sesión
                 </button>

             </div>
           </form>
      </div>
    </>
  );
};
