import React, { useState, useCallback } from "react";
import type { Task } from "../store/TaskSlice";
import { useGeneralStore } from "../store/useGeneralStore";
import { generateTaskID, parseTask } from "../services/TaskService";

interface TaskFormProps {
  initialData?: Task; // Opcional: si existe, estamos editando
  onSuccess: () => void; // Para cerrar un modal o redirigir
}

export const TaskForm = ({ initialData, onSuccess }: TaskFormProps) => {
  const { addTask, editTask } = useGeneralStore();
  const user = useGeneralStore((state) => state.user);

  // Usamos useCallback para que la función no se recree innecesariamente
  const handleSubmit = useCallback(
    async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Datos iniciales:", initialData);
      const formData = new FormData(e.currentTarget);
      const result = parseTask(formData);

      if (result) {
        if (initialData) {
          editTask(initialData.id, result);
        } else {
          addTask(result);
        }
        onSuccess(); // Llamamos al callback de éxito
      }else{
        alert("Error de validación, por favor revisa los datos ingresados.");
      }
      
    },
    [addTask, editTask, initialData, onSuccess],
  );

  return (
    <form className="flex justify-center" onSubmit={handleSubmit}>
      <div className="flex flex-col text-center gap-3">
        <input type="hidden" name="id" value={initialData ? initialData.id : generateTaskID()} />
        <input type="hidden" name="userId" value={user!.id} />
        <input type="hidden" name="isFavorite" value={initialData?.isFavorite === true ? "true" : "false"} />
        <input type="hidden" name="completed" value={initialData?.completed === true ? "true" : "false"} />
        <label htmlFor="">Título</label>
        <input
          className="border border-gray-300 bg-white rounded-md p-2"
          type="text"
          placeholder="Titulo"
          name="title"
          defaultValue={initialData ? initialData.title : ""}
        />
        <label htmlFor="">Prioridad</label>
        <select
          className="bg-white border border-gray-300 rounded-md p-2"
          name="priority"
          id=""
          defaultValue={initialData ? initialData.priority : "Baja"}
        >
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
        {initialData ? (
          <button
            className="bg-blue-800 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Guardar Cambios
          </button>
        ) : (
          <button
            className="bg-red-800 hover:bg-red-950 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Agregar Tarea
          </button>
        )}
      </div>
    </form>
  );
};
