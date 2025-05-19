package com.microservice.user.microservice_user.repository;

import com.microservice.user.microservice_user.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, String> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUserName(String username);

    boolean existsByEmail(String email);
}
