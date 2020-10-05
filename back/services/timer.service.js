"use strict";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */


module.exports = {
	name: "timer",

	/**
	 * Settings
	 */
	settings: {},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {},

	/**
	 * Events
	 */
	events: {},

	/**
	 * Methods
	 */
	methods: {},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		let counter = 1;
		this.timer = setInterval(async () => {
			this.logger.info("Send counter changed event", {counter});
			const message = await this.broker.call("simple.welcome",{name:`Alex-${counter}`})
			this.logger.info("Received", {message});
			counter++;
		}, 500);
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {
		clearInterval(this.timer);
	}
};
