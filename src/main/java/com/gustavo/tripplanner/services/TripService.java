package com.gustavo.tripplanner.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.gustavo.tripplanner.models.Agenda;
import com.gustavo.tripplanner.models.Trip;
import com.gustavo.tripplanner.models.User;
import com.gustavo.tripplanner.repositories.AgendaRepository;
import com.gustavo.tripplanner.repositories.TripRepository;
import com.gustavo.tripplanner.repositories.UserRepository;

@Service
public class TripService {
	private final TripRepository tripRepository;
	private final UserService userService;
	private final AgendaRepository agendaRepo;
	private final UserRepository userRepo;

	public TripService(TripRepository tripRepository, UserService userService, AgendaRepository agendaRepo,
			UserRepository userRepo) {
		this.tripRepository = tripRepository;
		this.userService = userService;
		this.agendaRepo = agendaRepo;
		this.userRepo = userRepo;
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
	
	public Trip inviteUser(Long userId, Long tripId) {
		Trip trip = findTripById(tripId);
		User user = userService.findUserById(userId);
		if(!trip.getInvitees().contains(user) && !trip.getAdmins().contains(user) && !trip.getGuests().contains(user)) {
			trip.getInvitees().add(user);			
		}
		return tripRepository.save(trip);
	}
	
	public Trip uninviteUser(Long userId, Long tripId) {
		Trip trip = findTripById(tripId);
		User user = userService.findUserById(userId);
		trip.getInvitees().remove(user);
		return tripRepository.save(trip);
	}
	
	public User acceptInvitation(Long userId, Long tripId) {
		Trip trip = findTripById(tripId);
		User user = userService.findUserById(userId);
		user.getTripsInvited().remove(trip);
		user.getTripsAttending().add(trip);
		return userRepo.save(user);
	}
	
	public Trip makeTripAdmin(Long userId, Long tripId) {
		Trip trip = findTripById(tripId);
		User user = userService.findUserById(userId);
		if(trip.getGuests().contains(user)) {
			trip.getGuests().remove(user);
			trip.getAdmins().add(user);
		}
		return tripRepository.save(trip);
	}
}
