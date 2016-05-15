import {Injectable} from "@angular/core";
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {UserService} from '../user/user.service.ts';

@Injectable()
export class ProductsService {
    constructor(private af: AngularFire, private userService: UserService) {
    }

    public getProducts<FirebaseListObservable>() {
        return this.af.database.object('/products');
    }

    public getProductsByCategory<FirebaseListObservable>(category: string) {
        return this.af.database.list(`/products/${category}`);
    }

    public saveProductReviews(category: string, productKey: string, review: any) {
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
                    products.update(prod, { reviews: reviews, rating: rating });
                }
            }

            let user = JSON.parse(localStorage.getItem("user"));
            if (!user.reviews || user.reviews.length === 0) {
                user.reviews = [];
            }
            review.productName = selectedProdName;
            user.reviews.unshift(review);
            this.af.database.list('/users').update(user.$key, { reviews: user.reviews });
            localStorage.setItem("user", JSON.stringify(user));
        },
            (error: any) => console.log(error),
            () => {
                console.log(productsList);
            }
            );
    }

    public updateReview(reviewData: any, product: any) {
        let products: any = this.af.database.list(`/products/${product.category}`).bufferCount(11);
        products.subscribe((prs: any) => {
            for (let prod of prs[prs.length - 1]) {
                if (prod.productId === product.productId) {
                    for (let i = 0; i < prod.reviews.length; i++) {
                        if (prod.reviews[i].timeStamp === reviewData.timeStamp &&
                            prod.reviews[i].reviewedByEmail === reviewData.reviewedByEmail) {
                            prod.reviews[i] = reviewData;
                            //console.log(prod.reviews);
                            products.update(prod.$key, { reviews: prod.reviews })
                                .then((r) => {
                                    console.log(r);
                                }, (e) => {
                                    console.log(e);
                                });
                            break;
                        }
                    }
                }
            }
        });

        var usersObs = this.userService.getUsers()
        usersObs.subscribe((users: any) => {
            for (let userEntry of users) {
                if (userEntry.email === reviewData.reviewedByEmail) {
                    for (let i = 0; i < userEntry.reviews.length; i++) {
                        if (userEntry.reviews[i].timeStamp === reviewData.timeStamp &&
                            userEntry.reviews[i].productName === product.name &&
                            userEntry.reviews[i].reviewedByEmail === reviewData.reviewedByEmail) {
                            userEntry.reviews[i].likes = reviewData.likes;
                            userEntry.reviews[i].dislikes = reviewData.dislikes;
                            //console.log(userEntry.reviews);
                            usersObs.update(userEntry.$key, { reviews: userEntry.reviews });
                            break;
                        }
                    }
                }
            }
        });
    }
}
