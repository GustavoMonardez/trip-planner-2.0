package com.gustavo.tripplanner.models;

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
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name="users")
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty
	private String firstName;
	
	@NotEmpty
	private String lastName;
	
	@NotEmpty
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
	private List<Activity> likedActivities;
	
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name="trips_guests",
			joinColumns=@JoinColumn(name="guest_id"),
			inverseJoinColumns=@JoinColumn(name="trip_id")
	)
	private List<Activity> tripsAttending;
	
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name="trips_admins",
			joinColumns=@JoinColumn(name="admin_id"),
			inverseJoinColumns=@JoinColumn(name="trip_id")
	)
	private List<Activity> tripsCreated;
	
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name="trips_invitees",
			joinColumns=@JoinColumn(name="invitee_id"),
			inverseJoinColumns=@JoinColumn(name="trip_id")
	)
	private List<Activity> tripsInvited;
	
	public Long getId() {
		return id;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public String getPasswordConfirmation() {
		return passwordConfirmation;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public List<Activity> getLikedActivities() {
		return likedActivities;
	}

	public List<Activity> getTripsAttending() {
		return tripsAttending;
	}

	public List<Activity> getTripsCreated() {
		return tripsCreated;
	}

	public List<Activity> getTripsInvited() {
		return tripsInvited;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setPasswordConfirmation(String passwordConfirmation) {
		this.passwordConfirmation = passwordConfirmation;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public void setLikedActivities(List<Activity> likedActivities) {
		this.likedActivities = likedActivities;
	}

	public void setTripsAttending(List<Activity> tripsAttending) {
		this.tripsAttending = tripsAttending;
	}

	public void setTripsCreated(List<Activity> tripsCreated) {
		this.tripsCreated = tripsCreated;
	}

	public void setTripsInvited(List<Activity> tripsInvited) {
		this.tripsInvited = tripsInvited;
	}

	public User() {
		
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
