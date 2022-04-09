package com.example.smartmedicalregistry.repository;

import com.example.smartmedicalregistry.entity.BkashMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BkashMappingRepo extends JpaRepository<BkashMapping, Long> {
    @Query
    BkashMapping findByPatientId(String patientId);

    @Query
    boolean existsByPatientId(String patientId);
}
