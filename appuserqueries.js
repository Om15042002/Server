const { response } = require('express')
const { client } = require('./connection')
const axios = require('axios')
var getJSON = require('get-json');


const createUser = (req, res) => {
    const { uname, upassword, firstname, email } = req.body
    const insertUser = 'insert into appuser (uname,upassword,firstname,email) values ( $1, $2, $3, $4)';
    console.log(insertUser);
    client.query(insertUser, [uname, upassword, firstname, email], (err, response) => {
        if (!err) {
            console.log("data inserted successfully");
            res.setHeader('content-type', 'application/json');
            return res.status(200).json({ msg: "Success" });
        }
        else {
            console.log(err);
            // response.status(201).send(false)
            return res.status(400).json({ msg: "failure" })
        }
        client.end;
    })
}


const loginUser = (req, res) => {
    const { uname, upassword } = req.query

    const checkcrendtials = 'select * from appuser where uname = $1 and upassword = $2';
    // console.log(insertUser);
    client.query(checkcrendtials, [uname, upassword], (err, response) => {
        if (!err) {
            // console.log('data is there...');
            // response.status(201).send()
            
            if (response.rowCount == 1) {
                // console.log("user found!!");
                // return response.status(201).send()    
                res.setHeader('content-type', 'application/json');
                return res.status(200).json({message:'success'});
            }
            else{
                res.setHeader('content-type', 'application/json');
                return res.status(200).json({ message:'invalidecredentials'});
            }
        }
        else {
            console.log(err.message);
            res.setHeader('content-type', 'application/json');
            return res.status(200).json({message:'error'});
        }
        client.end;
    })
}







module.exports = {
    createUser,
    loginUser
}