'use strict';
require('dotenv').config();

const express = require('express');
const server = express();
server.use(express.static('./public'));

const axios = require('axios');
server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));

const PORT = process.env.PORT || 3000;

server.get('/', (req, res) => {
    res.render('/index');
})

server.post('/send', sendCompanyData);

function sendCompanyData(req, res) {

    const data = { UserName: req.body.UserName, Password: req.body.Password, FullName: req.body.FullName, PhoneNumber: req.body.PhoneNumber, EmailAddress: req.body.EmailAddress, CompanyName: req.body.CompanyName, CompanyNameAr: req.body.CompanyNameAr };
    axios.post('http://orderlink.linkers.io:8096/Landing/CreateCompanyAdmin', data)
        .then((result) => {
            console.log(result);
            if (result) {
                res.status(200).send('Thank you for sign up');
                // alert("Thank you for sign up");

            } else {
                res.status(404).send('faild to sign up try again');
                // alert("EROOR 404 FAILD TO SIGN UP");
            }

        })
        .catch(error => {
            console.log('error');
            res.status(404).send('faild to sign up try again');
        })
}

server.listen(PORT, () => {
    console.log('i am lestining on ', PORT);
})