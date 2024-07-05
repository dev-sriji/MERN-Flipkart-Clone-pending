import express from "express"
import createTables from "./modules/createTable.js"
import db from "./config/dbConfig.js"
import colors from "colors"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.json())
createTables()

app.get('/api/tables', (req,res) => {
    db.query('SHOW TABLES;',(error,results,fields) => {
        if(error) {
            throw error;
        } 
        let resp = results.map((result,index) => {
            return result.Tables_in_flipkart
        })
        res.send(resp)
    })
})


app.post('/api/users/register/', async (req, res) => {
        const { username, password, email, phone, address, image } = req.body;
        const query = "INSERT INTO `user` (user_name, password, email, phone, address, registration_date, profile_pic) VALUES(?, ?, ?, ?, ?, NOW(), ?)"
        db.query(query,[username, password, email, phone, address, image],(error,result,fields) => {
            if(error){
                console.error(error)
                res.status(500).send("error creating user")
            }
            res.status(201).json(result)
        })
    
})

app.put('/api/users/update/profile/', async(req,res) => {
    const {old_password, username, password , email, phone, address, image, userid} = req.body;
    db.query("SELECT password FROM user WHERE user_id = ?",[userid],(error,result,field) => {
        if(old_password===result[0].password){
            const query = "UPDATE `user` SET user_name=?, password=?, email=?, phone=?, address=?, profile_pic=? WHERE user_id=?"
            db.query(query,[username, password, email, phone, address, image, userid],(err,result,field) => {
                if(error) res.status(500).send("Error Editing User Data : " + err)
                res.status(200).send(result)
            })
       } else {
            res.status(500).send(old_password + result[0].password + "\nError While Updating User : " + error)
       }
    })
})

app.get('/api/users/profile/', async (req,res) => {
    const id = req.query.userid;
    const query = "SELECT * FROM user WHERE user_id = ?"
    db.query(query,[id],(error,result,field) => {
        res.json(result)
    })
})




app.get('/', (req,res) => {
    res.send('Hello World !')
    console.log(req)
})


app.listen(3000)