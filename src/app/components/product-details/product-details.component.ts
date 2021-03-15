import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../commons/product";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

 private currentProductId: number;
 product: Product= new Product();

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{

      this.productDatail();
      }

    )

  }

  productDatail(){
      this.currentProductId= +this.route.snapshot.paramMap.get("id")
    this.productService.getProduct(this.currentProductId).subscribe(
      data => {
        this.product= data;
      }
    )
  }
}
