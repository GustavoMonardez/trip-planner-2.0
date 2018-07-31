package com.gustavo.tripplanner.postmodels;

public class LikeActivityPost {
	private Long userId;
	private Long activityId;
	
	public LikeActivityPost() {
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getActivityId() {
		return activityId;
	}
	public void setActivityId(Long activityId) {
		this.activityId = activityId;
	}
	
}
