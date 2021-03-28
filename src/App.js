import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import React from 'react';
import Home from './components/pages/Home/Home';
import { Router, Route, Switch } from "react-router-dom";
import Products from './components/pages/Products/Products';
import Repairs from './components/pages/Repairs/Repairs';
import Clients from './components/pages/Clients/Clients';
import Login from './components/pages/Authorization/Login'
import { store } from "./actions/store";
import { Provider } from "react-redux";
import Navbar from './components/layout/Navibar';
import AddNewRepair from './components/pages/Repairs/AddNewRepair';
import RepairsHistory from './components/pages/Repairs/RepairsHistory';
import { Container } from 'react-bootstrap';
import history from './services/history';

function App() {

  if(localStorage.getItem("user")){
    // Implement : Remove user if token is expired!!
  }

  return (
    <Provider store={store}>
      <Container fluid className="App">
        {localStorage.getItem("user") ? (
          <div>
            <Navbar />
            <Router history={history}>
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/products" component={Products}></Route>
                <Route exact path="/repairs" component={Repairs}></Route>
                <Route exact path="/repairs/add-new" component={AddNewRepair}></Route>
                <Route exact path="/repairs/history" component={RepairsHistory}></Route>
                <Route exact path="/clients" component={Clients}></Route>
              </Switch>
            </Router>
          </div>
        ):
        <Login />}
      </Container>
    </Provider>
  );
}

export default App;
