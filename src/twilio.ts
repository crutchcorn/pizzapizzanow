import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER!;
const testPhoneNumberToCall = process.env.TEST_PHONE_NUMBER_TO_CALL!;

async function createCall() {
  const call = await client.calls.create({
    from: twilioPhoneNumber,
    to: testPhoneNumberToCall,
    twiml: "<Response><Say>Ahoy, World</Say></Response>",
  });

  console.log(call.sid);
}

await createCall();
