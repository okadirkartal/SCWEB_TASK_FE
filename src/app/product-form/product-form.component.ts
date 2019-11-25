import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  { ProductService} from '../Services/ProductService';
import { ProductViewModel} from '../models/ProductViewModel';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

productForm:FormGroup;
unitType=[
  [1,"Weight"],[2,'Size'],[3,'Dimension']];

  constructor(private route:ActivatedRoute,private productService:ProductService,
    private formBuilder:FormBuilder) {
    this.productForm=this.createFormGroup();
   }

  ngOnInit() {
  }

  onSubmit(){
   
    const result : productRequest=Object.assign({},this.productForm.value);
    

   /* let result;
    this.productService.addOrUpdateProduct(model)
    .subscribe(
      data=> {
        result=data;
      });
      location.href='product-list'; */   
  }

  createFormGroupWithBuilder(formBuilder:FormBuilder) {
    return  formBuilder.group({
      productData: formBuilder.group({
        sku:  '',
        name:  '',
        price: 0
       }),
      requestType: '',
      text: ''
    });
  }

}
