package com.airhacks.endpoints;
import java.util.List;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.airhack.models.Bus;
import com.airhack.services.BusEJB;
import com.airhack.services.ClientEJB;


@Path(value="bus")
public class BusREST {

	BusEJB busEJB;
	
	public BusREST() {
		busEJB = new BusEJB();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Bus> getAllBuses() {
		return busEJB.getAllBuses();
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void createBus(Bus bus) {
		if(bus.getId() != null) {
			throw new IllegalArgumentException();
		}
		busEJB.createBus(bus);
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public void updateBus(Bus bus) {
		if(bus.getId() == null) {
			throw new IllegalArgumentException();
		}
		busEJB.updateBus(bus);
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteBus(@PathParam("id") Integer id) {
		busEJB.deleteBus(id);
	}
}
