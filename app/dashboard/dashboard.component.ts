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
    
    constructor(private productsService: ProductsService){
        
    }
    
    ngOnInit(){
        this.productsService.getProducts()
            .subscribe((products) => {
                
                let allProds = Array.prototype.concat.apply([],[products.Cameras, products.Mobiles, products.Notebooks]);
                
                var sortedProds = allProds.sort(function(prod1, prod2){
                    if(prod1.rating > prod2.rating)
                        return -1;
                    else if(prod1.rating < prod2.rating)
                        return 1;
                    else
                        return 0;
                });
                
                this.topProducts.push(sortedProds[0]);
                this.topProducts.push(sortedProds[1]);
                this.topProducts.push(sortedProds[2]);
                
                console.log(this.topProducts);
            });
    }
}
