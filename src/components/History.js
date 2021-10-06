import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
export default function History() {
    const [allUsers, setallUsers] = useState([])
    const [indexOfUser, setindexOfUser] = useState(0)
    const [currentUser, setcurrentUser] = useState(0)
    const [currentUserHistory, setcurrentUserHistory] = useState([])
    const history = useHistory()
    useEffect(() => {
        setallUsers(()=>{
            let newState = JSON.parse(localStorage.allUsers)
            console.log(newState);
            return newState
        })
        // setallUsers(JSON.parse(localStorage.allUsers));
        setindexOfUser(()=>{
            let newState = JSON.parse(localStorage.indexOfUser)
            console.log(newState);
            return newState
        })
        // setindexOfUser(JSON.parse(localStorage.indexOfUser))
        setcurrentUser(()=>{
            let newState = JSON.parse(localStorage.currentUser)
            console.log(newState);
            return newState
        })
        setcurrentUserHistory(()=>{
            let newState = currentUser
            console.log(newState);
            return newState
        })
        setcurrentUserHistory(()=>{
            let newState = JSON.parse(localStorage.currentUserHistory)
            return newState
        })
        
        // setcurrentUser(JSON.parse(localStorage.currentUser))
        },[]);
    
    return (
        <>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Description</th>
                            <th>Transaction Type</th>
                            <th>Amount($)</th>
                            <th>Date</th>
                        </tr>
                    </thead>    
                    <thead> 
                        {currentUserHistory.map((val)=>(
                            <tr>
                                <td>
                                    <img src={val.transaction_img} alt=""  />
                                    {val.short_description}
                                </td>
                                <td > <span>{val.transactionType}</span>
                                 </td>
                                <td>{val.transferAmount}</td>
                                <td>{val.date}</td>
                            </tr>
                                
                        ))}
                        
                    </thead>    
                </table>
        </>
        )
}
