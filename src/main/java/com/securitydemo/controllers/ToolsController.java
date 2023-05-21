package com.securitydemo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tool")
public class ToolsController {

    @GetMapping("/tools")
    public String showLevel(){
        return "User Access Level";
    }

}
