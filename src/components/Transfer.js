import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import Swal from 'sweetalert2'
export default function Transfer() {
    const [allUsers, setallUsers] = useState([])
    const [indexOfUser, setindexOfUser] = useState(0)
    const [currentUser, setcurrentUser] = useState(0)
    const history = useHistory()
    useEffect(() => {
        setallUsers(JSON.parse(localStorage.allUsers));
        setindexOfUser(JSON.parse(localStorage.indexOfUser))
        setcurrentUser(JSON.parse(localStorage.currentUser))
        },[]);
    const [amount,setAmount]=useState(0)
    const [accountNumber,setaccountNumber]=useState(0)
    const [accountName,setaccountName]=useState('')
    const [pin,setpin]=useState('')
    const [description,setdescription]=useState('')
    const [currentUserHistory,setCurrentUserHistory]=useState(0)

    // const handleAccountNumber = (e)=>{
       
    // }
    const handleAmount=(e)=>{
        setAmount(e.target.value)
    } 
    const handlePin=(e)=>{
        setpin(e.target.value)
    }
    const handleDescription=(e)=>{
        setdescription(e.target.value)
    }
    const confirmAccount = (e)=>{
        setaccountNumber(()=>{
            let newState = e.target.value
            console.log(newState);
            return newState
            
        })
        if(e.target.value.length==10){
            let newAllUsers = [...allUsers]
            let found=newAllUsers.find((val,i)=>val.accountNumber==e.target.value)
            console.log(found);
            if (!found){
                setaccountName(()=>{
                    let newState=`Not Found`
                    return newState
                })
            }
            else{
                setaccountName(()=>{
                    let newState=`${found.firstName} ${found.lastName}`
                    return newState
                })
                // setaccountName(`${found.firstName} ${found.lastName}`)
            }
        }
        else if (e.target.value.length<10){
            setaccountName(``)
        }
    }
    const makeTransaction = ()=>{
        let newAllUsers=[...allUsers]
        let found=newAllUsers.find((val,i)=>val.accountNumber==accountNumber)
        let indexOfReceiver=newAllUsers.indexOf(found)
        //Check if all details are filled
        if(!amount || !accountNumber|| !pin){
            alert(`Kindly fill in all details`)
        }
        //Check if pin is correct
        else if (newAllUsers[indexOfUser].pin!==pin){
            alert(`incorrect pin`)
        }
        //Check if account does not exist
        else if (!found){
            alert(`account does not exist`)
        }
        //Check if amount is valid
        else if (amount<=0){
            alert(`Enter a valid Amount`)
        }
        //Check if the funds are insufficient
        else if (parseInt(amount)>newAllUsers[indexOfUser].balance){
            alert(`Insufficient Funds`)
        }
        else{
            //Transfer Amount to Receiver
            found.balance=found.balance + parseInt(amount)
            newAllUsers[indexOfReceiver]=found
            console.log(newAllUsers[indexOfReceiver]);
            // //Deduct Amount from Sender
            newAllUsers[indexOfUser].balance=newAllUsers[indexOfUser].balance - parseInt(amount)
            console.log(newAllUsers[indexOfUser].balance);
            //Send History to Receiver
            //Initialise date and time display settings
            var myDate = new Date;
            var allTime = myDate.toLocaleTimeString()
            var allDate =  myDate.toLocaleDateString()
            var referenceNumber = Math.round(Math.random()*10000000000000000)
            let transactionHistoryReceiver = {
                name: `${newAllUsers[indexOfUser].firstName} ${newAllUsers[indexOfUser].lastName} `,
                accountNumber:newAllUsers[indexOfUser].accountNumber,
                date:allDate,
                time:allTime,
                description:description,
                short_description:`Trf-${newAllUsers[indexOfUser].firstName}-${description.substring(0,10)}`,
                transferAmount:parseFloat(amount),
                transactionType:'credit',
                referenceNumber:referenceNumber,
                transaction_img:newAllUsers[indexOfUser].profilePic
            }
            //push history to receiver
            found.history.push(transactionHistoryReceiver)
            //Send History to Sender
            let transactionHistorySender = {
                name: `${found.firstName} ${found.lastName} `,
                accountNumber:found.accountNumber,
                date:allDate,
                time:allTime,
                description:description,
                short_description:`Trf-${found.firstName}-${description.substring(0,10)}`,
                transferAmount:parseFloat(amount),
                transactionType:'debit',
                referenceNumber:referenceNumber,
                transaction_img:found.profilePic
            }
            //push history to sender
            newAllUsers[indexOfUser].history.push(transactionHistorySender)
            console.log(found.history);
            console.log(newAllUsers[indexOfUser].history);
            //set changes to sender and receiver
            newAllUsers[indexOfReceiver] = found
            setallUsers(()=>{
                let newState = newAllUsers
                localStorage.allUsers =  JSON.stringify(newState)
                console.log(newState)
                return newState
            })
            setcurrentUser(()=>{
                let newState =  newAllUsers[indexOfUser]
                localStorage.currentUser = JSON.stringify(newState)
                return newState
            })
            setCurrentUserHistory(()=>{
                let newState = newAllUsers[indexOfUser].history
                localStorage.currentUserHistory = JSON.stringify(newState)
                return newState
            })
            Swal.fire(
                'Good job!',
                'You have transferred successfully',
                'success'
              )
            history.push("/dashboard")
            //set changes to localStorage
            // console.log(newAllUsers);
        }
    }
    return (
        <>
            <div className='container'>
                <div className='row mx-auto'>
                    <div className='col-2 bg-secondary text-light py-2 text-center shadow-3 my-2 mx-2 btn' onClick={()=>setAmount(1000)}><h5>1000</h5></div>
                    <div className='col-2 bg-secondary text-light py-2 text-center shadow-3 my-2 mx-2 btn' onClick={()=>setAmount(5000)}><h5>5000</h5></div>
                    <div className='col-2 bg-secondary text-light py-2 text-center shadow-3 my-2 mx-2 btn' onClick={()=>setAmount(10000)}><h5>10000</h5></div>
                    <div className='col-2 bg-secondary text-light py-2 text-center shadow-3 my-2 mx-2 btn' onClick={()=>setAmount(100000)}><h5>100000</h5></div>
                    
                </div>
            </div>

            <div className='container'>
                <div className='row mx-auto'>
                    <input className='form-control my-2 w-75' type="text" placeholder="Amount" onChange={handleAmount} value={amount}/>
                    <input className='form-control my-2  w-75' type="text" placeholder="Account Number" onChange={confirmAccount} maxLength='10' />
                    <input className='form-control my-2  w-75' type="text" placeholder="Account Name" value={accountName} disabled/>
                    <input className='form-control my-2 w-75' type="password" placeholder="Enter your 4-digit Pin" onChange={handlePin} maxLength='4'/> 
                    <textarea className='form-control my-2 w-75' type="text" placeholder="Description (optional)" onChange={handleDescription}/>
                    <button className="btn btn-success btn-block  w-75"  onClick={makeTransaction}>Make Transaction</button>
                </div>
            </div>
        </>
    )
}
