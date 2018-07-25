package com.gustavo.tripplanner.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.gustavo.tripplanner.models.Activity;
import com.gustavo.tripplanner.repositories.ActivityRepository;

@Service
public class ActivityService {
	private final ActivityRepository activityRepo;
	
	public ActivityService(ActivityRepository activityRepo) {
		this.activityRepo = activityRepo;
	}
	//create
	public Activity createActivity(Activity activity) {
		return activityRepo.save(activity);
	}
	//read
	public Activity findActivityById(Long id) {
		Optional<Activity>activity = activityRepo.findById(id);
		if(activity.isPresent())return activity.get();
		else return null;
	}
	//update
	public Activity updateActivity(Activity activity) {
		return activityRepo.save(activity);
	}
	//delete
	public void deleteActivityById(Long id) {
		activityRepo.deleteById(id);
	}
	//find all
	public List<Activity>findAllActivities(){
		return activityRepo.findAll();
	}
}
