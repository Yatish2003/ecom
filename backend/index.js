const express =require('express');
const route=require('./Routes/routes.js')
const creds=require('./Routes/creds.js')
var cors = require('cors')
const app=express();
const PORT=5000;


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors())
app.use('/api/product',route);
app.use('/credentials',creds)



app.listen(PORT,()=>{
    console.log(`Server is listning on port http://localhost:${PORT}/api/product`);
})