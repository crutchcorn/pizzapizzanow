import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER!;
const testPhoneNumberToCall = process.env.TEST_PHONE_NUMBER_TO_CALL!;

async function createCall() {
  const VoiceResponse = twilio.twiml.VoiceResponse;

  const response = new VoiceResponse();
  const start = response.start();
  start.stream({
    name: 'Example Audio Stream',
    url: 'wss://51005047357c.ngrok-free.app',
  });
  response.say('The stream has started.');

  const call = await client.calls.create({
    from: twilioPhoneNumber,
    to: testPhoneNumberToCall,
    twiml: response.toString(),
  });

  console.log(call.sid);
}

await createCall();
