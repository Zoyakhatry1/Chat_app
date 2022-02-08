import React from "react";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import firebase from 'firebase/compat/app';
import { FacebookAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";

import { app } from "../firebase";
import { GoogleAuthProvider } from "firebase/auth";

const Login=()=>{
    const provider = new GoogleAuthProvider();
    const provider_fb=new FacebookAuthProvider();
    const auth=getAuth(app);
  return (
      <div id="login-page">
        <div id='login-card'>
           <h2>Welcome to UNICHAT!!</h2>

           <div className="login-button google"
           onClick={()=>signInWithRedirect(auth,provider)}>
            <div className="icon"><GoogleIcon /></div>
            <div>Sign In with Google.</div>
           </div>
           <br /> <br />
           <div className="login-button facebook"
            onClick={()=>signInWithRedirect(auth,provider_fb)}>
             <div className="icon"><FacebookIcon /></div>
             <div>Sign In with Facebook.</div>
           </div>
        </div>
      </div>
  );
};

export default Login;