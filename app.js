const express = require('express');

const app = express();

/** Configs */
require('./config/hbs.config');

app.set('views', `${__dirname}/views`);
app.set('view engine', 'hbs');

const routes = require('./config/routes.config');
app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`Application listen at port ${port}`));
