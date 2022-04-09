package com.example.smartmedicalregistry.repository;

import com.example.smartmedicalregistry.entity.Bkash;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BkashRepo extends JpaRepository<Bkash,Long> {
    @Query
    Bkash findByMobileNoAndPin(String mobile,String pin);
}
