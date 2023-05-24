package com.securitydemo.models;

import javax.persistence.*;
import java.util.List;

@Table(name = "tools")
@Entity
public class Tool {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tool_id")
    private Integer toolId;
    private String toolName;
    private Double price;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user",referencedColumnName="user_id", foreignKey = @ForeignKey(name = "fk_tools_user_id") )
    private UserEntity user;

    public Tool(){}
    public Tool(String toolName, Double price){
        this.toolName=toolName;
        this.price=price;
    }
    public Tool(String toolName, Double price, UserEntity user){
        this.toolName=toolName;
        this.price=price;
        this.user=user;
    }

    public void setToolName(String toolName){this.toolName=toolName;}
    public void setPrice(Double price){this.price=price;}
    public void setUser(UserEntity user){this.user=user;}

    public Integer getToolId(){ return this.toolId; }
    public String getToolName(){ return this.toolName; }
    public Double getPrice(){ return this.price; }
    public UserEntity getUser(){ return this.user; }

    public String toString() {
        return "Tool{" +
                "toolId=" + toolId +
                ", toolName='" + toolName + '\'' +
                ", price=" + price +
                ", added by username: "+user.getUsername()+
                '}';
    }

}
