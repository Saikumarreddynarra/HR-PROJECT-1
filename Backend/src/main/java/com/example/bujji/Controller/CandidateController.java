package com.example.bujji.Controller;

import java.util.List;

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

import com.example.bujji.Service.CandidateService;
import com.example.bujji.entity.Candidate;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/candidates")
@CrossOrigin(origins = "http://localhost:3000")
public class CandidateController {

    private final CandidateService service;

    public CandidateController(CandidateService service) {
        this.service = service;
    }

    private boolean hasAccess(HttpServletRequest request) {
        String role = request.getHeader("User-Role");
        return "ADMIN".equals(role) || "HIRING_MANAGER".equals(role);
    }

    @GetMapping
    public List<Candidate> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Candidate> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Candidate c, HttpServletRequest request) {
        if(!hasAccess(request)) return ResponseEntity.status(403).body("Forbidden");
        return ResponseEntity.ok(service.add(c));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Candidate c, HttpServletRequest request) {
        if(!hasAccess(request)) return ResponseEntity.status(403).body("Forbidden");
        return ResponseEntity.ok(service.update(id, c));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, HttpServletRequest request) {
        if(!hasAccess(request)) return ResponseEntity.status(403).body("Forbidden");
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
