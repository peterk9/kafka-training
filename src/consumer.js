const Kafka = require('node-rdkafka');

class KafkaConsumer {

    static async createConsumer(config, options, onData) {
        const consumer = new Kafka.KafkaConsumer(config, options);
        return new Promise((resolve, reject) => {
            consumer
                .on('ready', () => resolve(consumer))
                .on('data', onData)
                .on('event.error', (err) => {
                    console.warn('event.error', err);
                    reject(err);
                });
            consumer.connect();
        });
    }

}

module.exports = KafkaConsumer;