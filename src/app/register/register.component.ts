import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb:FormBuilder , private api:ApiService, private router:Router){}

  registerForm = this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-z0-9]*')]]
  })


  register(){
     if(this.registerForm.valid){
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password  = this.registerForm.value.password

      const user = {username, email, password}
             this.api.registerapi(user).subscribe({
              next:(res:any)=>{
                console.log(res);
                
               alert('register successfully')
               this.router.navigateByUrl('/user/login') 
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
