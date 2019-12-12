package com.flashex.shipmentmicroservice.workerservice.messagingservice;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.flashex.shipmentmicroservice.lib.model.Shipment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class ProducerService {

    private static final String TOPIC = "Batches";
    private static final Logger logger = LoggerFactory.getLogger(ProducerService.class);

    @Autowired
    private KafkaTemplate<String,String> kafkaTemplateString;

    @Autowired
    private KafkaTemplate<Object, String> kafkaTemplateJSON;
    public void sendMessage(String message){
        logger.info(String.format("$$ -> Producing message --> %s",message));
        this.kafkaTemplateString.send(TOPIC,message);
    }

    public void sendMessageJSON(Shipment message) throws JsonProcessingException {
        logger.info(String.format("$$ -> Producing message --> %s",message));
        this.kafkaTemplateJSON.send(TOPIC, new ObjectMapper().writeValueAsString(message));
    }
}
