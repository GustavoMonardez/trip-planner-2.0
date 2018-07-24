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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

@Entity
@Table(name="agendas")
public class Agenda {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private Integer day;
    private Date date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agenda_id")
    private Trip trip;

    @OneToMany(mappedBy="agenda", fetch = FetchType.LAZY)
    private List<Activity> activities;
    
    @Column(updatable=false)
	private Date createdAt;
	
	private Date updatedAt;
	
	public Agenda() {
	}
	public Long getId() {
		return id;
	}
	public Integer getDay() {
		return day;
	}
	public Date getDate() {
		return date;
	}
	public Trip getTrip() {
		return trip;
	}
	public List<Activity> getActivities() {
		return activities;
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
	public void setDay(Integer day) {
		this.day = day;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public void setTrip(Trip trip) {
		this.trip = trip;
	}
	public void setActivities(List<Activity> activities) {
		this.activities = activities;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
	public void addActivity(Activity activity) {
		this.activities.add(activity);
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
