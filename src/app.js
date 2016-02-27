import express from 'express';
const app = express();

app.post('/sms', (req, res, next) => {
  console.log('received an sms', req.body, req.query);
  const msg = 'Roger that';
  res.status(200).send(`<Response><Sms>${msg}</Sms></Response>`);
});

export default app;