import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {

  // cinstance of formGroup class
  employeeForm: FormGroup;

  currIdx = 3;

  employees: Employee[] = [];

  // injecting employeeservice, router and formbuilder services
  constructor(
    private employeeService: EmployeeServiceService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // loading all employees in local employee array
    this.employeeService.getAllEmployees().subscribe((res: Employee[]) => {
      this.employees = res;
      this.currIdx = this.employees.length + 1;
    });

    // creating form instance and validation using formBuilder
    this.employeeForm = this.formBuilder.group({
      id: 0,
      name: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      location: ['', [Validators.required]],
      email: [
        '',
        [Validators.required,
        Validators.maxLength(30),
        Validators.minLength(8),
        Validators.email,
        ]
      ],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    });
  }

  // addEmployee method 
  addEmployee(addForm) {
    // local employee object and getting values from parameter 
    let employee: Employee = {
      id: this.currIdx++,
      name: addForm.value.name,
      location: addForm.value.location,
      email: addForm.value.email,
      mobile: addForm.value.mobile,
    };
    // this.employee.id = this.currIdx++;
    // calling add employee api from employeeservice
    this.employeeService.addNewEmployee(employee).subscribe((res) => {
      console.log(res);
    });

    // sending user to employeeList page
    this.router.navigate(['/employeeList']);
    console.log(addForm);
    console.log(employee);
  }

  // getters for employeeForm
  get f() {
    return this.employeeForm.controls;
  }
}
