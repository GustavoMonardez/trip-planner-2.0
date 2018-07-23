package com.gustavo.tripplanner.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gustavo.tripplanner.models.Activity;
import com.gustavo.tripplanner.models.Agenda;
import com.gustavo.tripplanner.models.Trip;
import com.gustavo.tripplanner.models.User;
import com.gustavo.tripplanner.services.ActivityService;
import com.gustavo.tripplanner.services.AgendaService;
import com.gustavo.tripplanner.services.TripService;
import com.gustavo.tripplanner.services.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class TripController {
	private final ActivityService activityService;
	private final AgendaService agendaService;
	private final TripService tripService;
	private final UserService userService;
	
	public TripController(
			ActivityService activityService,
			AgendaService agendaService,
			TripService tripService,
			UserService userService) {
		this.activityService = activityService;
		this.agendaService = agendaService;
		this.tripService = tripService;
		this.userService = userService;
	}
	/*********************GET ALL*******************/
	@GetMapping("/activities")
	public List<Activity>allActivities() {
		return activityService.findAllActivities();
	}
	@GetMapping("/agendas")
	public List<Agenda>allAgendas(){
		return agendaService.findAllAgendas();
	}
	@GetMapping("/trips")
	public List<Trip>allTrips(){
		return tripService.findAllTrips();
	}
	@GetMapping("/users")
	public List<User>allUsers(){
		return userService.findAllUsers();
	}
	/*********************GET BY ID*******************/
	@GetMapping("/users/{user_id}")
	public User findUserById(@RequestParam("user_id")Long user_id) {
		return userService.findUserById(user_id);
	}
	/*********************CREATE*******************/
	@PostMapping("/users")
	public String createUser(User user) {
		userService.createUser(user);
		return "successfully created user";
	}
}
