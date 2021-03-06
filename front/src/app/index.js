import {ServiceBroker} from '@geut/moleculer-browser';
const GunServerTransporter = require("./GunServerTransporter");
const broker = window.broker = new ServiceBroker({
    transporter: new GunServerTransporter(),
    serializer: 'Json',
    logger: console
})

broker.createService({
    name: 'math',
    actions: {
        add(ctx) {
            return Number(ctx.params.a) + Number(ctx.params.b)
        }
    }
})

broker.start()
    // Call service
    .then(() => broker.call('math.add', {a: 5, b: 3}))
    .then(res => console.log('5 + 3 =', res))
    .catch(err => console.error(`Error occured! ${err.message}`))