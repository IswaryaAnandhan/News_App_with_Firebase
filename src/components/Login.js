
import React, { useContext } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { stateContext } from './contextApi/StateProvider';
import { actionTypes } from './contextApi/Reducer';

function Login() {

    const [state,dispatch]=  useContext(stateContext);
    console.log(state)

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
   console.log(result)
   dispatch({
    type : actionTypes.SET_USER,
    user : result.user,
  })
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  return (
    <div>
      <button className='btn btn-primary' onClick={handleLogin}>Login with Google</button>
    </div>
  );
}

export default Login;
