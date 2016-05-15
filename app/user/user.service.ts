import {Injectable} from "@angular/core";
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Subject} from 'rxjs';

@Injectable()
export class UserService {
    public user: Subject<any>;
    constructor(private af: AngularFire) {
        this.user = new Subject();
    }
    public getUserStatus () {
        return this.user;
    }
    public setUser (user: any) {
        localStorage.setItem("userName", user.userName);
        localStorage.setItem("email", user.email);
        localStorage.setItem("key", user.$key);
        delete user.password;
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user.$key);
        this.user.next(user.userName);
    }
    public clearUser () {
        localStorage.removeItem("userName");
        localStorage.removeItem("email");
        localStorage.removeItem("key");
        localStorage.removeItem("user");
        this.user.next('');
    }
    getUsers () {
        return this.af.database.list('/users');
    }
    updateUserDetails (details: any) {
        let key = localStorage.getItem("key");
        localStorage.setItem("userName", details.userName);
        this.af.database.list('/users').update(key, details);
    }
    getUserData () {
        return JSON.parse(localStorage.getItem("user"));
    }
}