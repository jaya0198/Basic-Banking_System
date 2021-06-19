import React from 'react';
import { Switch,Route} from 'react-router-dom';
import Home from './Home.js';
import Transfer from './Transfer.js';

const Main=()=>{
  return(
    <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/transfer' component={Transfer}></Route>
    </Switch>
  );
}
export default Main;
