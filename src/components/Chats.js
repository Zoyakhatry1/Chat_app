import React,{useRef,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {ChatEngine} from "react-chat-engine";
import { app } from "../firebase";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from '../contexts/AuthContext';
import axios from "axios";


const Chats=()=>{
    const { user } = useAuth()
    const navigate = useNavigate();
    const[loading,setLoading]=useState(true);
     
    //console.log(user);

    const auth = getAuth(app);

    const handleLogout=async()=>{
       await signOut(auth);

       navigate('/');
    }

    // const getFile=async(url)=>{
    //   const response = await fetch(url);
    //   const data = await response.blob();

    //   return new File([data],"test.jpg",{type: 'image/jpeg'});
    // };

    async function getFile(url) {
        let response = await fetch(url);
        let data = await response.blob();
        return new File([data], "test.jpg", { type: 'image/jpeg' });
      }

   useEffect(()=>{
       if(!user){
           navigate('/');

           return;
       }

       axios.get('https://api.chatengine.io/users/me/',{
           headers:{
               "project-id":process.env.REACT_APP_CHAT_ENGINE_ID,
               "user-name":user.displayName,
               "user-secret":user.uid
           }
       }).then(()=>{
           setLoading(false);
       }).catch((e)=>{
           let formdata= new FormData();
           formdata.append('email',user.email);
           formdata.append('username',user.displayName);
           formdata.append('secret',user.uid);

           getFile(user.photoURL).then(
               avatar=>{
                   formdata.append('avatar',avatar,avatar.name)

                   axios.post('https://api.chatengine.io/users/',formdata,
                   {headers:{
                       "private-key":process.env.REACT_APP_CHAT_ENGINE_KEY
                   }}).then(()=>{
                       setLoading(false);
                   }).catch((error)=>{
                       console.log(error);
                   })
               }
           )
       })
   },[user,navigate]);

   if(!user||loading) {
      return <p>Loading...</p>
   }

  
    return (
        <div className="chats-page">
           <div className="nav-bar">
               <div className="logo-tab">
                   Unichat
               </div>
               <div onClick={handleLogout} className="logout-tab">
                   Logout
               </div>
           </div>
           <ChatEngine 
               height ='91vh'
               projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
               userName={user.displayName}
               userSecret={user.uid}
           />
        </div>
    );
};

export default Chats;