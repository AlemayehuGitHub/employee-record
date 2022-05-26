import axios from "axios";
import EmployeeModel from "../types/EmployeeModel"

class EmployeeDataService {
  private http = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
      "Content-type": "application/json"
    }
  });

  getAll() {
    return this.http.get<Array<EmployeeModel>>("/employees");
  }

  get(id: string) {
    return this.http.get<EmployeeModel>(`/employee/${id}`);
  }

  create(data: EmployeeModel) {
    return this.http.post<EmployeeModel>("/employee", data);
  }

  update(id: any, data: EmployeeModel) {
    return this.http.put<any>(`/employee/${id}`, data);
  }

  delete(id: any) {
    return this.http.delete<any>(`/employee/${id}`);
  }

  deleteAll() {
    return this.http.delete<any>(`/employees`);
  }

}

export default new EmployeeDataService();