import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { BehaviorSubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tool } from '../_models/tool';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    loginStatus!: BehaviorSubject<boolean>;
    exportToolList: MatTableDataSource<any>;//variable to set in child component in tool-list.component.html for table values
    toolsForm: FormGroup;
    tool!: Tool;
    constructor(private auth: AuthenticationService, private toolService: ToolService) {
        this.loginStatus = this.auth.loginStatus;//show components and child components according to login status in the home.component.html
        this.exportToolList = new MatTableDataSource();//initialize the table to export data in the child template
        this.toolsForm = new FormGroup({
            toolName: new FormControl(null,[Validators.required,Validators.minLength(2)]),
            price: new FormControl(null,[Validators.required,Validators.minLength(1)])
        });
        this.loadToolTable();
    }

    public get formControls() {//controls name from inputs to use in validations in home.component.html
        return this.toolsForm.controls;
    }
    public saveTool(): void {
        this.tool = this.toolsForm.value;
        //get user from authentication, to set in the tool class and save it for the relationship in the DB
        this.tool.user = this.auth.getUser;
        this.toolService.saveTool(this.tool).subscribe(() => this.loadToolTable());//update the table after adding tool
        console.log(this.tool);
    }
    public loadToolTable(): void {
        this.toolService.getToolList().subscribe({
            next: (toolList) => {
                this.exportToolList.data = toolList;
            },
            error: (exc) => {
                console.log(exc);
            }
        });
    }
}
