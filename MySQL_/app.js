const express=require('express')
const app=express();
const port=4000;
app.use(express.json())
const router=require('./routes/router')

app.use("/",router)

app.get('/', (req, res)=>{
    res.send('Welcome to the home page.')
})

app.listen(port, 'localhost', ()=>{
    console.log(`Listening to the port num ${port}`);
})