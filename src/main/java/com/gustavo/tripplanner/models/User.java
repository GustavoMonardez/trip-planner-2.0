package com.gustavo.tripplanner.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="users")
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty(message="please enter a name")
	private String firstName;
	
	@NotEmpty
	private String lastName;
	
	@NotEmpty
	@Email	
	private String email;
	
	@NotEmpty
	private String password;
	
	@Transient
	private String passwordConfirmation;
	
	@Column(updatable=false)
	private Date createdAt;
	
	private Date updatedAt;
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name="users_likes",
			joinColumns=@JoinColumn(name="user_id"),
			inverseJoinColumns=@JoinColumn(name="activity_id")
	)
	@JsonIgnoreProperties("likedBy")
	private List<Activity> likedActivities;
	
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name="trips_guests",
			joinColumns=@JoinColumn(name="guest_id"),
			inverseJoinColumns=@JoinColumn(name="trip_id")
	)
	@JsonIgnoreProperties("guests")
	private List<Trip> tripsAttending;
	
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name="trips_admins",
			joinColumns=@JoinColumn(name="admin_id"),
			inverseJoinColumns=@JoinColumn(name="trip_id")
	)
	@JsonIgnoreProperties("admins")
	private List<Trip> tripsCreated;
	
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name="trips_invitees",
			joinColumns=@JoinColumn(name="invitee_id"),
			inverseJoinColumns=@JoinColumn(name="trip_id")
	)
	@JsonIgnoreProperties("invitees")
	private List<Trip> tripsInvited;
	

	public User() {
		this.tripsAttending = new ArrayList<Trip>();
	}
	
	public String getName() {
		return firstName + " " + lastName;
	}
	
	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getFirstName() {
		return firstName;
	}



	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}



	public String getLastName() {
		return lastName;
	}



	public void setLastName(String lastName) {
		this.lastName = lastName;
	}



	public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	public String getPassword() {
		return password;
	}



	public void setPassword(String password) {
		this.password = password;
	}



	public String getPasswordConfirmation() {
		return passwordConfirmation;
	}



	public void setPasswordConfirmation(String passwordConfirmation) {
		this.passwordConfirmation = passwordConfirmation;
	}



	public Date getCreatedAt() {
		return createdAt;
	}



	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}



	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public List<Activity> getLikedActivities() {
		return likedActivities;
	}



	public void setLikedActivities(List<Activity> likedActivities) {
		this.likedActivities = likedActivities;
	}



	public List<Trip> getTripsAttending() {
		return tripsAttending;
	}



	public void setTripsAttending(List<Trip> tripsAttending) {
		this.tripsAttending = tripsAttending;
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



	@PrePersist
	protected void onCreate() {
		this.createdAt = new Date();
	}
	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}
}
