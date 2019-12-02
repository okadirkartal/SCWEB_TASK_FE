import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductListViewModel } from '../models/ProductListViewModel'; 

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [`.fxDiv {  width:100%; margin-right: 20px; margin-left: 20px; margin-top:20px;   }`]
})
export class ProductsComponent implements OnInit {

  products:ProductListViewModel[];
  errorMessage:string;
  
  @Input()
  get productList(){
    return this.products;
  }

  @Output()  productListChange=new EventEmitter();
  set productList(val){
    this.products=val;
    this.productListChange.emit(this.products[0]);
  }
  constructor() { }

  ngOnInit() {
  }
}
