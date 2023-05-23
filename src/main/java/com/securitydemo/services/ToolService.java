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
            log.warn("saved tool: "+tool);
            toolRepository.save(tool);
            return true;
        }else if (!tool.getToolName().equals("") && tool.getPrice() <= 0){
            log.error("empty price");
            return false;
        }else if(tool.getToolName().equals("") && tool.getPrice() > 0){
            log.error("empty tool name");
            return false;
        }else{
            log.error("empty description");
            return false;
        }
    }

    public List<Tool> getAllTools(){return toolRepository.findAll();}

    public Tool getTool(Integer toolId){
        Optional<Tool> tool=toolRepository.findById(toolId);
        if(tool.isPresent()){
            return tool.get();
        }
        return null;
    }

    public Tool updateTool(Integer toolId,Tool tool){
        Optional<Tool>toolReference=toolRepository.findById(toolId);
        if(toolReference.isPresent()){
            Tool toolToUpdate=toolReference.get();
            toolToUpdate.setToolName(tool.getToolName());
            toolToUpdate.setPrice(tool.getPrice());
            return toolRepository.save(toolToUpdate);
        }
        return null;
    }

    public boolean deleteTool(Integer toolId){
        try{
            Optional<Tool> tool=toolRepository.findById(toolId);
            if(tool.isPresent()){
                toolRepository.deleteToolById(toolId);
            }
        }catch (NoSuchElementException e) {
            log.error("tool not found, therefore can't be deleted");
            return false;
        }
        return true;
    }

}
