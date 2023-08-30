const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));

const pdfRoutes = require('./routes/pdfRoutes');
app.use('/pdf', pdfRoutes);

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const activityRoutes = require('./routes/activityRoutes');
const priceRoutes = require('./routes/priceRoutes');

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/activities', activityRoutes);
app.use('/prices', priceRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
