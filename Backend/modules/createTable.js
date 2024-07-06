import db from '../config/dbConfig.js'; 
import colors from 'colors'

let tbl = 0;
const createTableQueries = [
  {
    tableName: 'user',
    query: `
      CREATE TABLE IF NOT EXISTS user (
        user_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        registration_date DATE NOT NULL,
        profile_pic VARCHAR(255) DEFAULT 'default.jpg' NOT NULL
      );
    `
  },  
  {
    tableName: 'orders',
    query: `
      CREATE TABLE IF NOT EXISTS orders (
        order_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_id INT UNSIGNED NOT NULL,
        order_date DATE NOT NULL,
        total_amount BIGINT NOT NULL,
        status VARCHAR(255) NOT NULL,
        CONSTRAINT fk_order_user_id FOREIGN KEY (user_id) REFERENCES user(user_id)
      );
    `
  },
  {
    tableName: 'brand',
    query: `
      CREATE TABLE IF NOT EXISTS brand (
        brand_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        brand_name VARCHAR(255) NOT NULL UNIQUE,
        brand_owner_id INT UNSIGNED NOT NULL UNIQUE,
        CONSTRAINT fk_brand_owner_id FOREIGN KEY (brand_owner_id) REFERENCES user(user_id)
      );
    `
  },
  {
    tableName: 'category',
    query: `
      CREATE TABLE IF NOT EXISTS category (
        category_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        category_name VARCHAR(255) NOT NULL
      );
    `
  },
  {
    tableName: 'product',
    query: `
      CREATE TABLE IF NOT EXISTS product (
        product_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        price INT UNSIGNED NOT NULL,
        stock INT UNSIGNED NOT NULL,
        category_id INT UNSIGNED NOT NULL,
        brand_id INT UNSIGNED NOT NULL,
        image VARCHAR(255) NOT NULL,
        CONSTRAINT fk_product_category_id FOREIGN KEY (category_id) REFERENCES category(category_id),
        CONSTRAINT fk_product_brand_id FOREIGN KEY (brand_id) REFERENCES brand(brand_id)
      );
    `
  },  
  {
    tableName: 'review',
    query: `
      CREATE TABLE IF NOT EXISTS review (
        review_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_id INT UNSIGNED NOT NULL,
        product_id INT UNSIGNED NOT NULL,
        rating INT NOT NULL,
        comment VARCHAR(255) NOT NULL,
        review_date DATE NOT NULL,
        CONSTRAINT fk_review_user_id FOREIGN KEY (user_id) REFERENCES user(user_id),
        CONSTRAINT fk_review_product_id FOREIGN KEY (product_id) REFERENCES product(product_id)
      );
    `
  },
  {
    tableName: 'cart',
    query: `
      CREATE TABLE IF NOT EXISTS cart (
        cart_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_id INT UNSIGNED NOT NULL UNIQUE,
        CONSTRAINT fk_cart_user_id FOREIGN KEY (user_id) REFERENCES user(user_id)
      );
    `
  },
  {
    tableName: 'order_item',
    query: `
      CREATE TABLE IF NOT EXISTS order_item (
        order_item_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        product_id INT UNSIGNED NOT NULL,
        order_id INT UNSIGNED NOT NULL,
        quantity INT UNSIGNED NOT NULL,
        price BIGINT UNSIGNED NOT NULL,
        CONSTRAINT fk_order_item_product_id FOREIGN KEY (product_id) REFERENCES product(product_id),
        CONSTRAINT fk_order_item_order_id FOREIGN KEY (order_id) REFERENCES orders(order_id)
      );
    `
  },
  {
    tableName: 'cart_item',
    query: `
      CREATE TABLE IF NOT EXISTS cart_item (
        cart_item_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        cart_id INT UNSIGNED NOT NULL,
        product_id INT UNSIGNED NOT NULL,
        quantity INT NOT NULL,
        CONSTRAINT fk_cart_item_cart_id FOREIGN KEY (cart_id) REFERENCES cart(cart_id),
        CONSTRAINT fk_cart_item_product_id FOREIGN KEY (product_id) REFERENCES product(product_id)
      );
    `
  }
  
];

// Function to execute table creation queries
export default function createTables() {
  createTableQueries.forEach(({ tableName, query }) => {
    db.query(query, (err, results) => {
      if (err) {
        console.error(`Error creating table '${tableName}':`, err);
      } else {
        tbl++;
        if(tbl >= 9 ) console.log("Database Test : Done".cyan.bold)
      }
    });
  });
}
