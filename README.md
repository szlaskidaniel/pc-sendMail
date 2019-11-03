# Send Email
This extension allow to be embedded into PureCloud interface and via SendMail button send to the active caller mail directly from PureCloud.

## Installation steps
Follow below steps to enable this functionality in your org

* Create a new OAuth for SendMail functionality (Token Implicit Grant)
* Set Authorized URIs to `https://szlaskidaniel.github.io/pc-sendMail/index.html`
* Copy created clientId.
* Create / reuse Inbound Script for Calls
* Add new WebComponent and set it's url to the `https://localhost/index.html?conversationId={{Scripter.Interaction ID}}&queueId={{Scripter.Queue ID}}&phoneNumber={{Scripter.Customer Formatted Number}}


### LocalTest

https://localhost/index.html?toAddress=szlaski.daniel@gmail.com&toName=Danielox&queueId=f029fdee-875a-4c21-92bb-f36f1d32b211&subject=TestSubject&htmlBody=ThisIsBody


