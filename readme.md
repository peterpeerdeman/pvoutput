# pvoutput

simple module to add statuses and retrieve status from pvoutput.org

## usage

initialisation: 
```
const pvoutput = require('pvoutput');

const pvoutputclient = new pvoutput({
    debug: false,
    apiKey: 'xxxxpvoutput_apikey',
    systemId: 'xxxxxpvoutput_systemid'
});
```

adding a new status
```
/*
Parameter   Field   Required    Format  Unit    Example Since   
d   Date    Yes yyyymmdd    date    20100830    r1  
t   Time    Yes hh:mm   time    14:12   r1  
v1  Energy Generation   No1 number  watt hours  10000   r1  
v2  Power Generation    No  number  watts   2000    r1  
v3  Energy Consumption  No  number  watt hours  10000   r1  
v4  Power Consumption   No  number  watts   2000    r1  
v5  Temperature No  decimal celsius 23.4    r2  
v6  Voltage No  decimal volts   210.7   r2  
c1  Cumulative Flag No  number  -   1   r1  
n   Net Flag    No  number  -   1   r2  
delay   Net Delay   No  number  -   30  r2  DONATION MODE
v7  Extended Value 1    No  number  User Defined    100.5   r2  DONATION MODE
v8  Extended Value 2    No  number  User Defined    328 r2  DONATION MODE
v9  Extended Value 3    No  number  User Defined    -291    r2  DONATION MODE
v10 Extended Value 4    No  number  User Defined    29  r2  DONATION MODE
v11 Extended Value 5    No  number  User Defined    192 r2  DONATION MODE
v12 Extended Value 6    No  number  User Defined    9281.24 r2  DONATION MODE
*/
pvoutputclient.addStatus({
    datetime: timestamp,
    energyGeneration: solardata.etoday * 1000,
    powerGeneration: solardata.pac1,
    temperature: solardata.temperature,
    voltage: solardata.vac1
}).then(function(result) {
    console.log('successfully sent result to pvoutput');
}).catch(function(err) {
    console.log('could not add pvoutput status' + err.message);
});
```

getting current status:
```
/*
* Get status of PV installation
*
* Returns results:
*
* Date yyyymmdd    2016-06-1120100830
* Time hh:mm   19:0714:10
* Energy Generation    number  watt hours  12936
* Power Generation number  watt    202
* Energy Consumption   number  watt hours  19832
* Power Consumption    number  watt    459
* Efficiency   number  kWh/kW  5.280
* Temperature  decimal celsius 15.3
* Voltage  decimal volts   240.1
*/

pvoutputclient.getStatus().then(function(results) {
    console.log(results);
})
.catch(function(err) {
    console.log(err.message);
});
```

get daily outputs:
```
/*
* Get output of PV installation
*
* Returns results:
*
* Date yyyymmdd    2016-06-1120110327
* Energy Generated number  watt hours  4413
* Efficiency   number  kWh/kW  0.460
* Energy Exported  number  watt hours  0
* Energy Used  number  watt hours  21859
* Peak Power   number  watts   2070
* Peak Time    19:21hh:mm  11:00
* Condition    -.textShowers
* Min. Temperature number  degrees celsius -3
* Max. Temperature number  degrees celsius 6
* Peak Energy Import   number  watt hours  4220
* Off-Peak Energy Import   number  watt hours  7308
* Shoulder Energy Import   number  watt hours  2030
* High-Shoulder Energy Import  number  watt hours  3888')
*/
pvoutputclient.getOutput().then(function(results) {
    console.log(results);
})
.catch(function(err) {
    console.log(err.message);
});
```
