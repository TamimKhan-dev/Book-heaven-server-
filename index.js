const express = require('express');
const app = express();
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Simple CRUD server is running!');
})

app.listen(port, () => {
    console.log(`Simple crud server is running on port: ${port}`);
})