import { generate } from './memes';
import Q from 'q';
import twilio from 'twilio';
import nconf from 'nconf';

const client = twilio(nconf.get('TWILIO_SID'), nconf.get('TWILIO_AUTH_TOKEN'));

export const reply = input => Q.fcall(() => (
  generate(input)
)).then(mediaUrl => (
  client.messages.create({
    to: '2064075508',
    from: nconf.get(nconf.get('TWILIO_PHONE_NUMBER'),
    mediaUrl
  })
)).then(({ sid }) => {
  const poll = () => client.messages(sid).get().then(({ status }) => {
    console.log('polling status', status);
    return status === 'queued' ? Q.resolve().delay(1000).then(poll) : Q.resolve();
  });
  return poll();
}).then(
  console.log.bind(console, 'success'),
  console.warn.bind(console, 'failure')
);
