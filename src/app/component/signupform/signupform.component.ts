import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.scss'],
})
export class SignupformComponent implements OnInit {
  constructor(private userservice: UserService, private fb: FormBuilder) {}

  msg: string | null | undefined;
  msgClosebtn = false;
  msgSuccess = false;
  msgError = false;
  signUpForm: any;

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmedpassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  createAccount(): any {
    if (
      this.signUpForm.value.password.length !=
      this.signUpForm.value.confirmedpassword.length
    ) {
      this.msg = 'Password and confirmed Password are not same.';
      this.msgError = true;
      return this.msg;
    } else {
      this.userservice
        .createUser(
          this.signUpForm.value.username,
          this.signUpForm.value.password
        )
        .then((res: any) => {
          if (res.length === 0) {
            this.msg = 'Error while creating user';
            this.msgError = true;
          } else {
            this.msg = `User ${this.signUpForm.value.username} created successfully`;
            this.msgSuccess = true;
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }

  msgErrorClose(): void {
    this.msgError = !this.msgError;
  }
  msgSuccessClose(): void {
    this.msgSuccess = !this.msgSuccess;
  }
}
