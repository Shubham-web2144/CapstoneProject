import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  // injecting httClient service
  constructor(private http: HttpClient) { }

  // api path
  private API_PATH_URL = "http://localhost:4200/api/employees";

  employees: Employee[] = [];

  // get all employees data api
  getAllEmployees() {
    return this.http.get(this.API_PATH_URL);
  }

  // add new employee api
  addNewEmployee(employee: Employee) {
    return this.http.post(this.API_PATH_URL, employee);
  }

  //delete employee by id api
  deleteEmployee(id: number) {
    return this.http.delete(`${this.API_PATH_URL}/${id}`);
  }

  // edit employee api
  editEmployee(employee : Employee) {
    return this.http.put(`${this.API_PATH_URL}/${employee.id}`, employee);
  }


  // get single employee data by id api
  getEmployeeById(id:number) {
    return this.http.get(`${this.API_PATH_URL}/${id}`);
  }

  
}
