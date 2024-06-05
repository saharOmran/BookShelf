from kafka import KafkaConsumer
import json

class KafkaConsumerService:
          def __init__(self, broker_list, group_id, topics):
              self.consumer = KafkaConsumer(
                  *topics,
                  bootstrap_servers=broker_list,
                  group_id=group_id,
                  value_deserializer=lambda x: json.loads(x.decode('utf-8'))
              )

          def consume_messages(self):
              for message in self.consumer:
                  print(f"Received message: {message.value}")