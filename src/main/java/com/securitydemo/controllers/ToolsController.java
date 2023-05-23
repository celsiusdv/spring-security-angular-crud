package com.securitydemo.controllers;

import com.securitydemo.models.Tool;
import com.securitydemo.services.ToolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tool-management")
public class ToolsController {
    @Autowired
    private ToolService toolService;

    public String showLevel(){
        return "User Access Level";
    }

    @PostMapping("/tool")
    public ResponseEntity<Tool> createTool(@RequestBody Tool tool){
        if(toolService.isToolSaved(tool) == true){
            return new ResponseEntity<>(tool, HttpStatus.OK);
        }else {
            tool.setToolName("nothing to save, wrong description");
            return new ResponseEntity<>(tool,HttpStatus.ACCEPTED);
        }
    }

    @GetMapping("/tools")
    public ResponseEntity<List<Tool>> getTools(){
        List<Tool> tools=toolService.getAllTools();
        if(tools.size() > 0){
            return new ResponseEntity<>(tools,HttpStatus.OK);
        }else return new ResponseEntity<>(null,HttpStatus.OK);
    }

    @GetMapping("/tools/{id}")
    public ResponseEntity<Tool>getToolById(@PathVariable("id") Integer id){
        Tool tool=toolService.getTool(id);
        if(tool != null){
            return new ResponseEntity<>(tool,HttpStatus.OK);
        } else return new ResponseEntity<>(
                new Tool("tool not found", 0.0),HttpStatus.NOT_FOUND);
    }

    @PutMapping("/tool/{id}")
    public ResponseEntity<Tool>updateTool(@PathVariable("id") Integer id,
                                          @RequestBody Tool updatedTool){
        if(toolService.isToolUpdated(id,updatedTool) == true){
            return new ResponseEntity<>(updatedTool,HttpStatus.OK);
        }else return new ResponseEntity<>(
                new Tool("no tool found for update",0.0),HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/tool/{id}")
    public ResponseEntity<String> deleteTool(@PathVariable("id") Integer id){
        if(this.toolService.isDeleted(id)==true){
            return new ResponseEntity<>("tool deleted successfully!!",HttpStatus.OK);
        }else return  new ResponseEntity<>("no tool found for deletion",HttpStatus.NOT_FOUND);
    }
}
