package com.gustavo.tripplanner.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "messages")
public class Message {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Lob
    @Column(name="content", length=512)
	private String messageContent;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonIgnoreProperties({"messages","likedActivities","tripsAttending","tripsCreated","tripsInvited"})
	private User messageAuthor;
	
	@ManyToOne
	@JoinColumn(name = "trip_id")
	@JsonIgnoreProperties({"messages","admins","guests","agendas","invitees","proposedActivities","messages"})
	private Trip trip;
	
	@Column(updatable=false)
	private Date createdAt;
	private Date updatedAt;
	
	public Message() {
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getMessageContent() {
		return messageContent;
	}
	public void setMessageContent(String messageContent) {
		this.messageContent = messageContent;
	}
	public User getMessageAuthor() {
		return messageAuthor;
	}
	public void setMessageAuthor(User messageAuthor) {
		this.messageAuthor = messageAuthor;
	}
	public Trip getTrip() {
		return trip;
	}
	public void setTrip(Trip trip) {
		this.trip = trip;
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
	@PrePersist
	protected void onCreate() {
		this.createdAt = new Date();
	}
	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}

}
