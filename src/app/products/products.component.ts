import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ProductListViewModel } from "../models/ProductListViewModel";

@Component({
  selector: "app-products",
  template: `<div class="fxDiv" fxLayout="wrap row" fxLayout.xs="column" fxLayoutGap="5%" fxLayoutAlign="left">
  <div fxFlex="20%" *ngFor="let item of productList;let i = index">
    <mat-card class="example-card">
      <mat-card-header>
        <mat-card-title>
          <input type="checkbox" name="mycheckboxes" class="myCheck" id="chk{{item.id}}" value="{{item.id}}">
        </mat-card-title>
      </mat-card-header>
      <mat-card-content style="text-align: center;">
        <p>{{item.sku}}</p>
        <p>{{item.name}}</p>
        <p>{{item.price}} $</p>
        <p>
          <span *ngIf="item.unitType=='mb'">Size </span>
          <span *ngIf="item.unitType=='kg'">Weight </span>
          <span *ngIf="item.unitType==''">Dimension </span>
          : {{item.unitValue}} {{item.unitType}}
        </p>
      </mat-card-content>
    </mat-card>
    <p *ngIf="((i+1)%4)==0"></p>
  </div>
</div>`,
  styles: [
    `
      .fxDiv {
        width: 100%;
        margin-right: 20px;
        margin-left: 20px;
        margin-top: 20px;
      }
    `
  ]
})
export class ProductsComponent implements OnInit {
  products: ProductListViewModel[]; 

  @Input() get productList() {
    return this.products;
  }

  @Output() productListChange = new EventEmitter();
  set productList(val) {
    this.products = val;
    this.productListChange.emit(this.products);
  }
  constructor() {}

  ngOnInit() {}
}
