require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));