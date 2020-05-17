const express = require('express');  //express是原本建服務器的功能都可以用在額外添加新功能
// const url = require('url');
// const upload = require(__dirname+'/upload');
// const session = require('express-session');
const db = require(__dirname + '/db_connect');
const cors = require('cors');
const app = express();  // express所有都有順序性

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    console.log(req.body);
    res.send(`<h2>Hi Dora</h2>`)   
});

// ------------------------------------------
// Ader
app.use('/clorderdetail', require(__dirname +'/routes/clorderdetail'));
app.use('/order', require(__dirname +'/routes/order'));
app.use('/orderID', require(__dirname +'/routes/orderID'));

// ------------------------------------------
// Ruiyi
app.use('/myserver', require(__dirname + '/routes/myserver'));
app.use('/register', require(__dirname + '/routes/register'));
//其他商品資料

app.get('/popslide',(req,res)=>{   
    const sql = "SELECT * FROM product2 order by rand() LIMIT 4";
    db.query(sql,(error,results,fields)=>{
        if (error){
            console.log(error);
        }else{
            res.json(results);
        }
    });
});
app.get('/newapro',(req,res)=>{    
    const sql = "SELECT * FROM product2 order by rand() LIMIT 8";
    db.query(sql,(error,results,fields)=>{
        if (error){
            console.log(error);
        }else{
            res.json(results);
        }
    });
});

// ------------------------------------------
// 旻旻
app.use('/discount/total', require(__dirname + '/routes/discount'));

// ------------------------------------------
// 右昕
app.use('/productAll',require(__dirname + '/routes/productAll'));
app.use('/productlist',require(__dirname + '/routes/productContent'));
app.use('/reviews',require(__dirname + '/routes/productReviews'));
app.use('/otherproduct',require(__dirname + '/routes/otherproduct'));
app.use('/postreview',require(__dirname + '/routes/productReviews'));

// ------------------------------------------
// 天鴻
app.use('/product', require(__dirname + '/routes/product'));

// ------------------------------------------
// 宗訓
app.use('/orderListDetail', require(__dirname +'/routes/orderListDetail'));

// ------------------------------------------
app.listen(7777, ()=>{          // 正常啟動會寫這個
    console.log("Run");    
})