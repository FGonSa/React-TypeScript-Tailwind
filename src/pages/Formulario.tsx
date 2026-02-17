
import { TaskForm } from '../components/TaskForm';

function Formulario() {

  const handleSuccess = () => {
    alert("Tarea creada con éxito!");
    window.location.reload(); // Recargamos la página para ver los cambios
  }

  return (
    <>
    <div>
      <h1 className='text-2xl font-bold text-center p-4'>Añadir Task</h1>
      <TaskForm onSuccess={handleSuccess} />
    </div>
    </>
  )
}

export default Formulario