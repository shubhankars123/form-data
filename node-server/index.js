const express = require("express")
const app = express();
const cors = require("cors")
const bodyParser = require('body-parser')
const mongoose = require("mongoose")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log(`Database connected`)
}

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    phone : Number,
    amount : Number,
    promocode : String,
    discAmount : Number,
    createdAt: { type: Date, expires: '30m', default: Date.now() }
})

const User = mongoose.model('User', userSchema)

// middleware
app.use(cors())    // Cross-origin 
app.use(bodyParser.json())

app.post('/demo', async(req, res)=> {

    const { username, email, phone, amount, promocode, discAmount } = req.body;

    let user = await User.create({
        username,
        email,
        phone,
        amount,
        promocode,
        discAmount
    })

    console.log(user)
    res.json(user)
})

app.get('/demo', async(req,res)=>{
    const docs = await User.find({})
    res.json(docs)
})

app.listen(8080, ()=>{
    console.log(`Server Started`)
})

