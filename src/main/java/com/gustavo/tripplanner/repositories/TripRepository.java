package com.gustavo.tripplanner.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gustavo.tripplanner.models.Trip;

@Repository
public interface TripRepository extends CrudRepository<Trip,Long> {
	List<Trip>findAll();
}
