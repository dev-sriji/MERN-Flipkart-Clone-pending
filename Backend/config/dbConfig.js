import mysql from "mysql"

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'srijith',
    password: 'srijith',
    database: 'flipkart'
});

db.connect(err => {
    if(err) {
        console.error("error code : 5064 : " + err)
        console.log("Connected To The Database")
    }

})

export default db;