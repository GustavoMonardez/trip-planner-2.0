package com.gustavo.tripplanner.postmodels;

import java.util.List;

import com.gustavo.tripplanner.models.Trip;

public class UserTripsPost {
	private List<Trip> tripsCreated;
	private List<Trip> tripsInvited;
	
	public UserTripsPost() {
	}
	public List<Trip> getTripsCreated() {
		return tripsCreated;
	}
	public void setTripsCreated(List<Trip> tripsCreated) {
		this.tripsCreated = tripsCreated;
	}
	public List<Trip> getTripsInvited() {
		return tripsInvited;
	}
	public void setTripsInvited(List<Trip> tripsInvited) {
		this.tripsInvited = tripsInvited;
	}
	
	
	
}
