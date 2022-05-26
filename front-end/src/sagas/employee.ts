import EmployeeDataService from "../services/EmployeeDataService";
import {
    CREATE_EMPLOYEE,
    RETRIEVE_EMPLOYEES,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    DELETE_ALL_EMPLOYEES
  } from "./../actions/types";
  
import { put, takeEvery } from 'redux-saga/effects'
import EmployeeModel from "../types/EmployeeModel";

export function* retrieveEmployees() {
    const employees: EmployeeModel[] = yield EmployeeDataService.getAll()
}

export function* createEmployee(action: { payload: any; user: any; }) {
    yield EmployeeDataService.create(action.payload)
}

export function* updateEmployee(action: any) {
    yield EmployeeDataService.update(action.payload.id, action.payload.employee)
}

export function* deleteEmployee(action: { id: any; }) {
    yield EmployeeDataService.delete(action.id)
}

export function* deleteAllEmployees() {
    yield EmployeeDataService.deleteAll()
}

export function* watchUsersAsync() {
    //yield takeEvery(CREATE_EMPLOYEE, createEmployee)
    yield takeEvery(RETRIEVE_EMPLOYEES, retrieveEmployees)
    yield takeEvery(UPDATE_EMPLOYEE, updateEmployee)
    //yield takeEvery(DELETE_EMPLOYEE, deleteEmployee)
    yield takeEvery(DELETE_ALL_EMPLOYEES, deleteAllEmployees)
}