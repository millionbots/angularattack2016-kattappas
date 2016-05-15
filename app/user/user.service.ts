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
    public setUser (user: any) {
        localStorage.setItem("userName", user.userName);
        localStorage.setItem("email", user.email);
        this.user.next(user.userName);
    }
    public clearUser () {
        localStorage.removeItem("userName");
        localStorage.removeItem("email");
        this.user.next('');
    }
}