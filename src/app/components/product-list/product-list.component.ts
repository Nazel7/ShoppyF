import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../commons/product";
import {ActivatedRoute} from "@angular/router";
import {dashCaseToCamelCase} from "@angular/compiler/src/util";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

   products: Product[]= [];
   currentCategoryId: number= 1;
   previousCategoryId: number= 1;
   searchMode: boolean= false;

   pageNo: number= 1;
   pageSize: number=5;
   totalElements: number= 0;



  constructor(private productService: ProductService,
              private route: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {

      this.listOfProduct();

    });

  }

  listOfProduct(){
    this.searchMode= this.route.snapshot.paramMap.has("keyword");

    if(this.searchMode){

      this.handleSearchResult();

    }else {
      this.handleProductList();
    }


  }


 handleProductList(){
  const hasCategoryId: boolean= this.route.snapshot.paramMap.has('id');

  if (hasCategoryId){

    this.currentCategoryId= +this.route.snapshot.paramMap.get('id');

  }else {
    this.currentCategoryId= 1;
  }

  if(this.previousCategoryId != this.currentCategoryId ){

    this.pageNo= 1;
  }

  this.previousCategoryId= this.currentCategoryId;


  this.productService.getProductListPaginate(this.pageNo -1, this.pageSize,this.currentCategoryId).subscribe(
    data => {
      this.products= data._embedded.products;
      this.pageNo= data.page.number +1;
      this.pageSize= data.page.size;
      this.totalElements= data.page.totalElements;
    }
  );
}


  handleSearchResult() {
    const keyWord= this.route.snapshot.paramMap.get("keyword")

    this.productService.getSearchResultPaginate(this.pageNo -1,
                                                 this.pageSize,
                                                  keyWord).subscribe(

      data => {
       this.products= data._embedded.products;
       this.pageNo= data.page.number +1;
       this.pageSize= data.page.size;
       this.totalElements= data.page.totalElements;
      }
    );
  }


  updatePageSize(pageSize: number){
    this.pageSize= pageSize;
    this.pageNo= 1;
    this.listOfProduct()
  }
}
