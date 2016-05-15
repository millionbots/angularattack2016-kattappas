import {Component} from '@angular/core';
import {ProductsService} from '../products/products.service.ts';

let dashboardTemplate = require('./dashboard.template.html');
let styles = require('./dashboard.scss');

@Component({
    selector: 'dashboard',
    template: dashboardTemplate,
    styles: ['' + styles]
})
export class DashboardComponent {
    topProducts: Array<any> = [];

    constructor(private productsService: ProductsService) {

    }

    private sortProducts(prod1, prod2) {
        if (prod1.rating > prod2.rating)
            return -1;
        else if (prod1.rating < prod2.rating)
            return 1;
        else
            return 0;
    }

    ngOnInit() {
        this.productsService.getProducts()
            .subscribe((products) => {
                let sortedCameras = products.Cameras.sort(this.sortProducts);
                let sortedMobiles = products.Mobiles.sort(this.sortProducts);
                let sortedNotebooks = products.Notebooks.sort(this.sortProducts);

                this.topProducts.push(sortedCameras[0]);
                this.topProducts.push(sortedMobiles[0]);
                this.topProducts.push(sortedNotebooks[0]);
            });
    }
}