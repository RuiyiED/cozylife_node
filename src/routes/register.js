const express = require('express');
// const moment = require('moment-timezone');
const upload = require(__dirname+'/../upload');
const db = require(__dirname +'/../db_connect');
const router = express.Router();

// ------------------------------

// router.get('/', (req, res)=>{
    
//     const sql = "SELECT * FROM customer";
//     db.query(sql, (error, results, fields)=>{
//         if(error){
//             console.log(error);
//         } else {
//             res.json(results);
//         }
//     });

// });

router.post('/', (req, res)=>{
    console.log(req.body);
    console.log(req.body[0].CustomerMail);
    console.log(req.body[0].CustomerPassword);
    
    const sql = "INSERT INTO `customer`(`CustomerName`, `CustomerUsername`, `CustomerPassword`, `CustomerSex`, `CustomerMail`,`CustomerTel`,`CustomerAddress`,`CustomerBirthday`,`CustomerLogin`,`CustomerJoinDate`) VALUES (?,?,?,?,?,?,?,?,?,NOW())";
    db.queryAsync(sql, [
            req.body[0].CustomerName,
            "",
            req.body[0].CustomerPassword,
            "女",
            req.body[0].CustomerMail,
            "0979-111721",
            req.body[0].CustomerAddress,
            "2020-05-11",
            "0"
        ])
        .then(results=>{
            // res.json(output);
        })
        .catch(ex=>{
            console.log('ex:', ex);
        })
        res.json(req.body);

});

module.exports = router;