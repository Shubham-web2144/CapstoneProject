import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})

export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  totalEmployees;
  srchTxt: any;

  //injecting employeeservice
  constructor(private employeeService: EmployeeServiceService) {}

  ngOnInit(): void {
    // call method for loading all employees
    this.getAllEmployee();
  }

  // get all employees method 
  getAllEmployee() {
    // calling getEmployees method from employeservic
    this.employeeService.getAllEmployees().subscribe((res: Employee[]) => {
      this.employees = res;
      this.totalEmployees = this.employees.length;
    });
  }

  // delete method form employee
  deleteEmployee(id: number) {
    // calling delete method from employeeservice
    this.employeeService.deleteEmployee(id).subscribe((res: Employee[]) => {
      // after deleting employee load new employee list by calling below method
      this.getAllEmployee();
    });
  }
}
