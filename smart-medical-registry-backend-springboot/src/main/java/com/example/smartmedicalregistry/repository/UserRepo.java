package com.example.smartmedicalregistry.repository;

import com.example.smartmedicalregistry.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    @EntityGraph(attributePaths = "roleList")
    User findByUsername(String username);
}

