import { generate } from './memes';
import Q from 'q';
// Twilio Credentials
nconf.file('../config.json');

//require the Twilio module and create a REST client
const client = require('twilio')(nconf.get('TWILIO_SID'), nconf.get('TWILIO_AUTH_TOKEN'));

const input = 'one does not simply send memes';

Q.fcall(() => (
  generate(input)
)).then(mediaUrl => (
  client.messages.create({
    to: '2064075508',
    from: TWILIO_PHONE_NUMBER,
    mediaUrl
  })
)).then(({ sid }) => {
  const poll = () => client.messages(sid).get().then(({ status }) => {
    console.log('polling status', status);
    return status === 'queued' ? Q.resolve().delay(1000).then(poll) : Q.resolve()
  });
  return poll();
}).then(
  console.log.bind(console, 'success'),
  console.warn.bind(console, 'failure')
);