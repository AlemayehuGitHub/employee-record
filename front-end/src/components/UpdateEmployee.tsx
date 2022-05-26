import React, { ChangeEvent, Component, PropsWithChildren } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { updateEmployee, deleteEmployee } from "../actions/employees";

import EmployeeDataService from "../services/EmployeeDataService";
import { ButtonDanger, Container } from "../styles/Components";
import { AlertInfo, ButtonSubmit, FormContainer, FormGroup, Input, Label, Select } from "../styles/Forms";
import EmployeeModel from "../types/EmployeeModel";

type Props = { 
  updateEmployee: Function, 
  deleteEmployee: Function
 };

type State = {
  currentEmployee: EmployeeModel,
  message ?: String | null
};

interface IReactRouterParams {
  id: string;
  username: string;
}

class UpdateEmployee extends Component<Props & RouteComponentProps<IReactRouterParams>, State> {
  constructor(props:any) {
    super(props);
    
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDoB = this.onChangeDoB.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeSallary = this.onChangeSallary.bind(this);
    this.removeEmployee = this.removeEmployee.bind(this);
    this.updateContent = this.updateContent.bind(this);

    this.state = {
      currentEmployee: {
        _id: null,
        name: "",
        dob: "",
        gender: "",
        sallary: "",
      },
      message: null,
    };
  }

  componentDidMount() {
    this.getEmployee(this.props.match.params.id);
  }


  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEmployee: {
          ...prevState.currentEmployee,
          name: name,
        },
      };
    });
  }

  onChangeDoB(e: ChangeEvent<HTMLInputElement>) {
    const dob = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEmployee: {
          ...prevState.currentEmployee,
          dob: dob,
        },
      };
    });
  }

  onChangeGender(e: ChangeEvent<HTMLSelectElement>) {
    const gender = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEmployee: {
          ...prevState.currentEmployee,
          gender: gender,
        },
      };
    });
  }

  onChangeSallary(e: ChangeEvent<HTMLInputElement>) {
    const sallary = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEmployee: {
          ...prevState.currentEmployee,
          sallary: sallary,
        },
      };
    });
  }


  getEmployee(id: string) {
    EmployeeDataService.get(id)
      .then((response) => {
        this.setState({
          currentEmployee: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }


  updateContent() {
    this.props
      .updateEmployee(this.state.currentEmployee._id, this.state.currentEmployee)
      .then((reponse:any) => {
        console.log(reponse);
        console.log(this.state.currentEmployee);
        this.setState({ message: "Employee Data was updated successfully!" });
      })
      .catch((e:any) => {
        console.log(e);
      });
  }

  removeEmployee() {
    this.props
      .deleteEmployee(this.state.currentEmployee._id)
      .then(() => {
        this.props.history.push("/employees");
      })
      .catch((e:any) => {
        console.log(e);
      });
  }

  render() {
    const { currentEmployee } = this.state;

    return (
      <Container>
        {currentEmployee ? (
          <Container>
            <h4>Edit Employee</h4>
            <hr/>
            { this.state.message ? (
              <AlertInfo>
                <p>{this.state.message}</p>
              </AlertInfo>
              ): ("")
            }
            <FormContainer>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" value={currentEmployee.name} onChange={this.onChangeName} name="name" required/>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input type="date" id="dob" value={currentEmployee.dob} onChange={this.onChangeDoB} name="dob" required/>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="gender">Gender</Label>
                <Select value={currentEmployee.gender} id="gender" name="gender" onChange={this.onChangeGender}>
                    <option>Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="sallary">Sallary</Label>
                <Input type="text" id="sallary" value={currentEmployee.sallary} onChange={this.onChangeSallary} name="salary" required/>
              </FormGroup>
              <ButtonDanger
              onClick={this.removeEmployee}
            >
              Delete
            </ButtonDanger>

            <ButtonSubmit
              className="btn btn-sm btn-success"
              onClick={this.updateContent}
            >
              Update
            </ButtonSubmit>
            </FormContainer>
          </Container>
        ) : (
          <AlertInfo>
            <p>Oops! We can't find employee with given ID.</p>
          </AlertInfo>
        )}
      </Container>
    );
  }
}

export default connect(null, { updateEmployee, deleteEmployee })(UpdateEmployee);
