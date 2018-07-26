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
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity 
@Table(name="trips") 
public class Trip { 
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY) 
	private Long id; 
	@NotEmpty 
	private String title; 
	@Lob
    @Column(name="imgRef", length=512)
	private String description; 
	@DateTimeFormat(pattern="yyyy-MM-dd") 
	private Date date_from; 
	@DateTimeFormat(pattern="yyyy-MM-dd") 
	private Date date_to;
	
	@ManyToMany(fetch=FetchType.LAZY) 
	@JoinTable( 
			name = "trips_admins", 
			joinColumns = @JoinColumn(name = "trip_id"), 
			inverseJoinColumns = @JoinColumn(name = "admin_id") ) 
	@JsonIgnoreProperties("tripsCreated")
	private List<User> admins;
	
	@ManyToMany(fetch=FetchType.LAZY) 
	@JoinTable( 
			name = "trips_guests", 
			joinColumns = @JoinColumn(name = "trip_id"), 
			inverseJoinColumns = @JoinColumn(name = "guest_id") ) 
	@JsonIgnoreProperties("tripsAttending")
	private List<User> guests;
	
	@OneToMany(mappedBy="trip", fetch=FetchType.LAZY) 
	@JsonIgnoreProperties("trip")
	private List<Agenda> agendas;
	
	@ManyToMany(fetch=FetchType.LAZY) 
	@JoinTable( 
			name = "trips_invitees", 
			joinColumns = @JoinColumn(name = "trip_id"), 
			inverseJoinColumns = @JoinColumn(name = "invitees_id") ) 
	@JsonIgnoreProperties("tripsInvited")
	private List<User> invitees;
	
	@OneToMany(mappedBy="trip", fetch = FetchType.LAZY)
	@JsonIgnoreProperties("trip")
	private List<Activity> proposedActivities;
	
	@Column(updatable=false)
	private Date createdAt;
	
	private Date updatedAt;
	
	public Trip() {
		//added this line here to avoid a null pointer exception
		//when creating a trip
		this.admins = new ArrayList<User>();
	}
	
	public List<Activity> getProposedActivities() {
		return proposedActivities;
	}

	public void setProposedActivities(List<Activity> proposedActivities) {
		this.proposedActivities = proposedActivities;
	}

	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

	public Date getDate_from() {
		return date_from;
	}

	public Date getDate_to() {
		return date_to;
	}

	public List<User> getAdmins() {
		return admins;
	}

	public List<User> getGuests() {
		return guests;
	}

	public List<Agenda> getAgendas() {
		return agendas;
	}

	public List<User> getInvitees() {
		return invitees;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setDate_from(Date date_from) {
		this.date_from = date_from;
	}

	public void setDate_to(Date date_to) {
		this.date_to = date_to;
	}

	public void setAdmins(List<User> admins) {
		this.admins = admins;
	}

	public void setGuests(List<User> guests) {
		this.guests = guests;
	}

	public void setAgendas(List<Agenda> agenda) {
		this.agendas = agenda;
	}

	public void setInvitees(List<User> invitees) {
		this.invitees = invitees;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
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
