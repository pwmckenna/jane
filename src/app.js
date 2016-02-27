import express from 'express';
import { json, urlencoded, text } from 'body-parser';
const app = express();

app.post('/sms', json(), urlencoded(), text(), (req, res, next) => {
  console.log('received an sms', req.body.Body);

  const msg = 'Roger that';
  res.status(200).send(`<Response><Sms>${msg}</Sms></Response>`);
});

export default app;