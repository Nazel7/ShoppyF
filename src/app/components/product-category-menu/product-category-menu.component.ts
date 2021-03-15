import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ProductCategory} from "../../commons/product-category";

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategory: ProductCategory[];

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.listOfProductCategory();

  }


  listOfProductCategory(){

    this.productService.getProductCategory().subscribe(

      data => {
        console.log("productCategory Data "+ JSON.stringify(data));
        this.productCategory= data;
      }


    );

  }

}



