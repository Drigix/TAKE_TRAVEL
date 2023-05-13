package com.airhacks.ping.boundary;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

import com.airhack.models.Book;


/**
 *
 * @author airhacks.com
 */
@Path("ping")
public class PingResource {

    @GET
    public String ping() {
    	
    	EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("BookPu");
    	EntityManager manager = entityManagerFactory.createEntityManager();
    	
    	EntityTransaction transaction = manager.getTransaction();
    	transaction.begin();
    	
    	Book book = new Book();
    	book.setTitle("title");
    
    	manager.persist(book);
    	transaction.commit();
    	
    	manager.close();
    	entityManagerFactory.close();
    	
        return "Jakarta EE with MicroProfile 2+!";
    }

}
