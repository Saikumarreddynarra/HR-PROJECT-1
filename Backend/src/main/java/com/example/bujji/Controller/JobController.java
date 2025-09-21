package com.example.bujji.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bujji.Service.JobService;
import com.example.bujji.entity.Job;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class JobController {
    private final JobService jobService;

    @Autowired
    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    private String getUserRole(HttpServletRequest request) {
        return (String) request.getSession().getAttribute("role");
    }

    private Long getUserId(HttpServletRequest request) {
        return (Long) request.getSession().getAttribute("userId");
    }

    private boolean hasPermission(String role) {
        return role != null && ("ADMIN".equals(role) || "RECRUITER".equals(role));
    }

    private boolean canModifyJob(Job job, String userRole, Long userId) {
        if ("ADMIN".equals(userRole)) return true;
        return "RECRUITER".equals(userRole) && job.getRecruiterId().equals(userId);
    }

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs(HttpServletRequest request) {
        String userRole = getUserRole(request);
        if (userRole == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id, HttpServletRequest request) {
        String userRole = getUserRole(request);
        if (userRole == null) {
            return ResponseEntity.status(401).build();
        }
        return jobService.getJobById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createJob(@RequestBody Job job, HttpServletRequest request) {
        String role = getUserRole(request);
        Long userId = getUserId(request);

        if (role == null) {
            return ResponseEntity.status(401).build();
        }

        if (!hasPermission(role)) {
            return ResponseEntity.status(403).body("Only Admins and Recruiters can create jobs");
        }

        job.setRecruiterId(userId);
        return ResponseEntity.ok(jobService.createJob(job));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateJob(@PathVariable Long id, @RequestBody Job job, HttpServletRequest request) {
        String role = getUserRole(request);
        Long userId = getUserId(request);

        if (role == null) {
            return ResponseEntity.status(401).build();
        }

        if (!hasPermission(role)) {
            return ResponseEntity.status(403).body("Only Admins and Recruiters can update jobs");
        }

        Job existingJob = jobService.getJobById(id).orElse(null);
        if (existingJob == null) {
            return ResponseEntity.notFound().build();
        }

        if (!canModifyJob(existingJob, role, userId)) {
            return ResponseEntity.status(403).body("You can only update your own job postings");
        }

        job.setId(id);
        if ("RECRUITER".equals(role)) {
            job.setRecruiterId(userId);
        } else if ("ADMIN".equals(role)) {
            job.setRecruiterId(existingJob.getRecruiterId());
        }

        return jobService.updateJob(id, job)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Long id, HttpServletRequest request) {
        String role = getUserRole(request);
        Long userId = getUserId(request);

        if (role == null) {
            return ResponseEntity.status(401).build();
        }

        if (!hasPermission(role)) {
            return ResponseEntity.status(403).body("Only Admins and Recruiters can delete jobs");
        }

        Job job = jobService.getJobById(id).orElse(null);
        if (job == null) {
            return ResponseEntity.notFound().build();
        }

        if (!canModifyJob(job, role, userId)) {
            return ResponseEntity.status(403).body("You can only delete your own job postings");
        }

        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/apply")
    public ResponseEntity<?> applyForJob(@PathVariable Long id, HttpServletRequest request) {
        String role = getUserRole(request);
        if (role == null) {
            return ResponseEntity.status(401).build();
        }

        if (!"CANDIDATE".equals(role)) {
            return ResponseEntity.status(403).body("Only candidates can apply for jobs");
        }

        Job job = jobService.getJobById(id).orElse(null);
        if (job == null) {
            return ResponseEntity.notFound().build();
        }

        // Create application logic would go here
        return ResponseEntity.ok().build();
    }
}
