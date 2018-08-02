package com.gustavo.tripplanner.postmodels;

public class MessagePost {
	private Long tripId;
	private Long userId;
	private String message;
	
	
	public MessagePost() {
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
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	
}
