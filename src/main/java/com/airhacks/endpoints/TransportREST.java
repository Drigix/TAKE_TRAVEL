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

import com.airhack.models.Transport;
import com.airhack.services.TransportEJB;


@Path(value="transport")
public class TransportREST {

	TransportEJB transportEJB;
	
	public TransportREST() {
		transportEJB = new TransportEJB();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Transport> getAllTransports() {
		return transportEJB.getAllTransports();
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void createTransport(Transport transport) {
		if(transport.getId() != null) {
			throw new IllegalArgumentException();
		}
		transportEJB.createTransport(transport);
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public void updateTransport(Transport transport) {
		if(transport.getId() == null) {
			throw new IllegalArgumentException();
		}
		transportEJB.updateTransport(transport);
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteTransport(@PathParam("id") Integer id) {
		transportEJB.deleteTransport(id);
	}
}
