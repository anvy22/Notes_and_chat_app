import express from 'express';
import cookieParser from 'cookie-parser'
import 'dotenv/config' 

const app = express();


app.use(express.json({ limit:"16kb" }))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("uploads"))
app.use(cookieParser())

import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'

app.use("/api/auth",authRouter)
app.use('/api/user',userRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server Started At http://localhost:${PORT}`);
    
})