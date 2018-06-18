module.exports = function(server) {
  
  const config = require('./config');
  const propagate = require('./propagate');

  config.connections.forEach(function(connection) {
  	new propagate(server, connection.fromDevice, connection.toDevice);    
  });
  
}
