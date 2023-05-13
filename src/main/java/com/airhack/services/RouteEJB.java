package com.airhack.services;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.airhack.models.Route;

@Stateless
public class RouteEJB {
	
	@PersistenceContext(name="EJB")
	EntityManager manager;
	
	public List<Route> getAllRoutes() {
		Query q = manager.createQuery("SELECT * FROM Route");
		@SuppressWarnings("unchecked")
		List<Route> routes = q.getResultList();
		return routes;
	}
	
	public void createRoute(Route route) {
		manager.persist(route);
	}
	
	public void updateRoute(Route route) {
		manager.merge(route);
	}
	
	public void deleteRoute(Integer id) {
		Route route = manager.find(Route.class, id);
		manager.remove(route);
	}
}
