const KafkaProducer = require('../producer');
const KafkaConsumer = require('../consumer');

const config = require('../config');

async function main() {

    const onDeliveryReport = (err, report) => {
        if (err) {
            console.error('Error producing', err)
        } else {
            //
            return;
        }
    }

    const onData = ({ key, value, partition, offset }) => {
        console.log(`Consumed record with key ${key} and value ${value} of partition ${partition} @ offset ${offset}.`);
    };

    const producer = await KafkaProducer.createProducer(config.producer, onDeliveryReport);

    const consumer = await KafkaConsumer.createConsumer(config.consumer, config.consumer_options, onData);

    consumer.subscribe([config.topic]);
    consumer.consume();

    process.on('SIGINT', () => {
        console.log('\nDisconnecting consumer ...');
        consumer.disconnect();
    });

    for (let i = 0; i < 10; ++i) {
        const key = null;
        const value = Buffer.from(JSON.stringify({ count: i }));

        console.log(`Producing record ${key}\t${value}`);

        producer.produce(config.topic, -1, value, key);
    }

    producer.flush(10000, () => {
        producer.disconnect();
    });

}

main().catch(err => {
    console.error(err);
});