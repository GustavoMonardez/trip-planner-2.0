package com.gustavo.tripplanner.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gustavo.tripplanner.models.Activity;

@Repository
public interface ActivityRepository extends CrudRepository<Activity,Long>{
	List<Activity>findAll();
}
