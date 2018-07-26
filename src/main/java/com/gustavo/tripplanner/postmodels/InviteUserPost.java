package com.gustavo.tripplanner.postmodels;

import com.gustavo.tripplanner.models.Trip;
import com.gustavo.tripplanner.models.User;

public class InviteUserPost {
	private Long tripId;
	private Long userId;
	
	public InviteUserPost() {
	}

	public Long getTripId() {
		return tripId;
	}

	public void setTripId(Long tripId) {
		this.tripId = tripId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}


	
	
}
