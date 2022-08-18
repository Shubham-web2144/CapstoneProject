import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})

export class EmployeeDetailsComponent implements OnInit {

  employeeId: number;
  employee: Employee;

  // injecting activatedRoute, employeeSevice nad router services
  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // getting the employeeId from the url
    this.employeeId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    // calling method
    this.getEmployee();
  }


// method for getting single employee details
  getEmployee() {
    this.employeeService
      .getEmployeeById(this.employeeId)
      .subscribe((res: Employee) => {
        this.employee = res;
        console.log(res);
      });
  }

  // sending user to employeelist page
  visitLastPage() {
    this.router.navigate(['employeeList']);
  }
}
