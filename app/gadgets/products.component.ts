import {Component, OnInit, DecimalPipe} from '@angular/core';
import {ProductsService} from "./products.service.ts";
import {Product} from "./products.model.ts";
let productsTemplate = require("./products.template.html");
let styles = require('./product.scss');

@Component({
    selector: 'products',
    providers: [ProductsService],
    template: productsTemplate,
    styles: ['' + styles]
    // template: `<div>Products loaded...
    //     <ul>
    //         <li *ngFor="#product of products">{{product.name}}</li>
    //     </ul>
    // </div>`
})
export class ProductsComponent implements OnInit {
    products:any = {};

    constructor(private productsService: ProductsService) {

    }

    ngOnInit(){
        this.productsService.getProducts()
            .subscribe(products => {
              this.products = products
            });
    }

    get categories () {
      return Object.keys(this.products);
    }

    productSpecs (input){
      var e = document.createElement('div');
      e.innerHTML = input;
      return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }
}
