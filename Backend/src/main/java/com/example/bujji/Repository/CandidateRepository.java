package com.example.bujji.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bujji.entity.Candidate;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {}

