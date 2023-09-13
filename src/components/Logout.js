
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function Logout() {


  const handleLogout = async () => {
    try {
      await signOut(auth);
    
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
