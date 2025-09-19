package com.example.bujji.Service;

import com.example.bujji.*;
import com.example.bujji.Repository.CandidateRepository;
import com.example.bujji.entity.Candidate;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CandidateService {
    private final CandidateRepository repo;

    public CandidateService(CandidateRepository repo) {
        this.repo = repo;
    }

    public List<Candidate> getAll() { return repo.findAll(); }

    public Optional<Candidate> getById(Long id) { return repo.findById(id); }

    public Candidate add(Candidate c) { return repo.save(c); }

    public Candidate update(Long id, Candidate c) {
        return repo.findById(id).map(existing -> {
                    existing.setName(c.getName());
                    existing.setEmail(c.getEmail());
                    existing.setPhoneNumber(c.getPhoneNumber());
                    existing.setCurrentStatus(c.getCurrentStatus());
                    existing.setResumeLink(c.getResumeLink());
                    return repo.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Candidate not found"));
    }

    public void delete(Long id) { repo.deleteById(id); }
}

