package com.example.social.repo;

import com.example.social.domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDetailsRepo extends JpaRepository<User, String> {
    @EntityGraph(attributePaths = {"subscriptions", "subscribers"})
    Optional<User> findById (String s);
    @EntityGraph(attributePaths = {"subscriptions", "subscribers"})
    Optional<User> findByEmail(String email);
}
