require('babel-core/register');
require('./config');
require('./app').listen(process.env.PORT, () => (
  console.log(`listening on port ${process.env.PORT}`)
));
