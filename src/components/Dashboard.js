import React from 'react'
import {useState,useEffect} from 'react'
import { useHistory } from 'react-router';

export default function Dashboard() {
    const [allUsers, setallUsers] = useState([])
    const [indexOfUser, setindexOfUser] = useState(0)
    const [currentUser, setcurrentUser] = useState(0)
    const [fundAmount,setFundAmount] = useState(0)
    const [currentUserHistory,setcurrentUserHistory]=useState([])
    const [profilePic,setProfilePic]= useState('')
    const history = useHistory()
    
    useEffect(() => {
        setallUsers(JSON.parse(localStorage.allUsers));
        setindexOfUser(JSON.parse(localStorage.indexOfUser))
        setcurrentUser(JSON.parse(localStorage.currentUser))
        setcurrentUserHistory(JSON.parse(localStorage.currentUserHistory))
       
        // setcurrentUser(()=>{
        //     let newState = allUsers[indexOfUser];
        //     return newState})
        },[]);
    const handleFundAmount = (e)=>{
        setFundAmount(e.target.value)
    }
    const FundAccount = ()=>{
        currentUser.balance= currentUser.balance + parseInt(fundAmount)
        let newallUsers = [...allUsers]
        newallUsers[indexOfUser]= currentUser
        
        setallUsers(()=>{
            let newState = newallUsers;
            localStorage.allUsers=JSON.stringify(newState)
            return newState})
        localStorage.currentUser=JSON.stringify(currentUser)
        console.log(allUsers);
        
        
    }
    const transfer = ()=>{
        history.push('/transfer')
    }
    const handleImage = (e)=>{
        setProfilePic(()=>{
            let newState = e.target.files[0]
            console.log(e.target.files[0])
            return newState
        })
        const reader = new FileReader()
  
        reader.addEventListener("load",()=>{
            // this.proPic = reader.result
            console.log(reader.result)
            // this.tellawUsers[this.userIndex].profilePicture = this.proPic
            // localStorage.setItem("localTellawUsers",JSON.stringify(this.tellawUsers))
        })
        reader.readAsDataURL(e.target.value.files[0])
    }
    return (
        <>
            {/* Welcome, {currentUser.firstName} */}
            {/* <button onClick={redirectMe}>clicky</button> */}
            {/* <div className="container-fluid">
                <div className="row">       
                    <h6 className="float-right">Welcome, {currentUser.firstName}</h6>
                    <span className='float-right'><img  src={currentUser.profilePic} alt=""/></span>
                    
                </div>
            </div> */}
            
            <div className='container-fluid mb-4'>
                {/* Row Starts */}
                <div className='row'>
                    {/* GENERAL COLUMN STARTS */}
                    <div className="col-12">
                        {/* Profile Starts */}
                        <div>
                            <div className="float-right">
                                <span>
                                    <b>
                                        Welcome, {currentUser.firstName} {currentUser.lastName}
                                    </b>
                                </span>
                                <label> 
                                    <img src="../assets/img/avatar.png" alt="" />
                                    
                                </label>
                            </div>
                        </div>
                        {/* Profile Ends */}
                    </div>
                    {/* GENERAL COLUMN ENDS */}
                    {/* First Column Starts */}
                    <div className='col-4'>
                        {/* Credit Card  Starts*/}
                        <div className='shadow-sm border rounded-lg bg-tansparent w-100 mt-3 px-3'>
                            <div className="pt-4">
                                <h4 className="float-right">Balance: #{currentUser.balance}.00</h4>
                                <h4>Acct Number</h4>
                                <span className="float-right">Status:Active</span>
                                <p>{currentUser.accountNumber}</p>
                                <div className="py-4">
                                    <button class="btn btn-dark my-2 mx-1" onClick={transfer}>Transfer</button>
                                    <button class="btn btn-dark my-2 mx-1" type="button" class="btn btn-primary" data-toggle="modal" data-target="#fundAccountModal" >Fund Account</button>
                                    <button class="btn btn-info my-2 mx-1">Loan</button>
                                    <button class="btn btn-success my-2 mx-1">Pay Bills</button>
                                </div>
                            </div>
                        </div>
                        {/* Credit Card  Ends*/}
                            {/* Transaction Buttons Starts */}
                            <div className='container-fluid '>
                                <div className='row mx-auto py-3'>
                                    <div className='col-3 rounded'>

                                        <button className="btn btn-light bg-transparent shadow-sm border" onClick={transfer}>
                                        <img className="imgsize w-100 h-100" src="../assets/svg/027-payment-1.svg" alt="cannot find you" />  
                                        
                                        </button>
                                        <h6 class="text-center py-1">Transfer</h6>
                                        
                                    </div>
                                    <div className='col-3'>
                                            <button className="btn btn-light bg-transparent shadow-sm border" type="button" data-toggle="modal" data-target="#fundAccountModal" >
                                                <img className="imgsize w-100 h-100" src="../assets/svg/009-debit-card.svg" alt="cannot find you" />  
                                                
                                            </button>
                                            <h6 className="text-center py-1">Fund Acct</h6>
                                    </div>
                                    <div className='col-3'>
                                            <button className="btn btn-light bg-transparent shadow-sm border">
                                                <img className="imgsize w-100 h-100" src="../assets/svg/005-budget.svg" alt="cannot find you" />  
                                                
                                            </button>
                                            <h6 class="text-center py-1">Loan</h6>
                                            
                                    </div>
                                    <div className='col-3 '>
                                            <button className="btn btn-light bg-transparent shadow-sm border">
                                                <img className="imgsize w-100 h-100" src="../assets/svg/002-bank.svg" alt="cannot find you" />  
                                                
                                            </button>
                                            <h6 class="text-center py-1">Pay Bills</h6>
                                    </div>
                                </div>
                            </div>
                            {/* Transaction Buttons Ends */}
                    </div>
                    {/* First Column Starts */}
                    {/* Second Column Starts */}
                    <div className="col-8 ">
                        
                        {/* Transaction History Starts */}
                        <div className="border mt-3 rounded shadow-sm bg-transparent ">
                            <h4 className="text-center">Transaction History</h4>
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
                        </div>
                        {/* Transaction History Ends */}
                    </div>
                </div>
                {/* Row Ends */}
            </div>


            
           {/* Modal */}
        <div class="modal fade" id="fundAccountModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Fund Account</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                <input class="form-control" type="number" placeholder="Enter Amount" onChange={handleFundAmount}/>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="modalbtn" onClick={FundAccount}>Fund Account</button>
                </div>
            </div>
            </div>
        </div>
        

        </>
    )
}
