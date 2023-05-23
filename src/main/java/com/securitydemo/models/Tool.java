package com.securitydemo.models;

import javax.persistence.*;

@Table(name = "tools")
@Entity
public class Tool {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tool_id")
    private Integer toolId;
    private String toolName;
    private Double price;

    public Tool(){}
    public Tool(String toolName, Double price){
        this.toolName=toolName;
        this.price=price;
    }

    public void setToolName(String toolName){this.toolName=toolName;}
    public void setPrice(Double price){this.price=price;}

    public Integer getToolId(){ return this.toolId; }
    public String getToolName(){ return this.toolName; }
    public Double getPrice(){ return this.price; }

    public String toString() {
        return "Tool{" +
                "toolId=" + toolId +
                ", toolName='" + toolName + '\'' +
                ", price=" + price +
                '}';
    }

}
