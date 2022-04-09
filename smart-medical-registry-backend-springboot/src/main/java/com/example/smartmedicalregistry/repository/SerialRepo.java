package com.example.smartmedicalregistry.repository;

import com.example.smartmedicalregistry.entity.Serial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SerialRepo extends JpaRepository<Serial,Long> {
    @Query
    List<Serial> findAllByCompounderAndDate(String username,String date);

    @Query
    List<Serial> findAllByDoctorAndDate(String username,String date);
}
