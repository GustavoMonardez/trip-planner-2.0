package com.gustavo.tripplanner.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.gustavo.tripplanner.models.Agenda;
import com.gustavo.tripplanner.repositories.AgendaRepository;

@Service
public class AgendaService {
	private final AgendaRepository agendaRepo;
	
	public AgendaService(AgendaRepository agendaRepo) {
		this.agendaRepo = agendaRepo;
	}
	//create
	public Agenda createAgenda(Agenda agenda) {
		return agendaRepo.save(agenda);
	}
	//read
	public Agenda findAgendaById(Long id) {
		Optional<Agenda>agenda = agendaRepo.findById(id);
		if(agenda.isPresent())return agenda.get();
		else return null;
	}
	//update
	public Agenda updateAgenda(Agenda agenda) {
		return agendaRepo.save(agenda);
	}
	//delete
	public void deleteAgendaById(Long id) {
		agendaRepo.deleteById(id);
	}
	//find all
	public List<Agenda>findAllAgendas(){
		return agendaRepo.findAll();
	}
}
