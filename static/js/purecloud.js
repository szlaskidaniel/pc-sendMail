// **** Token Implicit Grant (Browser) - UserLogin ****
//let redirectUri = 'https://szlaskidaniel.github.io/purecloud-send-sms/index.html';
redirectUri = 'https://localhost/index.html';
const platformClient = require('platformClient');
const client = platformClient.ApiClient.instance
client.setPersistSettings(true);

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

let toAddress = getUrlVars()["toAddress"];
let toName = getUrlVars()["toName"];
let queueId = getUrlVars()["queueId"];
let subject = getUrlVars()["subject"];
let htmlBody = getUrlVars()["htmlBody"];


// Set Environment (in case page reloaded)
client.setEnvironment("mypurecloud.ie");

let apiInstance = new platformClient.ConversationsApi();



// Authenticate
client.loginImplicitGrant("89f29367-dc0e-4fd0-9f55-7175a73ee600", "https://localhost/index.html")
    .then(() => {
        // Make request to GET /api/v2/users/me?expand=presence
        console.log('Logged-In');

    })
    .catch((err) => {
        // Handle failure response
        console.log(err);
    });


//#endregion


function createEmail() {
    console.log('postConversationDisconnect')
    return new Promise(function (resolve, reject) {
        try {
            let body = {
                "direction": "OUTBOUND",
                "queueId": queueId,
                "toAddress": toAddress,
                "toName": toName,
                "subject": subject,
                "htmlBody": htmlBody
            }; 

            apiInstance.postConversationsEmails(body)
                .then((data) => {
                    console.log(`postConversationsEmails success! data: ${JSON.stringify(data, null, 2)}`);
                })
                .catch((err) => {
                    console.log('There was a failure calling postConversationsEmails');
                    console.error(err);
                    alert(JSON.stringify(err));
                });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });

}
