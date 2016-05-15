import {Injectable} from "@angular/core";
import {Subject} from 'rxjs';

@Injectable()
export class UserService {
    public user: Subject<any>;
    constructor() {
        this.user = new Subject();
    }
    public getUserStatus () {
        return this.user;
    }
    public setUserName (userName: string) {
        localStorage.setItem("userName", userName);
        this.user.next(userName);
    }
    public clearUserName (userName: string) {
        localStorage.removeItem("userName");
        this.user.next('');
    }
}