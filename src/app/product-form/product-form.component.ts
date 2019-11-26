import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import  { ProductService} from '../Services/ProductService'; 
import { FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { ProductAddViewModel } from '../models/ProductAddViewModel';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})


export class ProductFormComponent implements OnInit {

productForm:FormGroup;
unitTypes=[];
selectedUnitType:number=1;

  constructor(private route:ActivatedRoute,
    private productService:ProductService,
    private formBuilder:FormBuilder,
    private router: Router) {

      this.createForm();
     
     of(this.getUnitTypes()).subscribe(unitTypes => {
      this.unitTypes = unitTypes;
      this.productForm.controls.unitTypes.patchValue(this.unitTypes[0].id);
    });
   }

getUnitTypes(){
return [
  { id: '1', value: 'Book'},
  { id: '2', value: 'DVD-disc'},
  { id: '3', value: 'Furniture'}
     ];
}

  ngOnInit() {
  }

  onSubmit(){
   
  let result;
  let model =new ProductAddViewModel();
  model.sku=this.productForm.controls.sku.value;
  model.name=this.productForm.controls.name.value;
  model.price=this.productForm.controls.price.value;
  model.unitTypeId=this.selectedUnitType;

  
      if(this.selectedUnitType==1){
        this.setFormControlToNull(this.productForm.controls.size,  this.productForm.controls.dLength,
        this.productForm.controls.dWidth, this.productForm.controls.dHeight);
        
        model.unitValue=this.productForm.controls.weight.value;

       } else if(this.selectedUnitType==2) {
          this.setFormControlToNull(this.productForm.controls.weight,this.productForm.controls.dLength,
          this.productForm.controls.dWidth,
          this.productForm.controls.dHeight);

        model.unitValue=this.productForm.controls.size.value;
     } else {
         this.setFormControlToNull(this.productForm.controls.size,this.productForm.controls.weight);

        model.unitValue=this.productForm.controls.dHeight.value+"x"+ this.productForm.controls.dWidth.value+"x"+ this.productForm.controls.dLength.value;
    }

        console.log(model);  
     
     this.productService.addProduct(model)
    .subscribe(
      result=> {
        result=result;
      }); 
      console.log(result);
      if(result==true) {
        alert("Product added succssfully");
        this.router.navigate(["../product/list"]);
      }
  }

  setFormControlToNull(...params:AbstractControl[]) {
    params.forEach(element => {
      element.patchValue(null);
    });
  }

  createForm() {
    this.productForm= this.formBuilder.group({
        sku:  '',
        name:  '',
        price: 0,
        unitTypeId:0,
        unitTypes:[''],
        unitValue:"",
        size:0,
        weight:0,
        dHeight:0,
        dWidth:0,
        dLength:0
    });
  }

  gotoProductList(){
    this.router.navigate(['../product/list']);
  }

}
