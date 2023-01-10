console.log('server page..');
const express = require('express');
const router = require('./router.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});