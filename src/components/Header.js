import React from 'react'
import { LOGO } from '../utils/Constant'
import { auth } from "../utils/Firebase";
import { signOut } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import  { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice'

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();  

  useEffect(()=>
    {
       const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const {uid, email, displayName} = user;
              dispatch(addUser({uid:uid, email:email, displayName:displayName}));
              navigate("/browse");
              // ...
            } else {
              // User is signed out
              // ...
              dispatch(removeUser());
              navigate("/");
            }
          });

          //Unsubscribe when component unmounts.
          return ()=> unsubscribe();
        },[]);  

  const handleSignOut =()=> 
    {
      signOut(auth).then(()=>
        {
            navigate("/");
        }).catch(()=>
            {
               navigate("/error")
            })
    }  

  

  return (
    <div className="absolute px-8 py-2 bg-black z-10 w-full">
      <img src={LOGO} className="w-44"/>


    {user &&  <div className='text-white'>
        <span class="absolute top-0 right-0 h-16 p-2"> {user.displayName} </span>
        <img src="/signout.jpg"  class="absolute top-0 right-0 h-16 p-2"
        onClick={handleSignOut}
        ></img> 
        
      </div>
      }     
    
    </div>
  )
}

export default Header
