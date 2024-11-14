import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import userSlice from "../redux/slices/userSlice";


export default function Nav() {
  const dis = useDispatch()
  const user = useAppSelector((state: RootState) => state.user);
  const navigate = useNavigate()


  return (
    <div className="nav">


      {user.user ? (
        <>
          <NavLink to={"/logout"}>logout</NavLink>

          <button onClick={() =>{ 
            localStorage.token="" 
            navigate('/login')
            dis(userSlice.actions.logout())
            }}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to={"/login"}>Login</NavLink>
          <NavLink to={"/register"}>Register</NavLink>
        </>
      )}
    </div>
  );
}
