import { Component, OnInit } from "@angular/core";
import { ProductService } from "../Services/ProductService";
import { ProductListViewModel } from "../models/ProductListViewModel";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styles: [`.fxDiv {  width:100%; margin-right: 20px; margin-left: 20px; margin-top:20px;   }`]
})
export class ProductListComponent implements OnInit {
  errorMessage: string;
  products: ProductListViewModel[] = null;
  result: boolean;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
      },
      error => (this.errorMessage = <any>error)
    );
    console.log(this.products);
  }

  getDeletableRecords() {
    let checkedBoxes = document.querySelectorAll(
      "input[name=mycheckboxes]:checked"
    );

    if (checkedBoxes.length === 0) {
      alert("No rows selected.");
      return null;
    }
  
    let selectedIds = "";

    for (let i = 0; i < checkedBoxes.length; i++) {
      selectedIds +=  (<HTMLInputElement>checkedBoxes[i]).value;
      if (i != checkedBoxes.length - 1) selectedIds += ",";
    }
    return selectedIds;
  }

  delete() {
    let deletableRecords = this.getDeletableRecords();

    if (deletableRecords == null) return;

     console.log(`deletable records ${deletableRecords}`);

   let result = this.productService.deleteSelectedProducts(deletableRecords).subscribe(
    result => {
      this.result = result;
    },
    error => (this.errorMessage = <any>error)
  );
   
   console.log(`result is ${result}`); 
   this.spliceSelectedItemsFromList(deletableRecords.split(','))
  }

 spliceSelectedItemsFromList(selectedIds:string[]){
  for(let i=0;i<selectedIds.length;i++){
    for(let j=0;j<this.products.length;j++) {
      if(selectedIds[i]==this.products[j].id.toString()) { 
          this.products= this.products.filter(x=>x.id != parseInt(selectedIds[i]));
      }
    }
  } 
 }

  gotoProductForm() {
    this.router.navigate(["../product/add"]);
  }
}
