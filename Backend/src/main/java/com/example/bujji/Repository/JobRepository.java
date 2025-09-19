package com.example.bujji.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bujji.entity.Job;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    // You already get CRUD for free: save, findById, findAll, deleteById, etc.

    // Example: custom query (if needed)
    // List<Job> findByTitleContainingIgnoreCase(String keyword);
}
