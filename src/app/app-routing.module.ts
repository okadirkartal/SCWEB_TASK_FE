import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductFormComponent } from "./product-form/product-form.component";
import { ProductListComponent } from "./product-list/product-list.component";

const routes: Routes = [
  { path: ".", redirectTo: "product/list", pathMatch: "full" },
  { path: "", redirectTo: "product/list", pathMatch: "full" },
  { path: "product/add", component: ProductFormComponent },
  { path: "product/list", component: ProductListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
