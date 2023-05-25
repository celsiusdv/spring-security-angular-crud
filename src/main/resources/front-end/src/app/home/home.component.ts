import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { BehaviorSubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { Tool } from '../_models/tool';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loginStatus!:BehaviorSubject<boolean>;
  exportToolList:MatTableDataSource<any>;//variable to set in child component in tool-list.component.html for table values
  toolsForm:FormGroup;
  tool!:Tool;
  constructor(private auth:AuthenticationService, private toolService:ToolService){
    this.loginStatus=this.auth.loginStatus;//show ccomponents and child components according to login status in the home.component.html
    this.exportToolList=new MatTableDataSource()
    this.toolsForm=new FormGroup({
                                  toolName:new FormControl(null,null),
                                  price:new FormControl(null,null)
    });
    
    this.toolService.getToolList().subscribe({
      next: (toolList)=>{
        console.log(toolList);
      },
      error:(exc)=>{
        console.log(exc);
      }
    });
  }

  public get formControls(){//controls name from inputs to use in validations in home.component.html
    return this.toolsForm.controls;
  }
  public saveTool():void{
    this.tool=this.toolsForm.value;
    this.tool.user=this.auth.getUser;
    console.log(this.tool);
    //to do: import tool-list.service and create a tool to save in the database
  }
}
