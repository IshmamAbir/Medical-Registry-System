package com.example.smartmedicalregistry.repository;

import com.example.smartmedicalregistry.entity.PatientTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientTestRepo extends JpaRepository<PatientTest, Long> {
    @Query
    List<PatientTest> findAllByPatientIdAndStatus(String patientId, String status);

    @Query
    List<PatientTest> findAllByStatus(String status);
}
