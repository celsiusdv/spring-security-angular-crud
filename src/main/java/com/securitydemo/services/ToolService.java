package com.securitydemo.services;

import com.securitydemo.models.Tool;
import com.securitydemo.repository.ToolRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/*this service can be used by any user with ADMIN or USER role*/
@Slf4j
@Service
public class ToolService {

    @Autowired
    private ToolRepository toolRepository;

    public boolean isToolSaved(Tool tool){
        try{
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
        }catch (NullPointerException e){
            log.error("JSON body is empty, missing 'key':value pair");
            return false;
        }
    }

    public List<Tool> getAllTools(){
        log.info("getting all tools");
        return toolRepository.findAll();
    }

    public Tool getTool(Integer toolId){
        Optional<Tool> tool=toolRepository.findById(toolId);
        if(tool.isPresent()){
            log.info("tool found: "+tool.get());
            return tool.get();
        }
        log.warn("tool not found");
        return null;
    }

    public boolean isToolUpdated(Integer toolId,Tool tool){
        Optional<Tool>toolReference=toolRepository.findById(toolId);
        if(toolReference.isPresent()){
            Tool toolToUpdate=toolReference.get();
            log.warn("tool to update: "+toolToUpdate);

            toolToUpdate.setToolName(tool.getToolName());
            toolToUpdate.setPrice(tool.getPrice());

            log.info("updated tool: "+toolToUpdate);
            toolRepository.save(toolToUpdate);
            return true;
        }else {
            log.warn("tool with id:"+toolId+ " not found found for updates");
            return false;
        }
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
