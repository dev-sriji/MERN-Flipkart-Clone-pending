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
app.post('/api/user/auth/', (req, res) => {
    const { id, email, password } = req?.body;
    if (!password || (!email && !id)) return res.status(501).json({ "result": "check your fields" })
    db.query("SELECT * FROM user WHERE (user_id = ? AND password = ?) OR (email = ? AND password = ?);", [id, password, email, password], (error, result, fields) => {
        if (result.length > 0) {
            return res.status(200).json({
                "allowUserToLogin": true,
                "reason": result
            })
        } else {
            res.status(500).send({
                "allowUserToLogin": false,
                "reason": "Invalid credentials"
            })
        }
    })
})

app.get('/api/user/profile/', async (req, res) => {     //1.3.1. Get: GET /api/users/profile
    const id = req.query.userid;
    const query = "SELECT * FROM user WHERE user_id = ?"
    db.query(query, [id], (error, result, fields) => {
        if (error) return res.status(500).json({ "result": error })
        res.status(200).json(result)
    })
})

app.put('/api/user/update/profile/', async (req, res) => {  //1.3.2. Update: PUT /api/users/update/profile AND 1.4. Change Password: PUT /api/users/change-password 
    const { old_password, username, password, email, phone, address, image, userid } = req?.body;
    db.query("SELECT `password` FROM `user` WHERE `user_id` = ?", [userid], (error, result, field) => {
        if (error || (old_password && username && password & email && phone && address && image && userid)) return res.status(500).send("check your fields : " + error)
        if (old_password === result[0]?.password) {
            const query = "UPDATE `user` SET user_name=?, password=?, email=?, phone=?, address=?, profile_pic=? WHERE user_id=?"
            db.query(query, [username, password, email, phone, address, image, userid], (err, result, fields) => {
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
    db.query(query, (error, result, fields) => {
        if (error) throw error
        res.status(200).json(result)
    })
})

app.get('/api/product/fetch', async (req, res) => {   //2.2. Get Product by ID: GET /api/products/:productId
    const id = req.query.productid
    const query = "SELECT * FROM `product` WHERE `product_id` = ?"
    db.query(query, [id], (error, result, fields) => {
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
    db.query(query, [name, desc, price, stock, categoryid, brandid, image, productid], (error, result, fields) => {
        if (error) return res.status(500).send("Error in query")
        res.status(200).json("Product updated.")
    })
})

app.delete('/api/product/delete/:id', (req, res) => {   //2.5. Delete Product: DELETE /api/products/:productId
    const productid = req.params?.id
    const query = "DELETE FROM `product` WHERE `product_id` = ?"
    db.query(query, [productid], (error, result, fields) => {
        if (error) return res.status(500).send("Error in query")
        res.status(200).json("Deleted product with product id: " + productid)
    })
})

// 3. CATEGORY and BRAND Management API

app.get('/api/category/list/', (req, res) => {  //3.1. Get All Categories: GET /api/categories
    const query = "SELECT *  FROM   `category`"
    db.query(query, (error, result, fields) => {
        if (error) res.status(500).json("Error")
        res.status(200).json(result)
    })
})


app.get('/api/category/fetch', (req, res) => {   //3.2. Get Category by ID: GET /api/categories/:categoryId
    const id = req.query.id;
    const query = "SELECT * FROM `category` WHERE category_id = ?"
    db.query(query, [id], (error, result, fields) => {
        if (error) res.status(500).json("Error")
        if (!result[0]) res.status(201).json({ "notExists": true })
        res.status(200).json(result[0])
    })
})

app.get('/api/brand/list/', (req, res) => {  //3.3. Get All Brands: GET /api/brands
    const query = "SELECT *  FROM   `brand`"
    db.query(query, (error, result, fields) => {
        if (error) res.status(500).json("Error")
        res.status(200).json(result)
    })
})

app.get('/api/brand/fetch', (req, res) => {   //3.4. Get Brand by ID: GET /api/brands/:brandId
    const id = req.query.id;
    const query = "SELECT * FROM `brand` WHERE brand_id = ?"
    db.query(query, [id], (error, result, fields) => {
        if (error) res.status(500).json("Error")
        if (!result[0]) res.status(201).json({ "notExists": true })
        res.status(200).json(result[0])
    })
})

//4. CART and Checkout API

app.post('/api/cart/create', (req, res) => {    //4.0 create cart
    const userid = req.body.userid;
    const query = "INSERT INTO `cart` (user_id) VALUES (?)"
    db.query(query, [userid], (error, result, fields) => {
        if (error) res.status(500).json("Error")
        res.status(200).json("cart created successfuly")
    })
})

app.post('/api/cart/add', (req, res) => {   //4.1. Add Item to Cart: POST /api/cart/add
    const { cartid, productid, quantity } = req.body;

    const query1 = "SELECT `product_name` FROM `product` WHERE `product_id` = ?";
    const query2 = "SELECT `user_id` FROM `cart` WHERE `cart_id` = ?";
    const query3 = "INSERT INTO `cart_item` (cart_id, product_id, quantity) VALUES (?, ?, ?)";

    db.query(query1, [productid], (error1, result1) => {
        if (error1) {
            return res.status(500).json({ "Error": error1 });
        }
        if (result1.length > 0) {
            db.query(query2, [cartid], (error2, result2) => {
                if (error2) {
                    return res.status(500).json({ "Error": error2 });
                }
                if (result2.length > 0) {
                    db.query(query3, [cartid, productid, quantity], (error3, result3) => {
                        if (error3) {
                            return res.status(500).json({ "Error": error3 });
                        }
                        return res.status(200).json({ "result": "Added item successfully" });
                    });
                } else {
                    return res.status(500).json({ "result": "Error: No such cart with that id" });
                }
            });
        } else {
            return res.status(500).json({ "result": "Error: No such product with that id" });
        }
    });
});

app.get('/api/cart/fetch', (req, res) => {  //4.2. Get Cart Items: GET /api/cart/items
    const cartid = req.query.cartid
    const query = "SELECT * FROM `cart_item` WHERE cart_id = ?"
    db.query('SELECT * FROM `cart` WHERE cart_id = ?', [cartid], (error1, result1, field1) => {
        if (error1) return res.status(500).json({ "Error": error1 })
        if (result1.length < 1) return res.status(500).json({ "result": "Error: No such cart with that id" });
        db.query(query, [cartid], (error, result, fields) => {
            if (error) return res.status(500).json({ "result": "Error While Fetching Cart items : " + error })
            return res.status(200).json(result)
        })
    })
})


app.put('/api/cartitem/update', (req, res) => {    //4.3. Update Cart Item Quantity: PUT /api/cart/items/:cartItemId
    const { cartitemid, quantity } = req?.body
    db.query("SELECT * FROM cart_item WHERE cart_item_id = ?", [cartitemid], (error, result, field) => {
        if (result.length > 0) {
            const query = "UPDATE `cart_item` SET quantity = ? WHERE cart_item_id=?"
            db.query(query, [quantity, cartitemid], (err, result, fields) => {
                if (error) res.status(500).send("Error Updating Cart Item : " + err)
                res.status(200).send(result)
            })
        } else {
            res.status(500).send({ "result": "Error : " + error })
        }
    })
})

app.delete('/api/cartitem/delete/:id', (req, res) => {    //4.4. Remove Item from Cart: DELETE /api/cart/items/:cartItemId
    const cartitemid = req?.params?.id
    db.query("SELECT * FROM `cart_item` WHERE `cart_item_id` = ?", [cartitemid], (error, result, field) => {
        console.log(result)
        if (result.length > 0) {
            const query = "DELETE FROM `cart_item` WHERE `cart_item_id`=?"
            db.query(query, [cartitemid], (error1, result1, fields1) => {
                if (error1) res.status(500).send("Error Deleting Cart item : " + err)
                res.status(200).send(result1)
            })
        } else {
            res.status(500).send({ "result": "Error : " + error })
        }
    })
})

//4.5. Place Order: POST /api/orders/place
app.post("/api/order/place/", (req, res) => {
    const { userid, cartid } = req.body;
    const insertOrderQ = "INSERT INTO `orders` (user_id, order_date, total_amount, status) VALUES (?, NOW(), -1, 'pending');"
    db.query(insertOrderQ, [userid], (error, result, fields) => {
        if (error) {
            return res.status(500).json({ "result": "error", "message": error.message });
        }

        const orderID = result.insertId;

        const selectQ = "SELECT ci.product_id, ci.quantity, p.price FROM `cart_item` ci JOIN `product` p ON ci.product_id = p.product_id WHERE ci.cart_id = ?;"
        db.query(selectQ, [cartid], (error1, result1, fields1) => {
            if (error) {
                return res.status(500).json({ "result": "error", "message": error1.message });
            }
            // res.status(500).json(result1)
            if (result1.length < 1) {
                return res.status(500).json({ "result": "error", "message": error1.message });
            }
            let status = true;
            result1.forEach(item => {
                const { product_id, quantity, price } = item;
                const insertQ = "INSERT INTO `order_item` (product_id, order_id, quantity, price) VALUES (?, ?, ?, ?)";
                db.query(insertQ, [product_id, orderID, quantity, price], (error2, result2, fields2) => {
                    if (error2) {
                        console.log(error2)
                        status = false
                    }
                    else {
                        console.log(result)
                        status = true
                    }
                })
            });
            if (!status) return res.status(500).json("error");
            return res.status(200).json("successfull")
        })

    })
})

app.listen(3000)