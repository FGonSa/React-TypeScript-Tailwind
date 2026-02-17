import React, { useMemo } from 'react'
import { useGeneralStore } from '../store/useGeneralStore';
import TaskItem from '../components/TaskItem';

function Completadas() {
  const  { tasks, loading, error } = useGeneralStore((state) => state);

  const favorites = useMemo(() => {
  return tasks.filter(t => t.isFavorite);
}, [tasks]);

  return (
    <>
          <div>
            <h1 className='text-3xl font-extrabold text-center py-3'>Favoritas</h1>
        <ul className='text-center grid grid-cols-3 gap-3'>
           {favorites.length > 0 ? (
          favorites.map(task => (
            <li key={task.id}>
                <TaskItem task={task} />
            </li>
          ))
        ) : (
          <p>No hay tareas con esta prioridad.</p>
        )}
        </ul>
    </div>
    </>
  )
}

export default Completadas