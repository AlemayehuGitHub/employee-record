import {
  CREATING_EMPLOYEE,
  RETRIEVING_EMPLOYEES,
  UPDATING_EMPLOYEE,
  DELETING_EMPLOYEE,
  DELETING_ALL_EMPLOYEES
} from "./types";

export const createEmployee = (data) => {
  return { type: CREATING_EMPLOYEE, payload: data }
};

export const retrieveEmployees = () => {
  return { type: RETRIEVING_EMPLOYEES }
};

export const updateEmployee = (id, data) => {
  return { type: UPDATING_EMPLOYEE, payload: {id, data} }
};

export const deleteEmployee = (id) =>  {
  return { type: DELETING_EMPLOYEE, payload: id }
};

export const deleteAllEmployees = () => {
  return { type: DELETING_ALL_EMPLOYEES }
};
