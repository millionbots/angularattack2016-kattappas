import {Injectable} from "@angular/core";
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class ProductsService {
    constructor(private af: AngularFire) {
    }

    public getProducts<FirebaseListObservable>() {
        return this.af.database.object('/products');
    }

    public getProductsByCategory<FirebaseListObservable>(category: string) {
        return this.af.database.list(`/products/${category}`);
    }

    public saveProductReviews(category: string, productKey: string, review: any) {
        console.log(arguments);
        var products = this.af.database.list(`/products/${category}`).bufferCount(11);
        console.log(products);
        let productsList = [];
        products.subscribe((prs) => {
            //console.log(prs[prs.length - 1]);
            var prods = prs[prs.length - 1];

            for (var prod of prods) {
                if (prod.$key === productKey) {
                    let reviews = prod.reviews;
                    reviews.push(review);
                    var x = products.update(prod, { reviews: reviews });
                    console.log(x);
                }
            }

        },
            (error) => console.log(error),
            () => {
                console.log(productsList);
            }
            );
    }
}
