package com.example.bujji.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bujji.Repository.ApplicationRepository;
import com.example.bujji.Repository.CandidateRepository;
import com.example.bujji.Repository.JobRepository;
import com.example.bujji.entity.Application;
import com.example.bujji.entity.Candidate;
import com.example.bujji.entity.Job;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private JobRepository jobRepository;

    // 🔹 Candidate applies for a job
    public Application apply(Long candidateId, Long jobId) {
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found with id: " + candidateId));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + jobId));

        Application application = new Application(candidate, job);
        return applicationRepository.save(application);
    }

    // 🔹 Get all candidates who applied for a job
    public List<Candidate> getApplicants(Long jobId) {
        return applicationRepository.findByJobId(jobId).stream().map(Application::getCandidate)
                .collect(Collectors.toList());
    }

    // 🔹 Get all jobs a candidate has applied to
    public List<Job> getJobsApplied(Long candidateId) {
        return applicationRepository.findByCandidateId(candidateId)
                .stream()
                .map(Application::getJob)
                .collect(Collectors.toList());
    }
}
