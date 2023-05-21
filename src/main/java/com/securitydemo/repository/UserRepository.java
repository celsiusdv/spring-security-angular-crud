package com.securitydemo.repository;

import com.securitydemo.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

/**
 * For better performance on a User deletion that contains @ManyToMany relationship with another table,
 * we will call a stored procedure from the specified database, if there is no need to use
 * stored procedures for deletion, use this annotation value instead:
 * cascade = {CascadeType.MERGE, CascadeType.PERSIST,CascadeType.REFRESH} inside the @ManyToMany parameter.
 */
@Repository
public interface UserRepository extends JpaRepository<UserEntity,Integer> {
    Optional<UserEntity> findByUsername(String username);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "call delete_user_by_id(:user_id)")
    void deleteUserById(@Param("user_id") Integer userId);

}
