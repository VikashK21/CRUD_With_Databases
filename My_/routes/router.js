const express = require('express');
const dbConn = require('../config/db.config');
const router = express()

const Joi = require("joi");
// const mysql=require('mysql');

router.get('/get_data', (req, res) => {
    dbConn.query('select *from api', (err, result) =>{
        if (err) {
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})


router.get('/login', (req, res) => {
    const data = req.body;
    dbConn.query(`select *from api where email="${data.email}" and password="${data.password}"`, (err, result, resultall) => {
        if (result) {
            if (result.length > 0) {
                if (data.email === result[0].email && data.password === result[0].password) {
                    res.send('You are successfully logged in.')
                }
            }
            else {
                res.send('This account does not exist, go for Signup!!')
            }
        } else {
            console.log(err);
        }
    });
});



router.post('/signup', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30),
        email: Joi.string().email().min(6).max(50).required(),
        password: Joi.string().min(8).max(16).required()
    })
    const schemaValidete = schema.validate(req.body)
    let userlayout;
    if (schemaValidete.error) {
        return res.status(500).json({
            massage: schemaValidete.error.massage || "email or password is wrong!!"
        })
    }
    else {
        userlayout = schemaValidete.value
    }
    try {
        dbConn.query(`select * from api where email="${userlayout.email}" and password="${userlayout.password}"`, (err, result) => {
            if (err) {
                return res.status(500).json({
                    massage: schemaValidete.err.massage || "email or password is not valid"
                })

            }
            else {
                if (result.length > 0) {
                    return res.status(401).json({
                        massage: "Data already exists"
                    })
                }
                else {
                    dbConn.query('insert into api set ?', userlayout, err => {
                        if (!err) {
                            res.send('You are successfully Signed Up.')
                        }
                    })
                }
            }
        })
    } catch {

    }

})


router.delete('/delete', (req, res) => {
    const data = req.body;
    dbConn.query(`delete from api where email="${data.email}" and password="${data.password}"`, (err, result) => {
        if (err) throw err;
        if (result['affectedRows'] > 0) {
            res.send('Your account is deleted.')
        }
        else {
            res.send('This acoount does not exist!!')

        }
    })
})

router.put('/update', (req, res) => {
    const data = req.body[0];
    const schema=Joi.object({
        password: Joi.string().lowercase().min(8).max(16).required()
    })
    const schemaValidate=schema.validate(req.body[1])
    let userlayout;
    if (schemaValidate.error){
        return res.status(500).json({
            message: schemaValidate.error.message || 'Invlid Password!!'
        })
    }
    else{
        userlayout=schemaValidate.value;
    }
    try {
        dbConn.query(`update api set password="${userlayout.password}" where email="${data.email}"`, (err, result) =>{
            console.log(result)
            if (err){
                res.send(err)
            }
            else{
                res.send('Your account is updated.')
            }
        })
    } catch (error) {
        res.send('Something went wrong!!')
    }
})



module.exports = router;