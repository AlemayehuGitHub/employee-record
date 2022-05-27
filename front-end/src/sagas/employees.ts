import EmployeeDataService from "../services/EmployeeDataService";
import {
    CREATE_EMPLOYEE,
    RETRIEVE_EMPLOYEES,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    DELETE_ALL_EMPLOYEES,
    CREATING_EMPLOYEE,
    RETRIEVING_EMPLOYEES,
    UPDATING_EMPLOYEE,
    DELETING_EMPLOYEE,
    DELETING_ALL_EMPLOYEES
  } from "./../actions/types";
  
import { put, takeEvery } from 'redux-saga/effects'

export function* retrieveEmployees() {   
    try {
        var data;
        yield EmployeeDataService.getAll().then((response)=> {
            console.log(response.data);
            data = response.data;
        })
        .catch((e) => {
          console.log(e);
        });

        yield put({type: RETRIEVE_EMPLOYEES, payload: data});
    } catch (err) {
        console.log(err)
    }
}

export function* createEmployeeSaga(action: any) {
    try {
        var data
        yield EmployeeDataService.create(action.payload).then((response)=> {
            console.log(response.data)
            data = response.data
        })
        .catch((e) => {
          console.log(e);
        });
        yield put({type: CREATE_EMPLOYEE, payload: data})
    } catch (err) {
        console.log(err)
    }
}

export function* updateEmployee(action: any) {
    try {
        var data;
        yield EmployeeDataService.update(action.payload.id, action.payload.data).then((response)=> {
            console.log(response.data);
            data = response.data;
        })
        .catch((e) => {
            console.log(e);
        });

        yield put({type: UPDATE_EMPLOYEE, payload: data})

    } catch (err) {
        console.log(err)
    }
}

export function* deleteEmployee(action: any) {
    try { 
        yield EmployeeDataService.delete(action.payload)
        yield put({type: DELETE_EMPLOYEE, payload: action.payload});
    } catch (err) {
        console.log(err)
    }
}

export function* deleteAllEmployees() {
    try { 
        yield EmployeeDataService.deleteAll()
        yield put({type: DELETE_ALL_EMPLOYEES});
    } catch (err) {
        console.log(err)
    }
}

export  function* watchEmployeesAsync() {
    yield takeEvery(CREATING_EMPLOYEE, createEmployeeSaga)
    yield takeEvery(RETRIEVING_EMPLOYEES, retrieveEmployees)
    yield takeEvery(UPDATING_EMPLOYEE, updateEmployee)
    yield takeEvery(DELETING_EMPLOYEE, deleteEmployee)
    yield takeEvery(DELETING_ALL_EMPLOYEES, deleteAllEmployees)
}

