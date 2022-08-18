import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})

export class EditEmployeeComponent implements OnInit {

  // injecting activatedRoute, employeeService, formbuider and router services
  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeServiceService,
    private formBuilder: FormBuilder,
    private router : Router
  ) {}

  // local variable for storing url parameter value
  employeeId = 0;
  
  // for storing all employees from database
  employees: Employee[] = [];


  // form group instance
  editForm: FormGroup = this.formBuilder.group({
    id: 0,
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    location: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.email]],
    mobile: ['', [Validators.required, Validators.maxLength(10)]],
  });

  ngOnInit(): void {
    // getting employee id from url
    this.employeeId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    // getting all employees 
    this.employeeService.getAllEmployees().subscribe((res: Employee[]) => {
      this.employees = res;
      this.employees.find((emp: Employee) => {
        if (emp.id === this.employeeId) {
          // display current employee details in form 
          this.editForm.patchValue({
            id: emp.id,
            name: emp.name,
            location: emp.location,
            email: emp.email,
            mobile: emp.mobile,
          });
        }
      });
    });
  }

  
  onUpdate(editForm) {
    // temp value
    let editedEmployee: Employee = {
      id: editForm.value.id,
      name: editForm.value.name,
      location: editForm.value.location,
      email: editForm.value.email,
      mobile: editForm.value.mobile,
    };

    console.log('New Employee', editedEmployee);
    console.log(editForm);

    // calling api
    this.employeeService.editEmployee(editedEmployee).subscribe((res) => {
      console.log('Response :', res);
    });

    // sending user to employeeList page
    this.router.navigate(['employeeList']);
    
  }

  // getter for editForm
  get f() {
    return this.editForm.controls;
  }
}
