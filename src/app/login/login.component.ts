import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb:FormBuilder , private api:ApiService , private router:Router){}

 loginForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-z0-9]*')]]
  })

  login(){
    if(this.loginForm.valid){

      const email = this.loginForm.value.email
      const password  = this.loginForm.value.password

      const user = {email, password}
             this.api.loginapi(user).subscribe({
              next:(res:any)=>{
                console.log(res);
                sessionStorage.setItem("username",res.existingUser.username)
                sessionStorage.setItem("token",res.token)
               alert('login successfully')
               this.router.navigateByUrl('') 
              },
              error:(err:any)=>{
                console.log(err);
                alert(err.error)
              }
             })
     }
     else{
      alert('invalid form')
     }
  }
}
