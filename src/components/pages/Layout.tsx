import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import VoteCard from "./LaunchesCard";
import Controller from "./Controller";

export default function Layout() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) {
      navigate('/login')
    }
    //dispatch(())

  }, []);
  useEffect(() => {
    console.log(user);
  }, [user])



  return (
    <div>

        <Controller/>
    </div>
  )
}
