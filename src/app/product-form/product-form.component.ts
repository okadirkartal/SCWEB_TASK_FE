import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  { ProductService} from '../Services/ProductService'; 
import { FormGroup, FormBuilder } from '@angular/forms';
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
    private formBuilder:FormBuilder) {

      this.createForm();
     
     of(this.getUnitTypes()).subscribe(unitTypes => {
      this.unitTypes = unitTypes;
      this.productForm.controls.unitTypes.patchValue(this.unitTypes[0].id);
    });
   }

getUnitTypes(){
return [
  { id: '1', value: 'Weight'},
  { id: '2', value: 'Size'},
  { id: '3', value: 'Dimension'}
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
        this.productForm.controls.size.patchValue(null);
        this.productForm.controls.dLength.patchValue(null);
        this.productForm.controls.dWidth.patchValue(null);
        this.productForm.controls.dHeight.patchValue(null);

        model.unitValue=this.productForm.controls.weight.value;

       } else if(this.selectedUnitType==2) {
        this.productForm.controls.weight.patchValue(null);
        this.productForm.controls.dLength.patchValue(null);
        this.productForm.controls.dWidth.patchValue(null);
        this.productForm.controls.dHeight.patchValue(null);

        model.unitValue=this.productForm.controls.size.value;
     } else {
        this.productForm.controls.size.patchValue(null);
        this.productForm.controls.weight.patchValue(null);

        model.unitValue=this.productForm.controls.dHeight.value+"x"+ this.productForm.controls.dWidth.value+"x"+ this.productForm.controls.dLength.value;
    }

        console.log(model);  
     
       this.productService.addProduct(model)
    .subscribe(
      data=> {
        result=data;
      }); 
      console.log(result);
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

}
