import {Component, OnInit} from "@angular/core";
import {ProductsService} from "../gadgets/products.service.ts";
import { RouteParams } from '@angular/router-deprecated';

let productDetailsTemplate = require("./productDetails.template.html");

@Component({
	selector: "product-details",
	template: productDetailsTemplate
})
export class ProductDetailsComponent implements OnInit {
	product: any;

	constructor(private productService: ProductsService,
		private routeParams: RouteParams) {

	}

	ngOnInit() {
		let id = this.routeParams.get('id');
		this.productService.getProducts()
			.subscribe(products => {
				for (let productType in products) {
					for (let p of products[productType]) {
						if (p.productId === id) {
							this.product = p;
						}
					}
				}
			});
	}
	
	productSpecs(input: any) {
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }
}