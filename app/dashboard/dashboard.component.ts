import {Component} from '@angular/core';
import {ProductsService} from '../products/products.service.ts';
import {UserService} from '../user/user.service.ts';

let dashboardTemplate = require('./dashboard.template.html');
let styles = require('./dashboard.scss');

@Component({
    selector: 'dashboard',
    template: dashboardTemplate,
    styles: ['' + styles]
})
export class DashboardComponent {
    topProducts: Array<any> = [];

    constructor(private productsService: ProductsService, private userService: UserService){

    }

    ngOnInit(){
        this.productsService.getProducts()
            .subscribe((products) => {
                this.topProducts = [];
                let sortedCameras = products.Cameras.sort(this.sortProducts);
                let sortedMobiles = products.Mobiles.sort(this.sortProducts);
                let sortedNotebooks = products.Notebooks.sort(this.sortProducts);

                let allProds = Array.prototype.concat.apply([],[products.Cameras, products.Mobiles, products.Notebooks]);

                var sortedProds = allProds.sort(function(prod1: any, prod2: any){
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

                this.users = this.userService.getUsers();
                this.users.subscribe(users => {
                    _this.usersList = users;
                });
            });
    }
}
