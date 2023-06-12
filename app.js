const express = require("express")
const mongoose = require('mongoose');
const userRouter=require("./router/user")
const venderRouter=require("./router/vender")
const categoryRouter=require("./router/category") 
const assetRouter=require("./router/assets") 

const app = express();
app.use(express.json());



mongoose.connect("mongodb://127.0.0.1:27017/mydatabase")
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log("mongodb err", err)) 
    
app.use("/user", userRouter)
app.use("/vender", venderRouter)
app.use("/category",categoryRouter)
app.use("/asset",assetRouter)
app.listen(3000, () => {
    console.log('Server started on port 3000');
});