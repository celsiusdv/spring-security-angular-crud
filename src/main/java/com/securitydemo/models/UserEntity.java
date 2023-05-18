package com.securitydemo.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;


@Table(name="users")
@Entity( name= "User")
public class UserEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;
    @Column(unique = true)
    private String username;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "users_and_roles",
            joinColumns = @JoinColumn(name = "user_id_junction",referencedColumnName = "user_id"),//reference to the userid on this table
            inverseJoinColumns = @JoinColumn(name = "role_id_junction",referencedColumnName = "role_id") )
    private Set<Role> authorities;

    @Transient
    private String token;//this declared variable will not be mapped to a column

    public UserEntity(){ this.authorities=new HashSet<>();}
    public UserEntity(String token){this.token=token;}
    public UserEntity(String username, String password, Set<Role>authorities){
        this.username=username;
        this.password=password;
        this.authorities=authorities;
    }

    public void setUsername(String username) {this.username = username;}
    public void setPassword(String password) {this.password = password;}
    public void setAuthorities(Set<Role> authorities) {this.authorities = authorities;}
    public void setToken(String token){this.token=token;}

    public Integer getUserId(){return userId;}
    @Override public String getUsername() {return username;}
    @Override public String getPassword() {return password;}
    @Override public Collection<? extends GrantedAuthority> getAuthorities() {return authorities;}


    @Override public boolean isAccountNonExpired() {return true;}
    @Override public boolean isAccountNonLocked() {return true;}
    @Override public boolean isCredentialsNonExpired() {return true;}
    @Override public boolean isEnabled() {return true;}

    public String getToken(){return this.token;}

    public String toString(){
        return "[username]: "+username+", roles: "+authorities;
    }
}
