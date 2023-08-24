const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pdfRoutes = require('./routes/pdfRoutes');
app.use('/pdf', pdfRoutes);

const personRoutes = require('./routes/personRoutes');
const caseRoutes = require('./routes/caseRoutes');
const activityRoutes = require('./routes/activityRoutes');

app.use('/people', personRoutes);
app.use('/cases', caseRoutes);
app.use('/activities', activityRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
