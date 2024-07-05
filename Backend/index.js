import express from "express"
import createTables from "./modules/createTable.js"
import db from "./config/dbConfig.js"
import colors from "colors"

const app = express()
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


/*{
  "username": "johndoe",
  "password": "securepassword",
  "email": "johndoe@example.com",
  "phone": "1234567890",
  "address": "123 Main St, Anytown, USA"
}
*/

app.post('/api/users/register', (req, res) => {
  console.log(req.body)
  res.json(req.body)
})

app.get('/', (req,res) => {
    res.send('Hello World !')
    console.log(req)
})


app.listen(3000)