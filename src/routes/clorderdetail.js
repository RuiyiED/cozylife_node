const express = require('express');
// const moment = require('moment-timezone');
const upload = require(__dirname+'/../upload');
const db = require(__dirname +'/../db_connect');
const router = express.Router();

// ------------------------------

router.post('/', (req, res)=>{
    console.log(req.body);

    const sql = "INSERT INTO `clorderdetail`(`orderID`, `productID`, `unitPrice`, `quantity`, `coupon_id`) VALUES (?,?,?,?,?)";
    let data = req.body.map((value)=>{
        db.queryAsync(sql, [
            value.orderID + 1,
            value.id,
            value.price,
            value.amount,
            value.couponID,
        ])
            .then(results=>{
                // res.json(output);
            })
            .catch(ex=>{
                console.log('ex:', ex);
            })
        // res.json(req.body);
    })
    
});



module.exports = router;