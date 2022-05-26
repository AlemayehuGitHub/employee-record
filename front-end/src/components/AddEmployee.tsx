import { Component, ChangeEvent } from "react";
import EmployeeModel from "../types/EmployeeModel";
import { connect } from "react-redux";
import { createEmployee } from "../actions/employees";

import { FormGroup, Label, Input, Message, FormContainer, ButtonSubmit, AlertInfo, Select } from "./../styles/Forms";

type Props = { createEmployee:Function };

type State = EmployeeModel & {
  submitted: boolean
};

class AddEmployee extends Component<Props, State> {
  constructor(props:any) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDoB = this.onChangeDoB.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeSallary = this.onChangeSallary.bind(this);

    this.saveEmployee = this.saveEmployee.bind(this);
    this.newEmployee = this.newEmployee.bind(this);

    this.state = {
      _id: null,
      name: "",
      dob: "",
      gender: "",
      sallary: "",
      submitted: false
    };
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDoB(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      dob: e.target.value
    });
  }

  onChangeGender(e: ChangeEvent<HTMLSelectElement>) {
    this.setState({
      gender: e.target.value
    });
  }

  onChangeSallary(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      sallary: e.target.value
    });
  }

  saveEmployee() {

    const data= {
      name: this.state.name,
      dob: this.state.dob,
      gender: this.state.gender,
      sallary: this.state.sallary
    };

    this.props
      .createEmployee(data)
      .then((data: EmployeeModel) => {
        this.setState({
          _id: data._id,
          name: data.name,
          dob: data.dob,
          gender: data.gender,
          sallary: data.sallary,

          submitted: true,
        });
        console.log(data);
      })
      .catch((e:any) => {
        console.log(e);
      });
  }

  newEmployee() {
    this.setState({
      _id: null,
      name: "",
      dob: "",
      gender: "",
      sallary: "",
      submitted: false
    });
  }

  render() {
    const { submitted, name, gender, dob, sallary } = this.state;
    return (
      <div>
        {this.state.submitted == true ? (
          <AlertInfo>
            <h4>You submitted successfully!</h4>
            <ButtonSubmit onClick={this.newEmployee}>
              Add New
            </ButtonSubmit>
          </AlertInfo>
        ) : (
          <FormContainer>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" value={name} onChange={this.onChangeName} name="name" required/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input type="date" id="dob" value={dob} onChange={this.onChangeDoB} name="dob" required/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="gender">Gender</Label>
              <Select className="form-control" id="gender" name="gender" value={gender} onChange={this.onChangeGender}>
                  <option>Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="sallary">Sallary</Label>
              <Input type="text" id="sallary" value={sallary} onChange={this.onChangeSallary} name="salary" required/>
            </FormGroup>
            <ButtonSubmit onClick={this.saveEmployee} >
              Submit
            </ButtonSubmit>
          </FormContainer>
        )}
      </div>
    );
  }
}

export default connect(null, { createEmployee })(AddEmployee);