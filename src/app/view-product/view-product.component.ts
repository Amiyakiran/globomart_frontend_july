import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

product:any = {}
constructor(private api:ApiService , private route:ActivatedRoute){}

ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      const id  = res.id
      console.log(id);
      this.getproduct(id)
    })
   
    
}

  getproduct(id:any){
    this.api.getaproductapi(id).subscribe({
      next:(res:any)=>{
       
        this.product=res[0]
        console.log( this.product);
        
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
