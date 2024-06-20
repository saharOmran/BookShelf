import time
from kafka_producer import KafkaProducerService
from kafka_consumer import KafkaConsumerService
from threading import Thread

broker_list = ['localhost:9092']
topic = 'test_topic'
group_id = 'test_group'

def start_producer():
    producer = KafkaProducerService(broker_list)
    producer.send_message(topic, {'key': 'value'})
    print("Message sent")

def start_consumer():
    consumer = KafkaConsumerService(broker_list, group_id, [topic])
    consumer.consume_messages()

if __name__ == "__main__":
    consumer_thread = Thread(target=start_consumer)
    consumer_thread.start()

    time.sleep(5)  

    start_producer()

    consumer_thread.join()
