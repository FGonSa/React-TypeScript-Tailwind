import { useRef } from 'react';
import UserAvatar from '../components/UserAvatar';

export const UserProfile = () => {
  // Creamos la referencia
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    // Al hacer click en la imagen, "disparamos" el click del input oculto
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Archivo seleccionado:", file.name);
      // Aquí iría la lógica para subirlo a un servidor real o convertirlo a Base64
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <UserAvatar  handleAvatarClick={handleAvatarClick} isInNavbar={false} />
      
      {/* Input oculto usando useRef */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
        accept="image/*"
      />
      <p>Haz click en la foto para cambiar tu avatar</p>
    </div>
  );
};