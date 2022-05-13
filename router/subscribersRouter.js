const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const connection = require('../db');

router.get("/", (req, res) => {
    connection.query("SELECT * FROM subscribers", (err, results) => {
        if(err) {
            console.log(err);
            return res.send(err);
        }

        return res.json({
            subscribers: results,
        })
    })
});

router.post("/", (req, res) => {
    console.log(req.body);
    const {
        subscriberName,
        subscriberMail,
    } = req.body;

    if(!subscriberName || !subscriberMail) {
        return res.status(400).json({
            error: "All fields are required",
        })
    }
    connection.query(`INSERT INTO subscribers (subscriberName, subscriberMail) VALUES (${mysql.escape(subscriberName)}, ${mysql.escape(subscriberMail)})`, (err, results) => {
        if(err) {
            console.log(err);
            return res.send(err);
        }

        return res.json({
            results,
        })
    })
});

module.exports = router;