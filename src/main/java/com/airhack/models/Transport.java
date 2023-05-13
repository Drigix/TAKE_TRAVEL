package com.airhack.models;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="transport")
public class Transport {
	@Id
	@GeneratedValue
	private Integer id;
	
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Client> clients;
	
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Bus> buses;
	
	@OneToOne
	private Route route;
}
