package com.securitydemo.services;

import com.securitydemo.models.Tool;
import com.securitydemo.repository.ToolRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

/*this service can be used by any user with ADMIN or USER role*/
@Slf4j
@Service
public class ToolService {

    @Autowired
    private ToolRepository toolRepository;

    public boolean isToolSaved(Tool tool){
//TODO CATCH IF BODY EXISTS BUT IS COMPLETELY EMPTY: java.lang.NullPointerException: Cannot invoke "String.equals(Object)" because the return value of "com.securitydemo.models.Tool.getToolName()" is null
        if( !tool.getToolName().equals("") && tool.getPrice() > 0){
            log.info("saved tool: "+tool);
            toolRepository.save(tool);
            return true;
        }else if (!tool.getToolName().equals("") && tool.getPrice() <= 0){
            log.warn("empty price");
            return false;
        }else if(tool.getToolName().equals("") && tool.getPrice() > 0){
            log.warn("empty tool name");
            return false;
        }else{
            log.warn("empty description");
            return false;
        }
    }

    public List<Tool> getAllTools(){
        return toolRepository.findAll();
    }

    public Tool getTool(Integer toolId){
//TODO CATCH IF ELEMENT DOESN'T EXIST java.util.NoSuchElementException: No value present
        Optional<Tool> tool=toolRepository.findById(toolId);
        if(tool.isPresent()){
            log.info("tool found!!: "+tool.get());
            return tool.get();
        }
        log.warn("tool not found!!: ");
        return null;
    }

    public boolean isToolUpdated(Integer toolId,Tool tool){
//TODO CATCH IF ELEMENT DOESN'T EXIST java.util.NoSuchElementException: No value present
        Optional<Tool>toolReference=toolRepository.findById(toolId);
        if(toolReference.isPresent()){
            Tool toolToUpdate=toolReference.get();
            log.warn("tool to update: "+toolToUpdate);

            toolToUpdate.setToolName(tool.getToolName());
            toolToUpdate.setPrice(tool.getPrice());

            log.info("updated tool: "+toolToUpdate);
            toolRepository.save(toolToUpdate);
            return true;
        }
        return false;
    }

    public boolean isDeleted(Integer toolId){
        Optional<Tool> tool=toolRepository.findById(toolId);
        if(tool.isPresent()){
            toolRepository.deleteToolById(toolId);
            log.warn("tool deleted from repository: "+tool.get());
            return true;
        }else{
            log.error("no tool found for deletion: "+null);
            return false;
        }
    }
}
