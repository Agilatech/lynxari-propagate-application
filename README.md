![Lynxari IoT Platform](https://agilatech.com/images/lynxari/lynxari200x60.png) **IoT Platform**
## Lynxari Fileout Application

### Install
```
$> npm install @agilatech/lynxari-fileout-application
```
Install in the same directory in which lynxari is installed. Create a config.json file to suit.


### Purpose
The purpose of this application is to propagate the output from one device to a call on another. A simple example would be using the output of a ambient light sensor to turn on a floodlight device. The application can handle more complex transactions, and can be used to chain events along many devices.

Devices can reside on different servers as long as the servers are linked as peers.


### Usage
This application runs on the [Agilatech®](https://agilatech.com) Lynxari IoT platform.  As such, it is not applicable for other environments.

To use it with Lynxari, simply insert its object definition as an element in the apps array in the _applist.json_ file. On startup, the Lynxari server reads _applist.json_ and starts all applications found there.

A _config.json_ configuration file must be present in the module's main directory. For this module, that will be within the Lynxari home directory in _node\_modules/@agilatech/lynxari-fileout-application/config.json_


### Configuration
The _config.json_ file defines an array of connections. Each connection element in the array defines a from-to propagation between two devices. The connection object is further composed of two more objects, the **fromDevice** and **toDevice**. The fromDevice object defines server, device, and property from where the data originates, while the toDevice defines the server, device, and transition which will be called.

**fromDevice** :
1. **server** : The name of the server on which to query the device. If ommited, defaults to the local server.
2. **name** : The name of the device which owns the data property.
3. **property** : The data property whose arrival will trigger the call.

**toDevice** :
1. **server** : The name of the server on which the receiving device is connected. If ommited, defaults to the local server.
2. **name** : The name of the device which on which the transition will be called.
3. **transitions** : An array of transitions to be called each and every time the propagation is triggered.

  **transitions** :
  1. **transition** : The name of the transition (call) to made on the device.
  2. **arguments** : An array of arguments to be passed in the call. If none, provide an empty array.
  3. **acceptsMessage** : **true** | **false** Boolean value to indicate whether the transition call wishes to receive the message from the fromDevice. 

A sample config file:
```
{
    "connections": [
        {
            "fromDevice": {
                "server": "shop1",
                "name": "NorthShopSwitch",
                "property": "level"
            },
            "toDevice": {
                "server": "shop1",
                "name": "NorthShopLight",
                "transitions": [
                    {
                        "transition": "toggle-output",
                        "arguments": [],
                        "acceptsMessage": false
                    }
                ]
            }
        },
        {
            "fromDevice": {
                "name": "CanalWaterLevel",
                "property": "highwater"
            },
            "toDevice": {
                "name": "Floodgate1",
                "transitions": [
                    {
                        "transition": "open-valve",
                        "arguments": [],
                        "acceptsMessage": true
                    }
                ]
            }
        }
    ]
}
```

### Copyright
Copyright © 2018 [Agilatech®](https://agilatech.com). All Rights Reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
