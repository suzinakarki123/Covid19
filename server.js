const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const covidRoutes = require('./routes/covidRoutes');



const app = express();
connectDB();

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use('/api/covid', covidRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
