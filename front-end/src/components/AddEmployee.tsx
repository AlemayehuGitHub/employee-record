import { Component, ChangeEvent } from "react";
import EmployeeModel from "../types/EmployeeModel";
import { connect } from "react-redux";
import { createEmployee } from "../actions/employees";
import { FormGroup, Label, Input, FormContainer, ButtonSubmit, AlertInfo, Select, ErrorMessage } from "./../styles/Forms";
import { Container } from "../styles/Components";
import moment from "moment";

type Props = { createEmployee:Function };

type State = EmployeeModel & {
  submitted: boolean,
  name_error ?: string | null,
  dob_error ?: string | null,
  gender_error ?: string | null,
  sallary_error ?: string | null
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
      dob: new Date(),
      gender: "",
      sallary: 0,
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
      dob: new Date(e.target.value)
    });
  }

  onChangeGender(e: ChangeEvent<HTMLSelectElement>) {
    this.setState({
      gender: e.target.value
    });
  }

  onChangeSallary(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      sallary: Number(e.target.value)
    });
  }

  saveEmployee() {

    const data= {
      name: this.state.name,
      dob: this.state.dob,
      gender: this.state.gender,
      sallary: this.state.sallary
    };

    this.resetErrorMessages();

    if(this.validate(data)) {
      this.props.createEmployee(data);
      this.setState({
          submitted: true,
        });
        console.log(data);
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

  newEmployee() {
    this.setState({
      _id: null,
      name: "",
      dob: new Date(),
      gender: "",
      sallary: 0,
      submitted: false
    });
  }

  render() {
    const { submitted, name, gender, dob, sallary } = this.state;
    return (
      <Container>
        {submitted == true ? (
          <AlertInfo>
            <h4>You submitted successfully!</h4>
            <ButtonSubmit onClick={this.newEmployee}>
              Add New
            </ButtonSubmit>
          </AlertInfo>
        ) : (
          <FormContainer>
            <h4>Add New Employee</h4>
            <hr/>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" value={name} onChange={this.onChangeName} name="name" required/>
              <ErrorMessage>{ this.state.name_error}</ErrorMessage>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input type="date" id="dob" value={moment(dob).format('yyyy-MM-DD')} onChange={this.onChangeDoB} name="dob" required/>
              <ErrorMessage>{ this.state.dob_error}</ErrorMessage>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="gender">Gender</Label>
              <Select className="form-control" id="gender" name="gender" value={gender} onChange={this.onChangeGender}>
                  <option>Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
              </Select>
              <ErrorMessage>{ this.state.gender_error}</ErrorMessage>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="sallary">Sallary</Label>
              <Input type="text" id="sallary" value={sallary||0} onChange={this.onChangeSallary} name="salary" required/>
              <ErrorMessage>{ this.state.sallary_error}</ErrorMessage>
            </FormGroup>
            <ButtonSubmit onClick={this.saveEmployee} >
              Submit
            </ButtonSubmit>
          </FormContainer>
        )}
      </Container>
    );
  }
}

export default connect(null, { createEmployee })(AddEmployee);
