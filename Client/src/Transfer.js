import React from 'react';
import './style.css';

const Transfer =(props)=>{

    return(
      <div className="transfer">
      <div className="transfer-card">
          <label htmlFor="senders">From</label>
          <select name="senders" id="senders" value={props.sender} onChange={(e)=>{props.setSender(e.target.value)}}>
              <option value=""></option>
              {
                props.customers.map((val,key)=>{
                                return (
                                  <option value={val.Name} id={val.id} key={key}>{val.Name}</option>
                                )
                              })

              }
            </select>
          <label htmlFor="receivers">To</label>
          <select name="receivers" id="receivers" value={props.receiver} onChange={(e)=>{props.setReceiver(e.target.value)}} required>
              <option value=""></option>
              {
                props.customers.map((val,key)=>{
                          return (val.Name===props.sender?
                              "":
                              <option id={val.id} value={val.Name} key={key}>{val.Name}</option>
                            )
                          })
              }
              </select>
          <label>Amount</label>
          <input  placeholder="&#8377;" onChange={(e)=>{props.setBal(e.target.value)}} value={props.bal}/>
          <button type="button" onClick={props.transfers} disabled={props.loading}>
          { props.loading && <i className="fa fa-refresh fa-spin"></i>}
          Send</button>
      </div>
      </div>
    )
}
export default Transfer;
