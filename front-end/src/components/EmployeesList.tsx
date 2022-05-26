import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveEmployees,
  deleteAllEmployees,
  deleteEmployee
} from "../actions/employees";
import { Link } from "react-router-dom";
import EmployeeModel from "../types/EmployeeModel";
import { ButtonDanger, ButtonPrimary, Container, Table, Td, Tr } from "../styles/Components";

type Props = {   
  retrieveEmployees:any,
  deleteAllEmployees:any,
  deleteEmployee:any,
  employees: Array<EmployeeModel>,
};

type State = {
  employees: Array<EmployeeModel>,
};

class EmployeesList extends Component<Props, State> {
  constructor(props:any) {
    super(props);

    this.removeAllEmployees = this.removeAllEmployees.bind(this);
    this.removeEmployee = this.removeEmployee.bind(this);

  }

  componentDidMount() {
    this.props.retrieveEmployees();
  }


 removeEmployee(id:String) {
      this.props
      .deleteEmployee(id)
      .then((response:any) => {
        console.log(response);
        this.props.retrieveEmployees();
      })
      .catch((e:any) => {
        console.log(e);
      });
  }

  removeAllEmployees() {
    this.props
      .deleteAllEmployees()
      .then((response:any) => {
        console.log(response);
      })
      .catch((e:any) => {
        console.log(e);
      });
  }


  render() {
    const { employees } = this.props;

    return (
      <Container>
        <h3 className="w-100">Employees List</h3>
        {employees.length > 0 ? (
        <div className="w-100">
        <Table>
            <thead>
                <Tr>
                    <th>Employee Name</th>
                    <th>Gender</th>
                    <th>Date of Birth</th>
                    <th>Sallary</th>
                    <th>Action</th>
                </Tr>
            </thead>
            <tbody>
            {employees &&
              employees.map((employee, index) => (
                <Tr>
                  <Td>{employee.name}</Td>
                  <Td>{employee.gender}</Td>
                  <Td>{employee.dob}</Td>
                  <Td>{employee.sallary}</Td>
                  <Td>
                      <Link to={"/employee/" + employee._id}><ButtonPrimary>Edit</ButtonPrimary></Link>
                      <ButtonDanger onClick={() => this.removeEmployee(employee._id)}>Delete</ButtonDanger>
                  </Td>
              </Tr>
              ))}
            </tbody>
          </Table>
          <ButtonDanger
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllEmployees}
          >
            Remove All
        </ButtonDanger>
        </div>
        ): (
          <div className="alert alert-info w-100">
              Oops! no data found.
          </div>
        )
        }
      </Container>
    );
  }
}

const mapStateToProps = (state:any) => {
  return {
    employees: state.employees,
  };
};

export default connect(mapStateToProps, {
  retrieveEmployees,
  deleteAllEmployees,
  deleteEmployee
})(EmployeesList);
