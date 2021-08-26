import express from "express";
import mysql from "mysql2";
import cors from "cors";
import defExp from "./encryptionHandle.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const PORT = 5000;

const db = mysql.createConnection({
    'user': 'root',
    'host': 'localhost',
    'password': 'root1234',
    'database': 'passwordsdb',
});

const {encrypt, decrypt} = defExp;

app.post("/db", (req, res) => {
    const {pwd, account} = req.body;

    const enpwd = encrypt(pwd);

    db.query("insert into password(pwd, account, iv) values(?, ?, ?);", [enpwd.pwd, account, enpwd.iv], 
    (err, result)=>{
        if(err)
        console.log(err);
        else
        res.send(result); 
    })
});

app.get("/db", (req, res)=>{

    db.query("select * from password;", (err, result)=>{
        if(err)
        console.log(err);
        else
        res.send(result); 
    });
});

app.post("/dec", (req, res) => {
    res.send(decrypt(req.body));
   
} );
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
