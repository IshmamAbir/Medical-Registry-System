package com.example.smartmedicalregistry.repository;

import com.example.smartmedicalregistry.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TestRepo extends JpaRepository<Test,Long> {
    @Query
    Test findByTestName(String testName);
}
