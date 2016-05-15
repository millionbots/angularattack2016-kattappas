import {Injectable} from "@angular/core";
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class ProductsService {
    constructor(private af: AngularFire) {
    }

    public getProducts<FirebaseListObservable>() {
        return this.af.database.list('/products');
    }
}
