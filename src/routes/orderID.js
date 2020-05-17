const express = require('express');
// const moment = require('moment-timezone');
const upload = require(__dirname+'/../upload');
const db = require(__dirname +'/../db_connect');
const router = express.Router();

// ------------------------------

router.get('/', (req, res)=>{
    
    const sql = "SELECT MAX(orderID) as `orderID` FROM orderID";
    db.query(sql, (error, results, fields)=>{
        if(error){
            console.log(error);
        } else {
            res.json(results);
        }
    });

});


router.post('/', (req, res)=>{
    const sql = "INSERT INTO `orderID`(`orderID`) VALUES (?)";
    // console.log(req.body[0].orderID);
        db.queryAsync(sql, [
            // req.body.orderID + 1,
            req.body[0].orderID * 1 + 1,
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