# Send Email
This extension allow to be embedded into PureCloud interface and via SendMail button send to the active caller mail directly from PureCloud.

## Installation steps
Follow below steps to enable this functionality in your org

* Create a new OAuth for SendMail functionality (Token Implicit Grant)
* Set Authorized URIs to `https://szlaskidaniel.github.io/pc-sendMail/index.html`
* Copy created clientId.
* Create / reuse Inbound Script for Calls
* Add new WebComponent and set it's url to the `https://szlaskidaniel.github.io/pc-sendMail/index.html?toAddress={{address}}&toName={{toName}}&queueId={{Scripter.QueueID}}&subject={{Subject}}&htmlBody={{bodyMail}}&wrapUpCodeId={{wrapupCode}}

If you want to use Auto-Send + Auto-Wrapup add &send=true at the end of URL

### LocalTest

https://localhost/index.html?toAddress=daniel.szlaski@genesys.com&toName=Daniel&queueId=f029fdee-875a-4c21-92bb-f36f1d32b211&subject=Thanks%20for%20Buying&htmlBody=TestBody%20With%20spaces%20;)&wrapUpCodeId=0d96421c569748e7b8abdd6433ae6227&send=true


