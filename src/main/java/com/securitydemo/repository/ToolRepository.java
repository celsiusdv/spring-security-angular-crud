package com.securitydemo.repository;

import com.securitydemo.models.Tool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface ToolRepository extends JpaRepository<Tool,Integer> {


    @Transactional
    @Modifying
    @Query("DELETE FROM Tool t WHERE t.toolId=?1")
    void deleteToolById(Integer id);
}
