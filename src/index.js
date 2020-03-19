const express = require('express');  //express是原本建服務器的功能都可以用在額外添加新功能

const app = express();  // express所有都有順序性

// 註冊樣版引擎
app.set('view engine', 'ejs');
// 設定views路徑 (選擇性設定)，如果命名都對就不用寫
// app.set('views', __dirname + '/../views');
app.get('/', (req, res) => {            //  '/'根目錄
    // res.send(`<h2>Hello World</h2>`)   
    res.render('home', {name: 'Hi'});      // send rander end json 只能用一個

});
app.get('/xxx', (req, res) => {     
    res.send(`<h2>XXX</h2>`)   

});

app.get('/sales', (req, res) => {     
    const data = require(__dirname + '/../data/sales');
    // res.send(`<h2>${data[0].name}</h2>`);
    res.render('sales-table', {sales: data});
});

// app.get('/test.html', (req, res) => {     // 如果有相同路徑就會覆蓋掉後面的
//     res.send(`<h2>AAA</h2>`)              // 所以順序很重要

// });


app.use(express.static('public'));  // 靜態表示不會再動，放所有動態路由後面
// app.use(express.static(__dirname + '/../public'));

app.use((req, res)=>{
    res.type('text/html');
    res.status(404);               // 404要放在所有路由的後面，因為他會直接結束
    res.send(`                        
        path: ${req.url}</br>
        <h2>404 - 找不到網頁</h2>
    `);
});

app.listen(3000, ()=>{          // 正常啟動會寫這個
    console.log("Run");
    
})