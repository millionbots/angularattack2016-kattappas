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
    
    public getTopProducts(){
        
    }

    public saveProductReviews(category: string, productKey: string, review: any) {
        console.log(arguments);
        var products:any = this.af.database.list(`/products/${category}`).bufferCount(11);
        console.log(products);
        let productsList:any[] = [];
        products.subscribe((prs: any) => {
            var prods = prs[prs.length - 1];

            for (var prod of prods) {
                if (prod.$key === productKey) {
                    let reviews = prod.reviews;
                    
                    let rating = parseFloat((((prod.rating * prod.reviews.length + parseFloat(review.rating))/(prod.reviews.length + 1)).toFixed(3)));
                    
                    reviews.push(review);
                    var x = products.update(prod, { reviews: reviews, rating: rating });
                    console.log(x);
                }
            }

        },
            (error: any) => console.log(error),
            () => {
                console.log(productsList);
            }
            );
    }
}
