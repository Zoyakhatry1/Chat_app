import React, {useContext,useState,useEffect} from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';

const AuthContext=React.createContext();


export const useAuth =()=>{
   return useContext(AuthContext);
}

export const AuthProvider=(props)=>{
  const[isLoading,setIsLoading]=useState(true);
  const[user,setUser]=useState();
  const navigate = useNavigate();

  const auth = getAuth(app);

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
        setUser(user);
         setIsLoading(false);
         if(user)
         {
            navigate('/chats');
         }
     })
  },[user,navigate]);

  const value= { user };

  return(
   <AuthContext.Provider value={value}>
       {!isLoading && props.children}
   </AuthContext.Provider>
  );
}