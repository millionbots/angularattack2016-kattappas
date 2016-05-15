import {Component} from '@angular/core';
import {ProductsService} from '../products/products.service.ts';
import {Router} from "@angular/router-deprecated";
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
    users: Array<any>;
    usersList: any;
    
    constructor(private productsService: ProductsService,
                private router: Router,
                private userService: UserService) {

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
                this.topProducts = [];
                let sortedCameras = products.Cameras.sort(this.sortProducts);
                let sortedMobiles = products.Mobiles.sort(this.sortProducts);
                let sortedNotebooks = products.Notebooks.sort(this.sortProducts);

                this.topProducts.push(sortedCameras[0]);
                this.topProducts.push(sortedMobiles[0]);
                this.topProducts.push(sortedNotebooks[0]);
                
                this.users = this.userService.getUsers();
                this.users.subscribe(users => {
                    this.usersList = users;
                });
            });
    }
    
    viewDetails(product: any){
        let link = ['ProductDetails', { id: product.productId, category: product.category }];
        this.router.navigate(link);
    }
}