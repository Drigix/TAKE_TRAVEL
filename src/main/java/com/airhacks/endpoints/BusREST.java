package com.airhacks.endpoints;
import java.util.List;

import javax.ejb.EJB;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import com.airhack.models.Bus;
import com.airhack.services.BusEJB;


@Path(value="bus")
public class BusREST {

	@EJB
	BusEJB busEJB;
	
	@GET
	public List<Bus> getAllBuses() {
		return busEJB.getAllBuses();
	}
	
	@POST
	public void createBus(Bus bus) {
		busEJB.createBus(bus);
	}
	
	@PUT
	public void updateBus(Bus bus) {
		busEJB.updateBus(bus);
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteBus(@PathParam("id") Integer id) {
		busEJB.deleteBus(id);
	}
}
