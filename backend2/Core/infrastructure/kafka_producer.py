from kafka import KafkaProducer
import json

class KafkaProducerService:
          def __init__(self, broker_list):
              self.producer = KafkaProducer(
                  bootstrap_servers=broker_list,
                  value_serializer=lambda v: json.dumps(v).encode('utf-8')
              )

          def send_message(self, topic, value):
              self.producer.send(topic, value=value)
              self.producer.flush()