import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { fetchLogin, fetchRegister } from "../../redux/slices/userSlice";
import { DataStatus } from "../../types/redux";

export default function Register() {
  const { user, status } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrgs] = useState("");
  const htmlLocation = useRef<HTMLSelectElement>(null)
  const [location, setLocation] = useState("")
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

const shLoc = (org:string)=>{
if ("IDF"===org)
  htmlLocation.current!.disabled=false
  else{
    htmlLocation.current!.disabled=true
    setLocation("")}
    console.log("'adx");
  
}


  useEffect(() => {
    status === DataStatus.SUCCESS &&
      navigate('/login')

  }, [status]);
  return (
    
    <div>
            <h1> "War - Simulator"</h1>
      <input
        type="text"
        placeholder="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="orgs">Choose an organization:</label>

      <select name="orgs" id="orgs" value={organization}
        onChange={(e) => {setOrgs(e.target.value);
          
        shLoc(e.target.value) }}>
        <option value="IDF">IDF</option>
        <option value="Hezbollah">Hezbollah</option>
        <option value="Hamas">Hamas</option>
        <option value="IRGC">IRGC</option>
        <option value="Houthis">Houthis</option>
      </select>
     


      <select name="location" ref={htmlLocation} value={location}
        onChange={(e) => setLocation(e.target.value)}  >
        <option value=" - North">North</option>
        <option value=" - Center">Center</option>
        <option value=" - South">South</option>
        <option value=" - West Bank">West Bank</option>  
      </select>

      <button onClick={() => { dispatch(fetchRegister({ username, password, organization:organization+location })) }}>
        register
      </button>
    </div>
  );
}
