# If you have specific configurations or setup, use a base image or write the necessary steps
FROM wurstmeister/kafka:latest

# Set working directory
WORKDIR /kafka

# Copy Kafka configurations
COPY kafka/server.properties /kafka/config/server.properties
COPY kafka/zookeeper.properties /kafka/config/zookeeper.properties
COPY kafka/kafka-init.sh /kafka/init.sh
RUN chmod +x /kafka/init.sh

# If needed, add commands to start Kafka and Zookeeper
CMD ["/bin/bash", "/kafka/init.sh"]
