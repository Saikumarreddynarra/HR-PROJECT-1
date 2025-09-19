package com.example.bujji.Controller;

import com.example.bujji.Service.JobService;
import com.example.bujji.entity.Job;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:3000")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    private boolean isAdminOrRecruiter(HttpServletRequest request) {
        String role = (String) request.getAttribute("role");
        return "ADMIN".equals(role) || "RECRUITER".equals(role);
    }

    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        return jobService.getJobById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createJob(@RequestBody Job job, HttpServletRequest request) {
        if(!isAdminOrRecruiter(request)) return ResponseEntity.status(403).body("Forbidden");
        return ResponseEntity.ok(jobService.createJob(job));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateJob(@PathVariable Long id, @RequestBody Job updatedJob, HttpServletRequest request) {
        if(!isAdminOrRecruiter(request)) return ResponseEntity.status(403).body("Forbidden");
        return jobService.updateJob(id, updatedJob)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Long id, HttpServletRequest request) {
        if(!isAdminOrRecruiter(request)) return ResponseEntity.status(403).body("Forbidden");
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }
}
