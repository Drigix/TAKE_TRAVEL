package com.airhacks.endpoints;
import java.util.List;

import javax.ejb.EJB;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import com.airhack.models.Route;
import com.airhack.services.RouteEJB;


@Path(value="route")
public class RouteREST {

	@EJB
	RouteEJB routeEJB;
	
	@GET
	public List<Route> getAllRoutes() {
		return routeEJB.getAllRoutes();
	}
	
	@POST
	public void createRoute(Route route) {
		routeEJB.createRoute(route);
	}
	
	@PUT
	public void updateRoute(Route route) {
		routeEJB.updateRoute(route);
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteRoute(@PathParam("id") Integer id) {
		routeEJB.deleteRoute(id);
	}
}
