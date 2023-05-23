package com.securitydemo.controllers;

import com.securitydemo.models.Tool;
import com.securitydemo.services.ToolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
