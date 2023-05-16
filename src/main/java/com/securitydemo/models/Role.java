package com.securitydemo.models;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Table(name = "roles")
@Entity(name="Role")
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Integer roleId;
    private String authority;

    public Role(){}
    public Role(String authority){this.authority=authority;}

    public Integer getRoleId(){return roleId;}
    @Override
    public String getAuthority() {return authority;}

    public String toString(){
        return authority;
    }
}
