const app = require('./app');

console.log(app.get('env'));

const port = 3000;
app.listen(port, () => {
  console.log('chalu hogaya');
});
