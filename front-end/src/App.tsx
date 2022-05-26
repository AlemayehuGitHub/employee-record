import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";


import AddEmployee from "./components/AddEmployee";
import UpdateEmployee from "./components/UpdateEmployee";
import EmployeesList from "./components/EmployeesList";

import { Nav, NavbarBrand, NavItem } from "./styles/Navbar";

class App extends Component {
  render() {
    return (
      <div>
        <Nav>
            <Link to={"/employee"}>
              <NavbarBrand>
                  Employee Record
              </NavbarBrand>
            </Link>
            <Link to={"/employees"} className="nav-link">
                <NavItem>Employees</NavItem>
            </Link>
            <Link to={"/employee/add"} className="nav-link">
                <NavItem>Add</NavItem>
            </Link>
        </Nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/employees"]} component={EmployeesList} />
            <Route exact path="/employee/add" component={AddEmployee} />
            <Route path="/employee/:id" component={UpdateEmployee} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
