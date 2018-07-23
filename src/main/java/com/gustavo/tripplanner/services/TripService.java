package com.gustavo.tripplanner.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.gustavo.tripplanner.models.Trip;
import com.gustavo.tripplanner.repositories.TripRepository;

@Service
public class TripService {
	private final TripRepository tripRepository;
	
	public TripService(TripRepository tripRepository) {
		this.tripRepository = tripRepository;
	}
	//create
	public Trip createTrip(Trip trip) {
		return tripRepository.save(trip);
	}
	//read
	public Trip findTripById(Long id) {
		Optional<Trip>trip = tripRepository.findById(id);
		if(trip.isPresent()) return trip.get();
		else return null;
	}
	//udpate
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
