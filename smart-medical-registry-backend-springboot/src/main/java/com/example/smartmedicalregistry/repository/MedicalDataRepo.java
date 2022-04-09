package com.example.smartmedicalregistry.repository;

import com.example.smartmedicalregistry.entity.MedicalData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalDataRepo extends JpaRepository<MedicalData,Long> {
    @Query
    List<MedicalData> findAllByPatientIdAndType(String username,String type);
}
