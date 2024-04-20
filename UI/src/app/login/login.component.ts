import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userData = {
    userName: '',
    userPassword: ''
  };
  errorMessage = "";

  constructor(private http: HttpService, private router: Router, private ls: StorageService) {

  }

  login(f: NgForm) {
    this.errorMessage = "";
    let url = "userLogin";
    let data = f.value;
    this.http.post(url, data).subscribe(res => {
      if (res.status != 200) {
        this.errorMessage = res.message;
      } else {
        this.ls.set("userData", res.userId);
        this.router.navigateByUrl("");
      }

    })
  }
  register(){
    alert("working on it..")
  }
}
