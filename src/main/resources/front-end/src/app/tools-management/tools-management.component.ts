import { Component } from '@angular/core';
import { Tool } from '../_models/tool';
import { MatTableDataSource } from '@angular/material/table';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-tools-management',
  templateUrl: './tools-management.component.html',
  styleUrls: ['./tools-management.component.css']
})
export class ToolsManagementComponent {
   displayedColumns: string[] = ['position', 'id', 'name', 'price', 'user', 'manage'];
   dataSource: MatTableDataSource<Tool>;

   constructor(private toolList: ToolService) {
      this.dataSource = new MatTableDataSource();
      this.toolList.getToolList().subscribe(data => {
         this.dataSource.data = data;
      });
   }

}
