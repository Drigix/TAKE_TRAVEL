package com.airhack.services;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.airhack.models.Transport;

@Stateless
public class TransportEJB {
	
	@PersistenceContext(name="EJB")
	EntityManager manager;
	
	public List<Transport> getAllTransports() {
		Query q = manager.createQuery("SELECT * FROM Transport");
		@SuppressWarnings("unchecked")
		List<Transport> transports = q.getResultList();
		return transports;
	}
	
	public void createTransport(Transport transport) {
		manager.persist(transport);
	}
	
	public void updateTransport(Transport transport) {
		manager.merge(transport);
	}
	
	public void deleteTransport(Integer id) {
		Transport transport = manager.find(Transport.class, id);
		manager.remove(transport);
	}
}
