package com.securitydemo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;


@Table(name="users",uniqueConstraints = {
        @UniqueConstraint(name="uq_users_username", columnNames = {"username"} )
})
@Entity( name= "User")
public class UserEntity implements UserDetails {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;
    private String username;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
                                        //configuring CascadeType to delete row from table users_and_roles first, to avoid conflict with "users" table
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinTable(name = "users_and_roles",
            joinColumns =
                        @JoinColumn(name = "user_id_junction",referencedColumnName = "user_id",
                                                                                    foreignKey = @ForeignKey(name = "fk_users_user_id") ),
            inverseJoinColumns =
                        @JoinColumn(name = "role_id_junction",referencedColumnName = "role_id",
                                                                                    foreignKey = @ForeignKey(name = "fk_roles_role_id")) )
    private Set<Role> authorities;

    @Transient//annotation to avoid variable declaration being mapped to a table
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

    @Override
    @JsonIgnore
    public String getPassword() {return password;}
    @Override public Collection<? extends GrantedAuthority> getAuthorities() {return authorities;}


    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {return true;}
    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {return true;}
    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {return true;}
    @Override
    @JsonIgnore
    public boolean isEnabled() {return true;}

    public String getToken(){return this.token;}

    public String toString(){
        return "[username]: "+username+", roles: "+authorities;
    }
}
