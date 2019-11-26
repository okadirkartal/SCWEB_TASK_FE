import { Injectable } from '@angular/core';
import {HttpClient,HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { throwError,Observable, of} from 'rxjs';
import { catchError,tap} from 'rxjs/operators';
import { ProductListViewModel} from '../models/ProductListViewModel';  
import { ProductAddViewModel } from '../models/ProductAddViewModel';


@Injectable({
    providedIn:'root'
})

export class ProductService {
    private serviceUrl='http://localhost/productApp/services/';

    constructor(private http:HttpClient){}

    getProducts():Observable<ProductListViewModel[]>{
      return this.http.get<ProductListViewModel[]>(this.serviceUrl+'getProducts.php')
        .pipe(tap(data=>console.log('All: '+JSON.stringify(data))),
        catchError(this.handleError)
        );
      }

    addProduct(model:ProductAddViewModel):Observable<boolean>{
        return this.http.post<boolean>(this.serviceUrl+'addProduct.php',model)
        .pipe(tap(data=>console.log('All: '+JSON.stringify(data))),
        catchError(this.handleError)
        );
    }


    deleteSelectedProducts(model:string):Observable<boolean>{
      return this.http.post<boolean>(this.serviceUrl+'deleteSelectedProducts.php',model)
      .pipe(tap(data=>console.log('All: '+JSON.stringify(data))),
      catchError(this.handleError)
      );
  }

    private handleError(err:HttpErrorResponse){
        let errorMessage='';
        if(err.error instanceof ErrorEvent)
          errorMessage=`An error occured ${err.error.message}`;
        else 
          errorMessage=`Server returned  code ${err.status},error message is : ${err.message}`;
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}