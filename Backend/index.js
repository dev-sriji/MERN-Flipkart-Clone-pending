import express from "express"
import createTables from "./modules/createTable.js"
import db from "./config/dbConfig.js"
import colors from "colors"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.json())
createTables()

app.get('/api/tables', (req, res) => {
    db.query('SHOW TABLES;', (error, results, fields) => {
        if (error) {
            throw error;
        }
        let resp = results.map((result, index) => {
            return result.Tables_in_flipkart
        })
        res.send(resp)
    })
})

// 1. USER API

app.post('/api/user/register/', async (req, res) => {   //1.1. Registration: POST /api/users/register
    const { username, password, email, phone, address, image } = req.body;
    const query = "INSERT INTO `user` (user_name, password, email, phone, address, registration_date, profile_pic) VALUES(?, ?, ?, ?, ?, NOW(), ?)"
    db.query(query, [username, password, email, phone, address, image], (error, result, fields) => {
        if (error) {
            console.error(error)
            res.status(500).send("error creating user")
        }
        res.status(201).json(result)
    })

})

//1.2. Login: POST /api/users/login --pending


app.get('/api/user/profile/', async (req, res) => {     //1.3.1. Get: GET /api/users/profile
    const id = req.query.userid;
    const query = "SELECT * FROM user WHERE user_id = ?"
    db.query(query, [id], (error, result, field) => {
        if (error) throw error
        res.json(result)
    })
})

app.put('/api/user/update/profile/', async (req, res) => {  //1.3.2. Update: PUT /api/users/update/profile AND 1.4. Change Password: PUT /api/users/change-password 
    const { old_password, username, password, email, phone, address, image, userid } = req?.body;
    db.query("SELECT password FROM user WHERE user_id = ?", [userid], (error, result, field) => {
        if (error || (old_password && username && password & email && phone && address && image && userid)) return res.status(500).send("check your fields : " + error)
        if (old_password === result[0]?.password) {
            const query = "UPDATE `user` SET user_name=?, password=?, email=?, phone=?, address=?, profile_pic=? WHERE user_id=?"
            db.query(query, [username, password, email, phone, address, image, userid], (err, result, field) => {
                if (error) res.status(500).send("Error Editing User Data : " + err)
                res.status(200).send(result)
            })
        } else {
            res.status(500).send(old_password + " <==> " + result[0].password + "\nWrong password")
        }
    })
})


// 2.PRODUCT API

app.get('/api/product/list/', async (req, res) => {  //2.1. Get All Products: GET /api/products
    const query = "SELECT * FROM `product`"
    db.query(query, (error, result, field) => {
        if (error) throw error
        res.status(200).json(result)
    })
})

app.get('/api/product/byid', async (req, res) => {   //2.2. Get Product by ID: GET /api/products/:productId
    const id = req.query.productid
    const query = "SELECT * FROM `product` WHERE `product_id` = ?"
    db.query(query, [id], (error, result, field) => {
        if (error) res.status(500).json("error while fetching product data")
        res.status(200).send(result[0])
    })
})


app.post('/api/product/add/', (req, res) => {   //2.3. Add New Product: POST /api/products
    const { name, desc, price, stock, categoryid, brandid, image } = req?.body;
    const query = 'INSERT INTO `product` (product_name, description, price, stock, category_id, brand_id, image) VALUES (?,?,?,?,?,?,?)'
    db.query(query, [name, desc, price, stock, categoryid, brandid, image], (error, result, fields) => {
        if (error) res.status(500).send("Error in query")
        res.status(200).json("product created successfuly. Details")
    })
})

app.put('/api/product/update', (req, res) => {  //2.4. Update Product Details: PUT /api/products/:productId
    const query = "UPDATE `product` SET product_name=? , description=?, price=?, stock =?, category_id= ?, brand_id= ?, image= ? WHERE product_id = ?"
    const { name, desc, price, stock, categoryid, brandid, image, productid } = req?.body;
    db.query(query, [name, desc, price, stock, categoryid, brandid, image, productid], (error, result, field) => {
        if (error) return res.status(500).send("Error in query")
        res.status(200).json("Product updated.")
    })
})

app.delete('/api/product/delete/:id', (req, res) => {   //2.5. Delete Product: DELETE /api/products/:productId
    const productid = req.params?.id
    const query = "DELETE FROM `product` WHERE `product_id` = ?"
    db.query(query, [productid], (error, result, field) => {
        if (error) return res.status(500).send("Error in query")
        res.status(200).json("Deleted product with product id: " + productid)
    })
})

// 3. Category and Brand Management API




app.listen(3000)