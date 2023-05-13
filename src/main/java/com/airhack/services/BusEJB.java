package com.airhack.services;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.airhack.models.Bus;

@Stateless
public class BusEJB {
	
	@PersistenceContext(name="EJB")
	EntityManager manager;
	
	public List<Bus> getAllBuses() {
		Query q = manager.createQuery("SELECT * FROM BUS");
		@SuppressWarnings("unchecked")
		List<Bus> buses = q.getResultList();
		return buses;
	}
	
	public void createBus(Bus bus) {
		manager.persist(bus);
	}
	
	public void updateBus(Bus bus) {
		manager.merge(bus);
	}
	
	public void deleteBus(Integer id) {
		Bus bus = manager.find(Bus.class, id);
		manager.remove(bus);
	}
}
