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

import com.airhack.models.Client;
import com.airhack.services.ClientEJB;


@Path(value="client")
public class ClientREST {

	ClientEJB clientEJB;
	
	public ClientREST() {
		this.clientEJB = new ClientEJB();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Client> getAllClients() {
		return clientEJB.getAllClients();
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path(value="/createClient")
	public String createClient(Client client) {
		clientEJB.createClient(client);
		return "a";
	}
	
	@PUT
	public void updateClient(Client client) {
		clientEJB.updateClient(client);
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteClient(@PathParam("id") Integer id) {
		clientEJB.deleteClient(id);
	}
}
