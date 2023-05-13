package com.airhack.services;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.airhack.models.Client;

@Stateless
public class ClientEJB {
	
	@PersistenceContext(name="client")
	EntityManager manager;
	
	public ClientEJB() {
		EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("BookPu");
    	this.manager = entityManagerFactory.createEntityManager();
	}
	
	public List<Client> getAllClients() {
		Query q = manager.createQuery("SELECT C FROM Client C");
		@SuppressWarnings("unchecked")
		List<Client> clients = q.getResultList();
		return clients;
	}
	
	public void createClient(Client client) {
		EntityTransaction transaction = manager.getTransaction();
    	transaction.begin();
		manager.persist(client);
		transaction.commit();
    	manager.close();
	}
	
	public void updateClient(Client client) {
		manager.merge(client);
	}
	
	public void deleteClient(Integer id) {
		EntityTransaction transaction = manager.getTransaction();
    	transaction.begin();
		Client client = manager.find(Client.class, id);
		manager.remove(client);
		transaction.commit();
    	manager.close();
	}
}
