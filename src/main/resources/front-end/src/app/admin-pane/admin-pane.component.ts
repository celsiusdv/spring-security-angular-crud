import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-admin-pane',
  templateUrl: './admin-pane.component.html',
  styleUrls: ['./admin-pane.component.css']
})
export class AdminPaneComponent {
	users!:Array<any>;
	constructor(private admin: AdminService) {

		this.admin.getUsers().subscribe(
			data => {
				console.log(data);
				this.users=data;
			}
		);
	}
}
