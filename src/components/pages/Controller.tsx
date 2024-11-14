import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import VoteCard from "./LaunchesCard";

export default function Controller() {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  //const { candidates, status, error } = useAppSelector((state) => state.candidates)
  const [location, setLocation] = useState("")
  useEffect(() => {
    ;
    if (user?._id) navigate("/login");
  }, []);
  return <div>

    {
    !user!.organization.name.includes("ÏDF") ? <>
      <label htmlFor="location">Choose an location:</label>
      <select name="location" value={location}
        onChange={(e) => setLocation(e.target.value)}  >
        <option value="North">North</option>
        <option value="Center">Center</option>
        <option value="South">South</option>
        <option value="West Bank">West Bank</option>
      </select></> :<></>
  }

    {
      user?.organization.resources.map((r) => {return <h3>{r.name} * {r.amount}</h3>})
    }
  </div >;
}
