import {Component, OnInit} from '@angular/core';
import {ProductsService} from "./products.service.ts";
import {Product} from "./products.model.ts";
import { Router } from '@angular/router-deprecated';

let productsTemplate = require("./products.template.html");
let styles = require('./product.scss');

@Component({
    selector: 'products',
    template: productsTemplate,
    styles: ['' + styles]
})
export class ProductsComponent implements OnInit {
    products: any = {};
    public selectedCategory: string = "any";
    constructor(private productsService: ProductsService,
               private router: Router) {
    }

    ngOnInit() {
        this.productsService.getProducts()
            .subscribe(products => {
                this.products = products
            });
    }

    get categories() {
        return Object.keys(this.products);
    }

    productSpecs(input: any) {
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }

    viewDetails(product: any){
        let link = ['ProductDetails', { id: product.productId }];
        this.router.navigate(link);
    }
}
