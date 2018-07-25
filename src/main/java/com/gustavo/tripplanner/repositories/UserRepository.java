package com.gustavo.tripplanner.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gustavo.tripplanner.models.User;

@Repository
public interface UserRepository extends CrudRepository<User,Long> {
	List<User>findAll();
	User findByEmail(String email);
	List<User> findAllByFirstNameContains(String firstName);
	List<User> findAllByLastNameContains(String lastName);
	List<User> findAllByEmailContains(String email);
	
	List<User> findDistinctByFirstNameContainsOrLastNameContains(String firstName, String lastName);
}
