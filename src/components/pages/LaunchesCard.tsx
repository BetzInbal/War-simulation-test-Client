import React from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'

interface Props  {
}

export default function LaunchCard() {
    
    const {user} = useAppSelector((state:RootState) => state.user)
    const dis = useAppDispatch()

    const hendelVote = () =>{
        //dis()
    }

  return (
    <div className='card'>

        {
            //isAdmin ? <h1>{candidate.votes}</h1> :
             <button  >Lanch</button>
        }
        <h3>{}</h3>
    </div>
  )
}
