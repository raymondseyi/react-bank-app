import logo from './logo.svg';
import React from 'react'
import './App.css';
import {useState,useEffect} from 'react'
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Transfer from './components/Transfer';
import History from './components/History';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import {useHistory} from 'react-router'
function App() {
  // useEffect(() => {
  //   this.allUsers=localStorage.localAllUsers?JSON.parse(localStorage.localAllUsers):[]
  // }, [])
  const histo = useHistory()
  const [allUsers, setallUsers] = useState([])
  useEffect(() => {
    if(localStorage.allUsers){
      setallUsers(()=>{
        let newState = JSON.parse(localStorage.allUsers);
        return newState})
    }
    else{
      setallUsers([])
    }
    console.log(allUsers);
  },[]);

  const addAllUsers = (values)=>{
    console.log(values);
    setallUsers(()=>{
      values.accountNumber = "1211" +(Math.round(Math.random()*1000000))
      values.balance = 0
      values.profilePic = "../../public/assets/img/avatar.png"
      values.history = []
      values.beneficiary = []
      values.loan = []
      values.savings = []
      let newState = [...allUsers,values];
      localStorage.setItem('allUsers',JSON.stringify(newState))
      return newState})
    
    // // localStorage.allUsers = JSON.stringify(allUsers)
    
  }
  const clicked = ()=>{
    console.log(allUsers);
  }
  
  return (
    
    <Router>
    <>
      <Navbar/>
      <Switch>
        <Route exact path='/signup'>
          <SignUp addAllUsers={addAllUsers}/>
        </Route>
        <Route exact path='/signin'>
          <SignIn allUsers={allUsers}/>
        </Route>
        <Route exact path='/dashboard'>
          <Dashboard allUsers={allUsers}/>
        </Route>
        <Route exact path='/transfer'>
          <Transfer allUsers={allUsers}/>
        </Route>
        <Route exact path='/history'>
          <History allUsers={allUsers}/>
        </Route>
      </Switch>
    </>
    </Router>
  );
}

export default App;
