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
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

@Entity
@Table(name="activities")
public class Activity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private Double lng;
    private Double lat;
    private String location;
    private String imgRef;
    private String description;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "users_likes",
            joinColumns = @JoinColumn(name = "activity_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
            )
    private List<User> likedBy;

    @ManyToOne(fetch = FetchType.LAZY)	
    @JoinColumn(name="agenda_id")
    private Agenda agenda;
    
    @Column(updatable=false)
	private Date createdAt;
	
	private Date updatedAt;
	public Activity() {
	}
    
    public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getId() {
		return id;
	}
	public Double getLng() {
		return lng;
	}
	public Double getLat() {
		return lat;
	}
	
	public String getImgRef() {
		return imgRef;
	}
	
	public List<User> getLikedBy() {
		return likedBy;
	}
	public Agenda getAgenda() {
		return agenda;
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
	public void setLng(Double lng) {
		this.lng = lng;
	}
	public void setLat(Double lat) {
		this.lat = lat;
	}
	
	public void setImgRef(String imgRef) {
		this.imgRef = imgRef;
	}
	
	public void setLikedBy(List<User> likedBy) {
		this.likedBy = likedBy;
	}
	public void setAgenda(Agenda agenda) {
		this.agenda = agenda;
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
