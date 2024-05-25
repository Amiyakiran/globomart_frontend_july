import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  allproduct:any=[]

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.getallproductapi().subscribe({
      next:(res:any)=>{
      this.allproduct=res
      console.log(this.allproduct);
      
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  addToWishlist(product:any){
     if(sessionStorage.getItem("token")){
     this.api.addToWishlistApi(product).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.api.getwishlistCount()
        Swal.fire({
          position: "top",
          title: "Wow....",
          text: "product added to wishlist successfully",
          icon: "success"
        });
        
      },
      error:(err:any)=>{
        console.log(err);
        Swal.fire({
          position: "top",
          title: "Oops....",
          text: `${err.error}`,
          icon: "error"
        });
      }
     })
     
     }else{
      Swal.fire({
        position: "top",
        title: "Oops....",
        text: "please login",
        icon: "info"
      });
     }
  }


  addToCart(product:any){
    if(sessionStorage.getItem("token")){
      Object.assign(product,{quantity:1})
      this.api.addToCartApi(product).subscribe({
        next:(res:any)=>{
          Swal.fire({
            position: "top",
            title: "Wow....",
            text: "product added to cart successfully",
            icon: "success"
          });
          this.api.getcartCount()
        }
        ,
        error:(err:any)=>{
          console.log(err);
          Swal.fire({
            position: "top",
            title: "Oops....",
            text: err.error,
            icon: "error"
          });
          
        }
      })
      }else{
        Swal.fire({
          position: "top",
          title: "Oops....",
          text: "please login",
          icon: "info"
        });
      }
  }
}
