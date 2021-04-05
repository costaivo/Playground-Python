const express = require('express');
const isPalindrome = require('./js-t1.js');
const app = express();

app.get('/',(req,res)=>{
    res.send('JavaScript Problems & Solutions');
});

app.get('/api/js/t1',(req,res)=>{
    res.send('JS-T1');
});

app.get('/api/js/t2',(req,res)=>{
    res.send('JS-T2');
});


app.get('/api/js/t1/isPalindrome/:inputString',(req,res)=>{
    res.send(req.params);
});

app.get('/api/js/tasks2/:year/:month',(req,res)=>{
    res.send(req.params);
});

app.get('/api/js/tasks3',(req,res)=>{
    res.send(req.query);
});

app.get('/api/t1',(req,res)=>{
    console.log(req.query.str)
    const isvalid = isPalindrome(req.query.str)
    
    if (isvalid){
    res.send(`${req.query.str} is  a Palindrome`);
    }
    else 
    res.send(`${req.query.str} is not a Palindrome`);
});

app.listen(3000,()=>{
    console.log('Listing on port 3000');
})