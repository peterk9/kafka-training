const Kafka = require('node-rdkafka');

class KafkaProducer {

    static async createProducer(config, onDeliveryReport) {
        const producer = new Kafka.Producer(config)

        return new Promise((resolve, reject) => {
            producer
                .on('ready', () => resolve(producer))
                .on('delivery-report', onDeliveryReport)
                .on('event.error', (err) => {
                    console.warn('event.error', err);
                    reject(err);
                });
            producer.connect();
        });

    }
}

module.exports = KafkaProducer;