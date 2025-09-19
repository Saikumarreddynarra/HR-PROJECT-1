package com.example.bujji.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bujji.Repository.JobRepository;
import com.example.bujji.entity.Job;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    // Get all jobs
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // Get a single job by ID
    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    // Create a new job
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    // Update existing job
    public Optional<Job> updateJob(Long id, Job updatedJob) {
        return jobRepository.findById(id).map(existing -> {
            existing.setTitle(updatedJob.getTitle());
            existing.setDescription(updatedJob.getDescription());
            existing.setRequiredSkills(updatedJob.getRequiredSkills());
            existing.setRecruiterId(updatedJob.getRecruiterId());
            return jobRepository.save(existing);
        });
    }

    // Delete a job
    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}
