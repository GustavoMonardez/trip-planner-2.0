package com.gustavo.tripplanner.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.gustavo.tripplanner.models.Agenda;
import com.gustavo.tripplanner.models.Trip;
import com.gustavo.tripplanner.repositories.AgendaRepository;
import com.gustavo.tripplanner.repositories.TripRepository;

@Service
public class TripService {
	private final TripRepository tripRepository;
	private final UserService userService;
	private final AgendaRepository agendaRepo;

	public TripService(TripRepository tripRepository, UserService userService, AgendaRepository agendaRepo) {
		this.tripRepository = tripRepository;
		this.userService = userService;
		this.agendaRepo = agendaRepo;
	}
	//create
	public Trip createTrip(Trip trip, Long hostId) {
		trip.getAdmins().add(userService.findUserById(hostId));
		Trip savedTrip = tripRepository.save(trip);
		Agenda defaultAgenda = new Agenda();
		defaultAgenda.setTrip(savedTrip);
		defaultAgenda.setDay(1);
		agendaRepo.save(defaultAgenda);
		return savedTrip;
	}
	//read
	public Trip findTripById(Long id) {
		Optional<Trip>trip = tripRepository.findById(id);
		if(trip.isPresent()) return trip.get();
		else return null;
	}
	//update
	public Trip updateTrip(Trip trip) {
		return tripRepository.save(trip);
	}
	//delete
	public void deleteTripById(Long id) {
		tripRepository.deleteById(id);
	}
	//find all
	public List<Trip>findAllTrips(){
		return tripRepository.findAll();
	}
}
