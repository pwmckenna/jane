import express from 'express';
import { json, urlencoded, text } from 'body-parser';
import { generate } from './memes';
const app = express();

app.post('/sms', json(), urlencoded(), text(), (req, res) => {
  console.log('received an sms', req);
  generate(req.body.Body).then(msg => (
    res.status(200).send(`<Response><Message><Media>${msg}</Media></Message></Response>`)
  ), err => (
    res.status(200).send(`<Response><Sms>${err.message}</Sms></Response>`)
  ));
});

export default app;
