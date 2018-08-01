package com.gustavo.tripplanner.services;

import org.springframework.stereotype.Service;

import com.gustavo.tripplanner.models.Message;
import com.gustavo.tripplanner.models.Trip;
import com.gustavo.tripplanner.models.User;
import com.gustavo.tripplanner.repositories.MessageRepository;

@Service
public class MessageService {
	private final MessageRepository messageRepository;
	
	public MessageService(MessageRepository messageRepository) {
		this.messageRepository = messageRepository;
	}
	
	public Message addMessage(User user, Trip trip, String messageContent) {
		Message message = new Message();
		message.setMessageContent(messageContent);
		message.setMessageAuthor(user);
		message.setTrip(trip);
		return messageRepository.save(message);
	}
}
