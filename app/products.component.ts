import {Component, OnInit} from '@angular/core';
import {ProductsService} from "./products.service.ts";
import {Product} from "./products.model.ts";

@Component({
    selector: 'products',
    providers: [ProductsService],
    template: `<div>
        <ul>
            <li *ngFor="#product of products">{{product.name}}</li>
        </ul>
    </div>`
})
export class ProductsComponent implements OnInit {
    products: Product[];

    constructor(private productsService: ProductsService) {
        
    }
    
    ngOnInit(){
        this.productsService.getProducts()
            .subscribe(products => this.products = products );
    }
}