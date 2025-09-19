package com.example.bujji.Controller;

import com.example.bujji.Service.ApplicationService;
import com.example.bujji.entity.Application;
import com.example.bujji.entity.Candidate;
import com.example.bujji.entity.Job;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    private boolean isAdminOrHiringManager(HttpServletRequest request) {
        String role = (String) request.getAttribute("role");
        return "ADMIN".equals(role) || "HIRING_MANAGER".equals(role);
    }

    // Candidate applies for a job
    @PostMapping("/apply")
    public ResponseEntity<Application> applyForJob(@RequestParam Long candidateId, @RequestParam Long jobId) {
        Application application = applicationService.apply(candidateId, jobId);
        return ResponseEntity.ok(application);
    }

    // Get all candidates for a job
    @GetMapping("/job/{jobId}/candidates")
    public ResponseEntity<?> getApplicants(@PathVariable Long jobId, HttpServletRequest request) {
        if(!isAdminOrHiringManager(request)) return ResponseEntity.status(403).body("Forbidden");
        List<Candidate> candidates = applicationService.getApplicants(jobId);
        return ResponseEntity.ok(candidates);
    }

    // Get all jobs a candidate applied to
    @GetMapping("/candidate/{candidateId}/jobs")
    public List<Job> getJobsApplied(@PathVariable Long candidateId) {
        return applicationService.getJobsApplied(candidateId);
    }
}
