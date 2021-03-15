import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../commons/product";
import {map} from "rxjs/operators";
import {ProductCategory} from "../commons/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

private baseURl= 'http://localhost:8080/api/products';

private baseCategotyURL= 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) {

  }
  getProductListPaginate(pageNo: number,
                         pageSize: number,
                         currentCategoryId: number): Observable<GetResponse>{

    // expected implementation
    const searchUrl= `${this.baseURl}/search/findByCategoryId?id=${currentCategoryId}&page=${pageNo}&size=${pageSize}`;

    return this.httpClient.get<GetResponse>(searchUrl);
  }

  getProductList(currentCategoryId: number): Observable<Product[]>{

    // expected implementation
    const searchUrl= `${this.baseURl}/search/findByCategoryId?id=` + currentCategoryId;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(

      map(response => response._embedded.products)
    );
  }

  getProductCategory(): Observable<ProductCategory[]>{

    return this.httpClient.get<GetProductCategory>(this.baseCategotyURL).pipe(

        map(response => response._embedded.productCategory)
    );

  }
  getSearchResultPaginate(pageNo: number,
                  pageSize: number,
                  keyWord: string): Observable<GetResponse>{
    const searchByNameUrl= `${this.baseURl}/search/findByNameContaining?name=${keyWord}&${pageNo}&${pageSize}`;

    return this.httpClient.get<GetResponse>(searchByNameUrl);
  }


  getSearchResult(keyWord: string): Observable<Product[]>{
    const searchByNameUrl= `${this.baseURl}/search/findByNameContaining?name=`+ keyWord;

    return this.httpClient.get<GetResponse>(searchByNameUrl).pipe(

      map(response => response._embedded.products)

    );
  }

  getProduct(productId: number): Observable<Product>{

    const  productURL= `${this.baseURl}/${productId}`

    return this.httpClient.get<Product>(productURL).pipe(

      map(product => product)

    );
  }
}

interface GetResponse{

  _embedded: {

    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetProductCategory{

  _embedded: {

    productCategory: ProductCategory[];
  }


}
