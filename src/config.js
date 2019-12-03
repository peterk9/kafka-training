const config = {
    topic: 'ingestion',
    producer: {
        debug: "all",
        "metadata.broker.list": "hobt-local-poc-eventhub.servicebus.windows.net:9093", //REPLACE
        dr_cb: true, //delivery report callback
        "security.protocol": "SASL_SSL",
        "sasl.mechanisms": "PLAIN",
        "sasl.username": "$ConnectionString", //do not replace $ConnectionString
        "sasl.password": "Endpoint=sb://hobt-local-poc-eventhub.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=unuUfh1/L/Uh4+89WXK76zf4repXy0kD8++z3aRrM1g="
    },
    consumer: {
        "metadata.broker.list": "hobt-local-poc-eventhub.servicebus.windows.net:9093", //REPLACE
        "security.protocol": "SASL_SSL",
        "sasl.mechanisms": "PLAIN",
        "sasl.username": "$ConnectionString", //do not replace $ConnectionString
        "sasl.password": "Endpoint=sb://hobt-local-poc-eventhub.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=unuUfh1/L/Uh4+89WXK76zf4repXy0kD8++z3aRrM1g=",
        'group.id': 'group-1'
    },
    consumer_options: {
        'auto.offset.reset': 'latest'
    }
}

module.exports = config;