import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}
  close = false;
  userclose = false;
  loginForm: any;
  userData: any;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(): void {
    localStorage.removeItem('user');
    this.userService
      .getUser(this.loginForm.value.username)
      .then((res: any) => {
        this.userData = res;
        if (res == undefined) {
          console.log('User does not exits.');
        } else {
          if (res.password === this.loginForm.value.password) {
            console.log('password is correct.');
            localStorage.setItem('user', JSON.stringify(res));
            this.router.navigate(['/dashboard']);
          } else {
            console.log('incorrect Password');
          }
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
