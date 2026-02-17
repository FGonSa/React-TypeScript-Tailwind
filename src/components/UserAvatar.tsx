import React from 'react'
import { useGeneralStore } from '../store/useGeneralStore';

type UserAvatarProps = {
    handleAvatarClick: () => void;
    isInNavbar: boolean;
}

function UserAvatar({ handleAvatarClick, isInNavbar }: UserAvatarProps) {

    const user = useGeneralStore((state) => state.user);
    const size = isInNavbar ? 30 : 100; // Tamaño diferente para el navbar y el perfil

  return (
    <>
    <img 
        src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
        alt="avatar" 
        onClick={handleAvatarClick} 
        style={{ cursor: 'pointer', borderRadius: '50%', width: `${size}px` }}
      />
    </>
  )
}

export default UserAvatar