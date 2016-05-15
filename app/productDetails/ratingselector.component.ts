import {Component, EventEmitter, OnInit, Output} from "@angular/core";

@Component({
	selector: "rating-selector",
	template: `<div>
		<select #sel (change)="select.emit($event.target.value)">
			<option *ngFor="#rate of ratings">
				{{rate}}
			</option>
		</select>
	</div>`
})
export class RatingSelectorComponent implements OnInit {
	@Output() select = new EventEmitter();
	ratings = [1, 2, 3, 4, 5];

	constructor() {
		console.log("selector...");
	}

	ngOnInit() {
		this.select.emit(this.ratings[0]);
	}
}