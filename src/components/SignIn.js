import React from 'react'
import {useState,useEffect} from 'react'
import { useHistory } from 'react-router';

export default function SignIn() {
    const history = useHistory()
    useEffect(() => {
      setallUsers(JSON.parse(localStorage.allUsers));
    },[]);


    const [allUsers, setallUsers] = useState([])
    const [newEmail, setnewEmail] = useState("")
    const [newPassword, setnewPassword] = useState("")
    const [indexOfUser, setindexOfUser] = useState(2)
    const handleNewEmail = (e)=>{
        setnewEmail(e.target.value)
    }
    const handleNewPassword = (e)=>{
        setnewPassword(e.target.value)
    }

    const signingIn = ()=>{
        console.log(newEmail,newPassword);
        let found = allUsers.find((val)=>newEmail==val.email && newPassword==val.password)
        if(found){
          let ind=allUsers.indexOf(found)
          localStorage.indexOfUser = ind
          localStorage.currentUser = JSON.stringify(allUsers[ind])
          console.log(found);
        //   setindexOfUser(ind)
        //   console.log(indexOfUser);
        //   alert(`Welcome ${allUsers[ind].firstName}`)
             history.push('/dashboard')
        //   console.log(indexOfUser);
        console.log(allUsers);
        }
        else{alert(`i cannot find you`)}
      }
    return (
        <div>
            <div class="container">
                <div class="row">
                    <div class="col-9">
                        <h1>Sign In</h1>
                        <input type="text" className="form-control my-2" placeholder="Email" onChange={handleNewEmail}/>
                        <input type="text" className="form-control my-2" placeholder="Password" onChange={handleNewPassword}/>
                        <button className="btn btn-success my-2" onClick={()=>signingIn(newEmail,newPassword)}>Sign In</button>
                    </div>
                </div>
            </div>
        </div>

    )
}