//npm i express
const express = require('express')
const app = express()

app.get('/api/courses', (req, res) => {
    setTimeout(() => {
        res.json([{ name: 'web全栈', price: 8999 }, { name: 'web高级', price: 8888 }])
    }, 1000);
})

app.listen(3000)

//启动接口服务器
//node ./server/api.js