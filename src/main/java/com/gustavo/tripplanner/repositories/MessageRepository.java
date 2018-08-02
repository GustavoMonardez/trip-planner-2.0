package com.gustavo.tripplanner.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gustavo.tripplanner.models.Message;

@Repository
public interface MessageRepository extends CrudRepository<Message, Long>{
	
}
