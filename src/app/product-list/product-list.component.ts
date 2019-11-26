import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/ProductService';
import { ProductListViewModel } from '../models/ProductListViewModel';
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
errorMessage:string;
products : ProductListViewModel[];
checkboxes: boolean[];
result:boolean;

  constructor(private productService : ProductService,private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe(
      products=> {
        this.products=products;
      },
      error=>this.errorMessage=<any>error
    );
  }

  delete() {
    let selectedIds='';
    let checkedBoxes = document.querySelectorAll('input[name=mycheckboxes]:checked'); 

    if (checkedBoxes.length==0) {
      alert("No rows selected.");
      return;
    } 

    for(var i=0;i< checkedBoxes.length;i++){
      selectedIds += checkedBoxes[i].value;
        if(i!=checkedBoxes.length-1)
          selectedIds+=',';
      }
       
      console.log(selectedIds);
  
      this.productService.deleteSelectedProducts(selectedIds).subscribe(
      result=> {
        this.result=result;
      },
      error=>this.errorMessage=<any>error
    ); 
   
   this.getProducts();
  }

  gotoProductForm(){
    this.router.navigate(['../product/add']);
  }

  gotoProductList(){
    this.router.navigate(['../product/list']);
  }
}