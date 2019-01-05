const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const services = require('./routes/services');
const requests = require('./routes/requests');
const ongoingrequests = require('./routes/ongoingrequests');
const completedrequests = require('./routes/completedrequests');
const admins = require('./routes/admins');
const login = require('./routes/login');


mongoose.connect("mongodb://localhost:27017/services", {useNewUrlParser: true})
.then(()=> console.log("Connected to the database"))
.catch((err)=> console.log(err));

app.use(express.json());
app.use(express.json());
app.use(cors());
app.options('*', cors());


app.use('/api/services', services);
app.use('/api/requests', requests);
app.use('/api/ongoingrequests', ongoingrequests);
app.use('/api/completedrequests',completedrequests );
app.use('/api/admins', admins);
app.use('/api/login', login);




app.listen(port, () =>{
    console.log("Listening on port : ", port);
})