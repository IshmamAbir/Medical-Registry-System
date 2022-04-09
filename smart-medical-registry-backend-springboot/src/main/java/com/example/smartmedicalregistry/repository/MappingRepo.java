package com.example.smartmedicalregistry.repository;

import com.example.smartmedicalregistry.entity.Mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MappingRepo extends JpaRepository<Mapping,Long> {
    @Query
    Mapping findByDoctor(String username);

    @Query
    Mapping findByCompounder(String username);
}
