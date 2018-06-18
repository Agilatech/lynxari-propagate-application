module.exports = class Propagate {
	
	constructor(server, fromDevice, toDevice) {

		this.server = server;
    this.serverName = this.server.httpServer.zetta.serverName;
    this.fromDevice = fromDevice;
    this.toDevice = toDevice;

    // the "server" is assumed to be the local hub if it is not defined
    if (typeof this.fromDevice.server == "undefined") {
      this.fromDevice.server = this.serverName;
    }

    if (typeof this.toDevice.server == "undefined") {
      this.toDevice.server = this.serverName;
    }

		this.startObservers();
	}

	startObservers() {

    // if the from or to device is on the local server, then leave off the .from() clause

    const fromDeviceQuery = (this.serverName == this.fromDevice.server) ? 
                            this.server.where({name:this.fromDevice.name}) : 
                            this.server.from(this.fromDevice.server).where({name:this.fromDevice.name});

    const toDeviceQuery = (this.serverName == this.toDevice.server) ? 
                            this.server.where({name:this.toDevice.name}) : 
                            this.server.from(this.toDevice.server).where({name:this.toDevice.name});

		const self = this;

		this.server.observe([fromDeviceQuery, toDeviceQuery], function(from, to) {

      from.streams[self.fromDevice.property].on('data', function(message) {

        self.toDevice.transitions.forEach(function(trans, index) {

          // if the receiving transition wants to use the message, tack it on to the end of the argument array
          if (trans.acceptsMessage) {
            trans.arguments.push(message.data);
          }

          to.call(trans.transition, ...trans.arguments);
        });

      });
    });
	}

}

/*

config.json example

{
  "connections":[
    {
      "fromDevice":{
        "server":"shop",
        "name":"NorthShopSwitch",
        "property":"level"
      },
      "toDevice":{
        "server":"shop",
        "name":"NorthShopLight",
        "transitions": [
          {"transition":"toggle-output", "arguments":[], "acceptsMessage":false}
        ]
      }
    },
    {
      "fromDevice":{   // the "server" is assumed to be the local hub if it is not defined
        "name":"SouthShopSwitch",
        "property":"level"
      },
      "toDevice":{   // the "server" is assumed to be the local hub if it is not defined
        "name":"SouthShopLight",
        "transitions": [
          {"transition":"toggle-output", "arguments":[], "acceptsMessage":false}
          // acceptsMessage means whether or not the transition can use the sender's message
        ]
      }
    }
  ]
}

*/