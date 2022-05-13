const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const connection = require('../db');
const {detectLanguage, translateText} = require('../utils/translateFunctions');
const {sendMail} = require('../utils/mailFunctions');
const { LANGUAGE_ISO_CODE } = require('../utils/dictionaries');

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

router.get("/allMails", (req, res) => {
    connection.query("SELECT subscriberMail FROM subscribers", (err, results) => {
        if(err) {
            console.log(err);
            return res.send(err);
        }

        return res.json({
            allMails: results,
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

router.post("/sendNewsletter", async(req, res) => {
    const { senderName, senderMail, receiverMail, messageContent, language} = req.body
    if(!senderName || !senderMail || !receiverMail || !messageContent || !language) {
        return res.status(400).json({
            error: "All fields are required",
        })
    }

    if(!LANGUAGE_ISO_CODE[language]) {
        return res.status(400).send("Invalid language");
    }

    let translationData = {};

    try {
        if(LANGUAGE_ISO_CODE[language]) {
            const translatedText = await translateText(messageContent, LANGUAGE_ISO_CODE[language]);
            translationData.translatedText = translatedText[0];
        } else {
            return res.send("Invalid Language");
        }
        if(language === "ALL") {
            const availableLanguages = Object.values(LANGUAGE_ISO_CODE);

            const translatedAnswearsArray = await Promise.all(
                availableLanguages.map(async (language) => {
                    const translatedText = await translateText(messageContent, language);
                    return translateText[0];
                })
            )

            translationData.translatedText = translatedAnswearsArray.reduce(
                (acc, curr) => {
                    return acc + curr + "\n"
                }, ""
            )
        }

        sendMail(receiverMail, senderMail, translationData.translatedText, `${senderName} has sent you a message`);

    } catch (err) {
        console.log(err);
        return res.send(err);
    }
})

module.exports = router;