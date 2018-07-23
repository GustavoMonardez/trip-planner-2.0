package com.gustavo.tripplanner.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gustavo.tripplanner.models.Agenda;

@Repository
public interface AgendaRepository extends CrudRepository<Agenda,Long>{
	List<Agenda>findAll();
}
