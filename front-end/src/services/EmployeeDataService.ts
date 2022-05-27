import axios from "axios";
import EmployeeModel from "../types/EmployeeModel"

class EmployeeDataService {
  private http = axios.create({
    baseURL: process.env.MONGODB_URI+":"+process.env.PORT+"/api" || "http://localhost:4000/api",
    headers: {
      "Content-type": "application/json"
    }
  });

  getAll() {
    return this.http.get("/employees");
  }

  get(id: string) {
    return this.http.get(`/employee/${id}`);
  }

  create(data: EmployeeModel) {
    return this.http.post("/employee", data);
  }

  update(id: any, data: EmployeeModel) {
    return this.http.put(`/employee/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`/employee/${id}`);
  }

  deleteAll() {
    return this.http.delete(`/employees`);
  }

}

export default new EmployeeDataService();