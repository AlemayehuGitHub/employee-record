import moment from "moment";
import React, { ChangeEvent, Component, PropsWithChildren } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { updateEmployee, deleteEmployee } from "../actions/employees";

import EmployeeDataService from "../services/EmployeeDataService";
import { ButtonDanger, Container } from "../styles/Components";
import { AlertInfo, ButtonSubmit, ErrorMessage, FormContainer, FormGroup, Input, Label, Select } from "../styles/Forms";
import EmployeeModel from "../types/EmployeeModel";

type Props = { 
  updateEmployee: Function, 
  deleteEmployee: Function
};

type State = {
  currentEmployee: EmployeeModel,
  message ?: String | null,
  name_error ?: string | null,
  dob_error ?: string | null,
  gender_error ?: string | null,
  sallary_error ?: string | null
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
    this.updateContent = this.updateContent.bind(this);

    this.state = {
      currentEmployee: {
        _id: null,
        name: "",
        dob: new Date(),
        gender: "",
        sallary: 0,
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
    const dob = new Date(e.target.value);

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
    const sallary = Number(e.target.value);

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
          console.log("Retrieving employee")
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
    
    this.resetErrorMessages();

    if(this.validate(this.state.currentEmployee)) {
      this.props.updateEmployee(this.state.currentEmployee._id, this.state.currentEmployee)
      this.setState({ message: "Employee Data was updated successfully!" });
    }
    
  }

  resetErrorMessages() {
    this.setState({
      name_error: null,
      dob_error: null,
      gender_error: null,
      sallary_error: null
    });
  }
  
  validate(data: EmployeeModel) {
    if(typeof data.name !== "string" || data.name.length < 3){
      this.setState({ name_error: "Please Enter Valid Employee Name!" });
      return false
    }
    if(data.gender == null || data.gender == ""){
      this.setState({ gender_error: "Please select employee gender" });
      return false
    }
    if(typeof data.sallary !== "number" || data.sallary == NaN){
      this.setState({ sallary_error: "Please Enter a Number!" });
      return false
    }
    if(data.sallary < 1000){
      this.setState({ sallary_error: "You can't pay less than 1000 for employee!" });
      return false
    }
    return true
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
                <ErrorMessage>{ this.state.name_error}</ErrorMessage>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input type="date" id="dob" value={moment(currentEmployee.dob).format('yyyy-MM-DD')} onChange={this.onChangeDoB} name="dob" required/>
                <ErrorMessage>{ this.state.dob_error}</ErrorMessage>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="gender">Gender</Label>
                <Select value={currentEmployee.gender} id="gender" name="gender" onChange={this.onChangeGender}>
                    <option>Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </Select>
                <ErrorMessage>{ this.state.gender_error}</ErrorMessage>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="sallary">Sallary</Label>
                <Input type="text" id="sallary" value={currentEmployee.sallary || 0} onChange={this.onChangeSallary} name="salary" required/>
                <ErrorMessage>{ this.state.sallary_error}</ErrorMessage>
              </FormGroup>
              
              <ButtonSubmit onClick={this.updateContent}> Update </ButtonSubmit>
            
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
