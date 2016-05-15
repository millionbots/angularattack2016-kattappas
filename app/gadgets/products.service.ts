import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

@Injectable()
export class ProductsService {
    constructor(private httpService: Http) {
    }

    public getProducts() {
        return this.httpService.get("app/gadgets/products.json")
            .map((res: Response) => res.json());
    }
}
