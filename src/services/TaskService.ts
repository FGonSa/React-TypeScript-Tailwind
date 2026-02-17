import axios from "axios";
import type { Task } from "../store/TaskSlice";
import { TaskSchema } from "../models/schema";


const API_URL = "http://localhost:4000/tasks";

export const generateTaskID = () => Date.now().toString(); // Genera un ID único basado en el timestamp

export const parseBooleans = (value: FormDataEntryValue | null): boolean | undefined => {
    console.log("Valor recibido para booleano:", value);
    if ((value === null) || (value === "") || (value === undefined) || (value === "false")){
      return false; // Si no existe o está vacío, lo tratamos como false
    } else {
      return true;
    }
      
}

export const parseTask = (formData: FormData) => {

    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const priority = formData.get('priority') as string;
    const completed = parseBooleans(formData.get('completed'));
    const userId = formData.get('userId') as string;
    const isFavorite = parseBooleans(formData.get('isFavorite'));

    const newTask = {
      id,
      title,
      priority,
      completed,
      isFavorite,
      userId
    };

    const result = TaskSchema.safeParse(newTask);
    if (!result.success) {
        console.error("Error de validación:", result.error);
        return null;
    }
    return result.data as Task;
}

export const fetchTasks = async (userId : string) => {
  console.log("Obteniendo tareas para userId:", userId);
    try{
        const { data } = await axios.get<Task[]>(`${API_URL}?userId=${userId}`);
        return data;
    }catch(err){
        console.error("Error al obtener", err);
        return [];
    }
};

export const addTask = async (newTask: Task) => {
  const voidTask: Task = {} as Task;

  try {
    const { data } = await axios.post<Task>(API_URL, newTask);
    return data;
  } catch (err) {
    console.error("Error al añadir", err);
    return voidTask;
  }
};

 export const removeTask = async (id: string) => {
  let result = false;
  try {
    await axios.delete(`${API_URL}/${id}`);
    result = true;
  } catch (err) {
    console.error("Error al eliminar", err);
  }
  return result;
};

export const editTask = async (id: string, updates: Partial<Task>): Promise<Task> => {
  const { data } = await axios.patch<Task>(`${API_URL}/${id}`, updates);
  return data;
}

export const getTasksByUser = async (userId: number): Promise<Task[]> => {
  // JSON Server filtra automáticamente con query params
  const { data } = await axios.get<Task[]>(`${API_URL}?userId=${userId}`);
  return data;
}

export const toggleFavorite = async (id: string, isFav: boolean): Promise<Task> => {
  const { data } = await axios.patch<Task>(`${API_URL}/${id}`, { isFavorite: !isFav });
  return data;
}

