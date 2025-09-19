package com.example.bujji.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bujji.entity.Application;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    // Get all applications for a specific job
    List<Application> findByJobId(Long jobId);

    // Get all applications for a specific candidate
    List<Application> findByCandidateId(Long candidateId);
}
