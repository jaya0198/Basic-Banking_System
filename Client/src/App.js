import React  from 'react';
import './style.css';
import {useState} from "react";
import Axios from 'axios';
import Home from './Home.js';
import Transfer from './Transfer.js';
import About from'./About.js';
import View from './View.js';
import Contact from './Contact.js';
import logo from './images/bg2.png';
///import Particles from 'react-particles-js';
//import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [customers,setCustomers]=useState([]);
  const [head,setHead]=useState([]);
  const [bal,setBal]= useState("");
  const [sender,setSender]= useState("");
  const [receiver,setReceiver]= useState("");
  const [loading,setLoading]=useState(false);

  let correct=true;
  let senderBalance=0;
  const getCustomer=()=>{

    Axios.get("http://localhost:3001/customers").then((response)=>{
      console.log(response);
      setCustomers(response.data);
      setHead(Object.keys(response.data[0]));
    });
}


const transfers=()=>{
  setLoading(true);
    console.log(sender);
    console.log(receiver);
    console.log(bal);
    if(sender==="" || receiver===""){
      correct=false;
      setLoading(false);
      setSender("");
      setReceiver("");
      setBal("");
      return(alert('Enter all Details.'))
    }
    if(bal===""){
      correct=false;
      setLoading(false);
      return(alert('Please Enter Amount.'))}
      for(const val of customers)
      {
        if(val.Name===sender){
          senderBalance=val.Balance;
        }
      }

      console.log(senderBalance);
      if(senderBalance-bal<0){
        correct=false;
        setLoading(false);
        setSender("");
        setReceiver("");
        setBal("");
        return(alert('Not enough balance'))}

      if(correct===true){

    Axios.post("http://localhost:3001/transaction",{
      sender:sender,
      receiver:receiver,
      balance:bal
    }).then(()=>{
      console.log("Success");
    });

    Axios.put("http://localhost:3001/update",{
      balance:bal,
      receiver:receiver
    }).then((response)=>{
      setCustomers(
        customers.map((val)=>{
          return val.Name===receiver?
          {
            id:val.id,
            Name:val.Name,
            Email:val.Email,
            MobileNo:val.MobileNo ,
            Balance:parseInt(bal)+parseInt(val.Balance),
          }
          :val.Name===sender?
          {
            id:val.id,
            Name:val.Name,
            Email:val.Email,
            MobileNo:val.MobileNo ,
            Balance:parseInt(val.Balance)-parseInt(bal),
          }
          :val;
        })
      );

      alert("Successful Transaction");
      setLoading(false);
      setSender("");
      setReceiver("");
      setBal("");
    });
  }
};


  return (
<div className="App">
   

      <ul>
  <li class="new" >Axiom Bank </li>
  <li><a class="active" href="#home">Home</a></li>
  <li><a href="#contact">Contact</a></li>
  <li><a href="#about">About</a></li>
  <li><a href="#view">View Customers</a></li>
  <li><a href="#transfer">Transfer Money</a></li>
</ul>
      <div className="tab-content">
          <div id="home" className="navBar tab-pane active">
            <Home/>
          </div>
          <div id="view" className="navBar tab-pane fade" >
            <View getCustomer={getCustomer} customers={customers} head={head}/>
          </div>
          <div id="transfer" className="navBar tab-pane fade">
            <Transfer sender={sender} setSender={setSender} customers={customers} transfers={transfers} receiver={receiver} setReceiver={setReceiver} bal={bal} setBal={setBal} loading={loading}/>
          </div>
          <div id="about" className="navBar tab-pane fade">
            <About/>
          </div>
          <div id="contact" className="navBar tab-pane fade">
<Contact/>
          </div>
      </div>
     
    </div>

  );
}


export default App;
