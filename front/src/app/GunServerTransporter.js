import BaseTransporter from "@geut/moleculer-browser/dist/umd/moleculer";
import Gun from "gun";

// require('gun/lib/shim');

class GunServerTransporter extends BaseTransporter.Transporters.Base {
    constructor(opts) {
        super(opts);
        if (!this.opts) {
            this.opts = {
                port: 8765,
                host: "233.255.255.255"
            };
        }
        this.gun = null;
        this.online = false;
    }

    async connect() {
        const connectStr = `${this.opts.host}:${this.opts.port}`;
        this.gun = Gun(connectStr);
        const t = this.getTopicName("online", this.nodeID);
        await this.onConnected();
        this.gun.get(t).put("online");
        this.logger.info(`GUN transporter connected to ${connectStr}...`);
        this.gun.connected((online) => {
            if (online) {
                this.online = true;
                this.logger.info("You are back online!")
            } else {
                this.online = false;
                this.gun.get(t).put("offline");
                this.logger.info("You are offline!")
            }
        })

    }

    async disconnect() {
        if (this.gun) {
            this.gun.bye();
            // Send disconnecting messages to all sockets.
            // const sockets = Object.values(this.io.sockets.sockets)
            // sockets.forEach(socket => socket.emit('$broker.stopped'))
        }
    }

    /**
     * Subscribe to a command
     *
     * @param {String} cmd
     * @param {String} nodeID
     *
     * @memberof FakeTransporter
     */
    async subscribe(cmd, nodeID) {
        const t = this.getTopicName(cmd, nodeID);
        this.gun.get(t).on((msg) => {
            this.receive(cmd, msg.data);
        })
    }

    /**
     * Send data buffer.
     *
     * @param {String} topic
     * @param {Buffer} data
     * @param {Object} meta
     *
     * @returns {Promise<void>}
     */
    async send(topic, data, meta) {
        this.gun.get(topic).put({data, meta});
    }


}

module.exports= GunServerTransporter;
//
//
// const config={};
// config.server = require('http').createServer(config,Gun.serve(__dirname));
//
//
// const gun = Gun({web: config.server.listen(config.port)});
// console.log('Relay peer started on port ' + config.port + ' with /gun');
// //
// module.exports = gun;
