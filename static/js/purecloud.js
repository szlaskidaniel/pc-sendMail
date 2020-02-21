// **** Token Implicit Grant (Browser) - UserLogin ****

//redirectUri = 'https://szlaskidaniel.github.io/pc-sendMail/index.html';
const redirectUri = window.location.href;
const platformClient = require('platformClient');
const client = platformClient.ApiClient.instance
client.setPersistSettings(true);

let toAddress = unescape(getUrlVars()["toAddress"]);
let toName = unescape(getUrlVars()["toName"]);
let queueId = getUrlVars()["queueId"];
let subject = unescape(getUrlVars()["subject"]);
let htmlBody = unescape(getUrlVars()["htmlBody"]);
let wrapUpCodeId = getUrlVars()["wrapUpCodeId"];
let send = getUrlVars()["send"];

// Set Environment (in case page reloaded)
client.setEnvironment("mypurecloud.ie");

let apiInstance = new platformClient.ConversationsApi();


// Authenticate & perform Action if URL Param is set to TRUE
client.loginImplicitGrant("89f29367-dc0e-4fd0-9f55-7175a73ee600", redirectUri, { state: "TEST" })
    .then(() => {
        console.log('Logged-In');
        createEmail();

    })
    .catch((err) => {
        // Handle failure response
        console.log(err);
    });

function createEmail() {
    console.log('postConversationDisconnect')
    return new Promise(function (resolve, reject) {
        try {
            let draft_body = {
                "direction": "OUTBOUND",
                "queueId": queueId,
                "toAddress": toAddress,
                "toName": toName,
                "subject": subject,
                "htmlBody": htmlBody
            };

            apiInstance.postConversationsEmails(draft_body)
                .then((data) => {
                    console.log(`postConversationsEmails success! data: ${JSON.stringify(data, null, 2)}`);

                    if (!send) return
                    let conversationId = data.id; // String | conversationId
                    var participantId;


                    // Get conversationId to retrieve participantAttribute
                    apiInstance.getConversationsEmail(conversationId)
                        .then((data) => {
                            console.log(`getConversationsEmail success! data: ${JSON.stringify(data, null, 2)}`);
                            data.participants.forEach(function (_participant) {
                                if (_participant.purpose == 'agent')
                                    participantId = _participant.id;
                            })

                            let body = {

                                to: [{
                                    email: toAddress,
                                    name: toName,
                                }],
                                from: {
                                    email: "daniel@ininpoland.mypurecloud.ie",
                                    name: "Daniel"
                                },
                                subject: subject,
                                textBody: htmlBody,
                                historyIncluded: false
                            }

                            apiInstance.postConversationsEmailMessages(conversationId, body)
                                .then((data) => {
                                    console.log(`postConversationsEmailMessages success! data: ${JSON.stringify(data, null, 2)}`);

                                    let wrapupBody = {
                                        "wrapup": {
                                            "code": wrapUpCodeId
                                        },
                                        "state": "disconnected"
                                    }
                                    // Set Wrapup Code
                                    apiInstance.patchConversationsEmailParticipant(conversationId, participantId, wrapupBody)
                                        .then(() => {
                                            console.log('patchConversationsEmailParticipant returned successfully.');
                                        })
                                        .catch((err) => {
                                            console.log('There was a failure calling patchConversationsEmailParticipant');
                                            console.error(err);
                                        });

                                })
                                .catch((err) => {
                                    console.log('There was a failure calling postConversationsEmailMessages');
                                    console.error(err);
                                });

                        })
                        .catch((err) => {
                            console.log('There was a failure calling getConversationsEmail');
                            console.error(err);
                        });

                })
                .catch((err) => {
                    console.log('There was a failure calling postConversationsEmails');
                    console.error(err);
                });
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });

}

// help function
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
