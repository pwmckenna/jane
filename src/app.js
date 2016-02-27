import express from 'express';
import { json, urlencoded, text } from 'body-parser';
import { reply } from './jane';
const app = express();

app.post('/sms', json(), urlencoded(), text(), (req, res, next) => {
  console.log('received an sms', req.body.Body);
  reply(req.body.Body).then(msg => (
    res.status(200).send(`<Response><Sms>${msg}</Sms></Response>`)
  ), err => (
    res.status(200).send(`<Response><Sms>${err.message}</Sms></Response>`)
  ))
});

export default app;