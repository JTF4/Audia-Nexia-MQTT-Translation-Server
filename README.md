# Audia-Nexia-MQTT-Translation-Server
This server translates MQTT commands to TCP commands for the Biamp Audia and Nexia family of DSPs

# Configuration
## Translation Server
* Insert the IP of your Audia/Nexia device in the Audia/Nexia host variable.
* Insert the IP of your MQTT broker server in the MQTT broker host variable.
* Insert the MQTT topic to subscribe to.
* Run index.js

## Home Assistant
* If you do not aleady have an MQTT broker, install the mosquito MQTT broker add-on from supervisor.
* Setup the MQTT integration with the IP of your broker server.
* Whenever you want to send the Audia/Nexia DSP a command, call the `mqtt.publish` service.
    * Go to https://support.biamp.com/Audia-Nexia/Control/Audia-Nexia_command_string_calculator to create your Audia/Nexia command string.
    * In the service data section insert: 
    
        ```
         topic: <MQTT Topic
         payload: <Audia/Nexia Command String>
        ```






## Future Updates
* [ ] Add feedback from the Audia/Nexia DSP as a MQTT sensor in HASSIO
