import { Link } from "react-router-dom";
import type { Task } from "../store/TaskSlice";

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  return (
    <>
    <Link to={`/task/${task.id}`}>
      <div className="text-center py-3 shadow-md mx-auto w-100 my-4 bg-white  hover:bg-slate-100 rounded-md flex justify-center flex-col gap-2">
        <h3 className="font-bold">{task.title}</h3>
        <p>Prioridad: {task.priority}</p>
        <p>Estado: {task.completed ? "Completada" : "Pendiente"}</p>
        <p>Favorita: {task.isFavorite ? "Sí" : "No"}</p>
        <p>Usuario: {task.userId}</p>
      </div>
    </Link>
    </>
  );
}

export default TaskItem;
