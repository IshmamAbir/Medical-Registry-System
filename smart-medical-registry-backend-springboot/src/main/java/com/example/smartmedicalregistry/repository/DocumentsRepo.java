package com.example.smartmedicalregistry.repository;

import com.example.smartmedicalregistry.entity.Documents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentsRepo extends JpaRepository<Documents,Long> {
    @Query
    List<Documents> findAllByPatientId(String patientId);

    @Query
    List<Documents> findAllByPatientIdAndType(String patientId,String type);
}
