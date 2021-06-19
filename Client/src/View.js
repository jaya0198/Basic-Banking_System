
import React from 'react';
import './style.css';

const View=(props)=>{


  return(
        <div className="customerView">
        <button onClick={props.getCustomer}>View</button>
        <div className="table-responsive">
        <table id="customersTable" className="table">
        <thead>
        <tr>
        {props.head.map((key,index)=>{
          return(

              <th key={index}>{key}</th>

          );
        })}
        </tr>
        </thead>
        <tbody>

        {props.customers.map((val,key)=>{
                return (
                  <tr key={key}>
                      <td>{val.id}</td>
                      <td>{val.Name}</td>
                      <td>{val.Email}</td>
                      <td>{val.MobileNo}</td>
                      <td>{val.Balance}</td>
                  </tr>);
          })
        }
        </tbody>
        </table>
        </div>
        <br/>
        </div>
          );
}
export default View;
