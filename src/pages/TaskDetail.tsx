import { useParams, useNavigate } from "react-router-dom";
import { useGeneralStore } from "../store/useGeneralStore";
import { useCallback, useState } from "react";
import { TaskForm } from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

export const TaskDetail = () => {
  const { id } = useParams<{ id: string }>(); // Capturamos el :id de la URL
  const navigate = useNavigate();
  const deleteTask = useGeneralStore((state) => state.removeTask);
  const toggleFav = useGeneralStore((state) => state.toggleFavorite);
  const [isEditing, setIsEditing] = useState(false);

  // Solo se suscribe a los cambios si la tarea específica cambia
  const task = useGeneralStore(
    useCallback((state) => state.getTaskById(id!), [id]),
  );

  const isFav = task?.isFavorite || false;

  const handleDelete = async () => {
    let result = false;
    if (window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      result = await deleteTask(id!);
      if (result) {
        navigate("/");
      }
    }
  };

  // --- Renderizado Condicional de seguridad ---
  if (!task) {
    return (
      <div className="text-center py-5">
        <p>⚠️ La tarea con ID {id} no existe.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-red-800 hover:bg-red-950 text-white font-bold py-2 px-4 rounded"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-slate-200" style={{ padding: "20px", border: "1px solid #ccc" }}>
        <button onClick={() => navigate(-1)}>⬅️ Volver</button>

        <h1>Detalles de la Tarea</h1>
        <hr />
        <TaskItem task={task} />
        <div className="justify-center text-center">
          <button
          onClick={() => toggleFav(id!, isFav)}
          className="bg-amber-600 hover:bg-amber-950 text-white font-bold py-2 px-4 rounded mt-3"
        >
          Marcar como Fav {task.isFavorite ? "⭐" : "☆"}
        </button>
        </div>
      </div>

      {/** Botones de Editar y Eliminar */}
      <div className="grid grid-cols-2 gap-3 justify-center">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-800 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded mt-3"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-800 hover:bg-red-950 text-white font-bold py-2 px-4 rounded mt-3"
        >
          Eliminar
        </button>
      </div>

      <div className="p-5">
        {isEditing ? (
          <TaskForm initialData={task} onSuccess={() => setIsEditing(false)} />
        ) : null}
      </div>
    </>
  );
};

export default TaskDetail;
