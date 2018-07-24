package com.gustavo.tripplanner.controllers;

import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	/*********************CREATE*******************/
	@PostMapping("/activities")
	public Activity createActivity(@RequestBody Activity activity) {
		return activityService.createActivity(activity);
	}
	@PostMapping("/agendas")
	public Agenda createAgenda(@RequestBody Agenda agenda) {
		return agendaService.createAgenda(agenda);
	}
	@PostMapping("/trips")
	public Trip createTrip(@RequestBody Trip trip) {
		return tripService.createTrip(trip);
	}
	/*********************READ: GET BY ID*******************/
	@GetMapping("/activities/{activity_id}")
	public Activity findActivityById(@PathVariable("activity_id")Long activity_id) {
		return activityService.findActivityById(activity_id);
	}
	@GetMapping("/agendas/{agenda_id}")
	public Agenda findAgendaById(@PathVariable("agenda_id")Long agenda_id) {
		return agendaService.findAgendaById(agenda_id);
	}
	@GetMapping("/trips/{trip_id}")
	public Trip findTripById(@PathVariable("trip_id")Long trip_id) {
		return tripService.findTripById(trip_id);
	}
	@GetMapping("/users/{user_id}")
	public User findUserById(@PathVariable("user_id")Long user_id) {
		return userService.findUserById(user_id);
	}
	/*********************UPDATE*******************/
	@PostMapping("/agendas/{agenda_id}/edit")
	public Agenda addActivityToAgenda(@PathVariable("agenda_id")Long agenda_id,@RequestBody Activity activity) {
		Agenda agenda = agendaService.findAgendaById(agenda_id);
		agenda.addActivity(activity);
		return agendaService.updateAgenda(agenda);
	}
	/*********************DELETE BY ID*******************/
	@PostMapping("/activities/{activity_id}/delete")
	public void deleteActivityById(@PathVariable("activity_id")Long activity_id) {
		activityService.deleteActivityById(activity_id);
	}
	@PostMapping("/agendas/{agenda_id}/delete")
	public void deleteAgendaById(@PathVariable("agenda_id")Long agenda_id) {
		agendaService.deleteAgendaById(agenda_id);
	}
	@PostMapping("/trips/{trip_id}/delete")
	public void deleteTripById(@PathVariable("trip_id")Long trip_id) {
		tripService.deleteTripById(trip_id);
	}
	@PostMapping("/users/{user_id}/delete")
	public void deleteUserById(@PathVariable("user_id")Long user_id) {
		userService.deleteUserById(user_id);
	}
	/*********************GET ALL*******************/
	@GetMapping("/activities")
	public List<Activity>allActivities() {
		System.out.println("entering all activities");
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
	/*********************CREATE*******************/
	@PostMapping("/users")
	public User createUser(@Valid @RequestBody User user, BindingResult br) {
		//need to figure out how to do validations
		if(br.hasErrors()) {
			System.out.println("has errors");
			System.out.println(br.getAllErrors().get(0));
			return new User();
		}else {
			return userService.createUser(user);
		}
	}
	@PostMapping("/loginuser")
	public User loginuser(@RequestBody User user, BindingResult br) {
		if(userService.authenticateUser(user.getEmail(), user.getPassword())) {
			User curUser = userService.findByEmail(user.getEmail());
			return curUser;
		}else {
			return new User();
		}
	}
}
