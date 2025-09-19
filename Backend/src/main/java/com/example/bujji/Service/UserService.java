package com.example.bujji.Service;

import com.example.bujji.Repository.UserRepository;
import com.example.bujji.entity.User;
import com.example.bujji.entity.User.Role;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder(); // for hashing passwords
    }

    // ✅ Register new user
    public User register(User user) {
        // hash password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // default role if not provided
        if(user.getRole() == null) user.setRole(Role.HIRING_MANAGER);
        return userRepository.save(user);
    }

    // ✅ Login: returns Optional<User> if credentials match
    public Optional<User> login(String email, String rawPassword) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if(userOpt.isPresent()) {
            User user = userOpt.get();
            if(passwordEncoder.matches(rawPassword, user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

    // ✅ Find user by ID
    public Optional<User> getById(Long id) {
        return userRepository.findById(id);
    }

}

