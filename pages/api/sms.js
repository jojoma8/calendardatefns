const TheSmsWorksApi = require("the-sms-works");
const defaultClient = TheSmsWorksApi.ApiClient.instance;

// Configure API key authorization: JWT
const JWT = defaultClient.authentications["JWT"];
JWT.apiKey = process.env.REACT_APP_THESMSWORKS_API_KEY;

const apiInstance = new TheSmsWorksApi.MessagesApi();

const smsMessage = new TheSmsWorksApi.Message(); // Message | Message properties

smsMessage.sender = "JojoMa";
smsMessage.destination = "07586739008";
smsMessage.content = "My super awesome message";
// smsMessage.schedule = "";
// smsMessage.tag = "campaign1";

const callback = function (error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log("API called successfully. Returned data: " + data);
  }
};
apiInstance.sendMessage(smsMessage, callback);
