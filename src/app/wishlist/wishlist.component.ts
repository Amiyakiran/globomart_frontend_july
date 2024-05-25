import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
allProducts:any=[]

  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.getWishlistitem()
  }

  getWishlistitem(){
    this.api.getWishlistItemApi().subscribe({
      next:(res:any)=>{
        
        this.allProducts = res
        console.log(this.allProducts);
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  removeItem(id:any){
    this.api.removeItemFromWishlist(id).subscribe({
      next:(res:any)=>{
      console.log(res); 
      this.getWishlistitem()
      this.api.getwishlistCount()
      },
      error:(err:any)=>{
        console.log(err);
        
      } 
    })
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
          this.removeItem(product._id)
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
