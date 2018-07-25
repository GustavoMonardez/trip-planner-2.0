package com.gustavo.tripplanner.postmodels;

import com.gustavo.tripplanner.models.Trip;

public class TripPost {
	private Long hostId;
	private Trip trip;
	
	public TripPost() {
	}
	
	public Long getHostId() {
		return hostId;
	}
	
	public void setHostId(Long hostId) {
		this.hostId = hostId;
	}

	public Trip getTrip() {
		return trip;
	}
	
	public void setTrip(Trip trip) {
		this.trip = trip;
	}
	
}
