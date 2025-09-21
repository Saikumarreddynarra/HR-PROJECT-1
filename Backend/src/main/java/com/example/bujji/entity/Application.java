package com.example.bujji.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Candidate side
    @ManyToOne
    @JoinColumn(name = "candidate_id", nullable = false)
    @JsonBackReference
    private Candidate candidate;

    // Job side
    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    @JsonBackReference
    private Job job;

    @Column(nullable = false)
    private LocalDateTime applicationDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    public enum ApplicationStatus {
        PENDING,
        UNDER_REVIEW,
        ACCEPTED,
        REJECTED
    }

    // Constructors
    public Application() {
        this.applicationDate = LocalDateTime.now();
        this.status = ApplicationStatus.PENDING;
    }

    public Application(Candidate candidate, Job job) {
        this();
        this.candidate = candidate;
        this.job = job;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Candidate getCandidate() { return candidate; }
    public void setCandidate(Candidate candidate) { this.candidate = candidate; }

    public Job getJob() { return job; }
    public void setJob(Job job) { this.job = job; }

    public LocalDateTime getApplicationDate() { return applicationDate; }
    public void setApplicationDate(LocalDateTime applicationDate) { this.applicationDate = applicationDate; }

    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }
}

