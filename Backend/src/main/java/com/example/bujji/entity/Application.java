package com.example.bujji.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Candidate side
    @ManyToOne
    @JoinColumn(name = "candidate_id", nullable = false)
    @JsonBackReference  // prevents infinite JSON loop (Candidate → Applications → Candidate)
    private Candidate candidate;

    // Job side
    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    @JsonBackReference  // prevents infinite JSON loop (Job → Applications → Job)
    private Job job;

    // ✅ Constructors
    public Application() {}

    public Application(Candidate candidate, Job job) {
        this.candidate = candidate;
        this.job = job;
    }

    // ✅ Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Candidate getCandidate() { return candidate; }
    public void setCandidate(Candidate candidate) { this.candidate = candidate; }

    public Job getJob() { return job; }
    public void setJob(Job job) { this.job = job; }
}

