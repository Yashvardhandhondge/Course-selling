const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
app.use(express.json())
const port = 3000;
require('dotenv').config()
console.log(process.env.MONGO_URL)


const {adminRouter} = require('./routes/admin');
const {userRouter} = require('./routes/user');

app.use('/user',userRouter)
app.use('/admin',adminRouter)

async function main(){
	try{

	await mongoose.connect(process.env.MONGO_URL)
		console.log("Mongodb connected")
	}catch(e){
		console.error(e);
	}
}
main()
app.listen(port,()=>{
	console.log(`App is listening to the port ${port}`);
})
