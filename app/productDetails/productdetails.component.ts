import {Component, OnInit} from "@angular/core";
import {ProductsService} from "../products/products.service.ts";
import { RouteParams } from '@angular/router-deprecated';
import {User} from '../user/user.ts';
import {UserService} from '../user/user.service.ts';
import {RatingSelectorComponent} from "./ratingselector.component.ts";

let productDetailsTemplate = require("./productDetails.template.html");

@Component({
	selector: "product-details",
	template: productDetailsTemplate,
	directives: [RatingSelectorComponent]
})
export class ProductDetailsComponent extends User implements OnInit {
	product: any;
	reviewRating: number;
	reviewComment: string;

	constructor(private productService: ProductsService,
		private routeParams: RouteParams,
		private userService: UserService) {
        super(userService);
	}

	ngOnInit() {
		let id = this.routeParams.get('id');
		let category = this.routeParams.get('category');
		this.productService.getProductsByCategory(category)
			.subscribe(products => {
				for (let p of products) {
					if (p.productId === id) {
						this.product = p;
					}
				}
			});
	}

	productSpecs(input: any) {
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }

	postReview(){
		let category = this.routeParams.get('category');
		this.productService.saveProductReviews(category, this.product.$key, {
			rating: this.reviewRating,
			review: this.reviewComment,
			reviewedByEmail: this.email,
			reviewedByUserName: this.userName,
			timeStamp: (new Date()).toUTCString()
		});
	}
}