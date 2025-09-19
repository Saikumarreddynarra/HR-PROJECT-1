package com.example.bujji.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.bujji.entity.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
