import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tool } from 'src/app/_models/tool';
import { ToolService } from 'src/app/services/tool.service';

@Component({
  selector: 'app-update-delete',
  templateUrl: './update-delete.component.html',
  styleUrls: ['./update-delete.component.css']
})
export class UpdateDeleteComponent {

   tableIndex:number;
   queryValue:number;
   action!:string;
   tool:Tool=new Tool();

   constructor(private route: ActivatedRoute,private toolService:ToolService,private goBack: Router) {
      /* value received from tools-management.component.html, update or delete button with [routerLink] */
      this.tableIndex = this.route.snapshot.params['index'];
      /* value received from tools-management.component.html, update or delete button with [queryParams] */
      this.queryValue = this.route.snapshot.queryParams['manage'];

      this.fillInputs();//fill the inputs through [(ngModel)] in update-delete.component.html
      this.switchButtonAction();
   }

   public modifyTool(): void {
      if (this.queryValue == 1) {//update tool
         this.toolService.updateTool(this.tool.toolId,this.tool)
            .subscribe({
               next: () => {
                  this.goBack.navigate(['/tools-management']);
               },
               error: (exception) => {
                  console.log("action not authenticated by the server");
                  console.log(exception);
                  this.goBack.navigate(['/tools-management']);
               }
            });

      }
      if (this.queryValue == 2) {
         this.toolService.deleteTool(this.tool.toolId)
            .subscribe({
               next:()=>{
                  this.goBack.navigate(['/tools-management']);
               },
               error: (exception) => {
                  console.log("action not authenticated by the server");
                  console.log(exception);
                  this.goBack.navigate(['/tools-management']);
               }
            });
      }
   }

   public fillInputs(): void {
      this.toolService.getToolList().subscribe(data => { this.tool = data[this.tableIndex]; } );
   }

   public switchButtonAction():void{
      if (this.queryValue == 1) {
         this.action = "update";
      } else if (this.queryValue == 2) {
         this.action = "delete";
      }
   }

}
