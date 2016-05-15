import {Component, OnInit}  from '@angular/core';
import {UserService} from '../user/user.service.ts';
import {User} from '../user/user.ts';

let profileTemplate = require('./profile.template.html');
let styles = require('./profile.scss');
let loginStyles = require('../login/login.scss');


declare let c3: any;
@Component({
	selector: 'profile',
	template: profileTemplate,
	styles: ['' + styles + loginStyles]
})
export class ProfileComponent extends User implements OnInit {

	public chart: any;
	usefulReviews: any = 91.4;
	totalReviews: any = 100;

	profileModel: any = {
		email: '',
		userName: '',
		twitter: '',
		youtube: ''
	};
	constructor(private userService: UserService) {
		super(userService);
		this.profileModel = this.userService.getUserData();
    }
	ngOnInit() {
		this.chart = c3.generate({
			bindto: document.querySelector('.chart'),
			data: {
				columns: [
					['Useful Reviews', this.usefulReviews]
				],
				type: 'gauge'
			},
			gauge: {

			},
			color: {
				pattern: ['#60B044'],
				threshold: {
					values: [this.totalReviews]
				}
			},
			size: {
				height: 180
			}
		});
	}
	updateUserDetails () {
		this.userService.updateUserDetails(this.profileModel);
	}
}