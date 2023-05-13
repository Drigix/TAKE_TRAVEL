package com.airhacks.endpoints;
import java.util.List;

import javax.ejb.EJB;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import com.airhack.models.Transport;
import com.airhack.services.TransportEJB;


@Path(value="transport")
public class TransportREST {

	@EJB
	TransportEJB transportEJB;
	
	@GET
	public List<Transport> getAllTransports() {
		return transportEJB.getAllTransports();
	}
	
	@POST
	public void createTransport(Transport transport) {
		transportEJB.createTransport(transport);
	}
	
	@PUT
	public void updateTransport(Transport transport) {
		transportEJB.updateTransport(transport);
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteTransport(@PathParam("id") Integer id) {
		transportEJB.deleteTransport(id);
	}
}
