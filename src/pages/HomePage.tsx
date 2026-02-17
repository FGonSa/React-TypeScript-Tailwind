import  { useEffect, useMemo, useState } from 'react'
import { useGeneralStore } from '../store/useGeneralStore'
import TaskItem from '../components/TaskItem'
import { useSearchParams } from 'react-router-dom'

function HomePage() {

    const handleFetchTasks = useGeneralStore((state) => state.fetchTasks)
    const user = useGeneralStore((state) => state.user);
    const  { tasks, loading, error } = useGeneralStore((state) => state);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');

    // Obtenemos el filtro de la URL (?priority=high)
  const priorityFilter = searchParams.get('priority') || 'all';

  useEffect(() => {
    if (user !== null) handleFetchTasks(user)
    }, [])

  const filteredTasks = useMemo(() => {

  return tasks.filter((task) => {
    // 1. Filtro de búsqueda (siempre se aplica sobre el título)
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // 2. Filtro de prioridad (si es 'all', pasan todas)
    const matchesPriority = 
      priorityFilter === 'all' || task.priority === priorityFilter;

    // Solo si cumple AMBAS condiciones, se queda en la lista
    return matchesSearch && matchesPriority;
  });
}, [tasks, searchTerm, priorityFilter]); // Escucha los tres cambios

  // --- Renderizado Condicional ---
  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <>
    <h1 className='text-3xl font-extrabold text-center py-3'>Tasker</h1>
    
    {user ? (
      <>
          {/* Control de Query Params */}
      <div className='text-center mb-4 gap-2 flex justify-center'>
        <button  className="bg-red-800 hover:bg-red-950 text-white font-bold py-2 px-4 rounded" onClick={() => setSearchParams({})}>Todas</button>
        <button className="bg-red-800 hover:bg-red-950 text-white font-bold py-2 px-4 rounded" onClick={() => setSearchParams({ priority: 'Alta' })}>Altas</button>
        <button className="bg-red-800 hover:bg-red-950 text-white font-bold py-2 px-4 rounded" onClick={() => setSearchParams({ priority: 'Media' })}>Medias</button>
        <button className="bg-red-800 hover:bg-red-950 text-white font-bold py-2 px-4 rounded" onClick={() => setSearchParams({ priority: 'Baja' })}>Bajas</button>
      </div>

      {/* Input de búsqueda */}
      <div style={{ marginBottom: '20px' }}>
        <input
          className='bg-white'
          type="text"
          placeholder="🔍 Buscar tarea por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
        />
      </div>

    <div>
        <ul className='text-center grid grid-cols-3 gap-3'>
           {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
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
      
    ) : (<p className="text-center py-4">No estás logueado. Por favor, inicia sesión.</p>)}
    </>
  )
}

export default HomePage