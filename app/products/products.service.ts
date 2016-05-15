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
        let products: any = this.af.database.list(`/products/${category}`).bufferCount(11);
        console.log(products);
        let productsList: any[] = [], selectedProdName: any;
        products.subscribe((prs: any) => {
            var prods = prs[prs.length - 1];

            for (var prod of prods) {
                if (prod.$key === productKey) {
                    let reviews = prod.reviews;
                    selectedProdName = prod.name;
                    let rating = parseFloat((((prod.rating * prod.reviews.length + parseFloat(review.rating)) / (prod.reviews.length + 1)).toFixed(3)));

                    reviews.unshift(review);
                    var x = products.update(prod, { reviews: reviews, rating: rating });
                    console.log(x);
                }
            }

            let user = JSON.parse(localStorage.getItem("user"));
            if (!user.reviews || user.reviews.length === 0) {
                user.reviews = [];
            }
            review.productName = selectedProdName;
            user.reviews.unshift(review);
            this.af.database.list('/users').update(user.$key, {reviews: user.reviews});
            localStorage.setItem("user", JSON.stringify(user));
        },
            (error: any) => console.log(error),
            () => {
                console.log(productsList);
            }
            );
    }
}
