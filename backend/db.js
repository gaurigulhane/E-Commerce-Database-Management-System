const oracledb = require('oracledb');
require('dotenv').config();

async function initialize() {
  if (process.env.USE_MOCK === 'true' || !process.env.DB_USER) {
    console.log('Mock mode enabled. Skipping database connection.');
    return;
  }
  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECTION_STRING
    });
    console.log('Successfully connected to Oracle Database');
    await connection.close();
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

const MOCK_PRODUCTS = [
  { PRODUCT_ID: 1, PRODUCT_NAME: 'Premium Wireless Headphones', PRICE: 299, OLD_PRICE: 399, CATEGORY_NAME: 'Electronics', IMAGE_URL: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', RATING: 4.8, REVIEWS: 1240 },
  { PRODUCT_ID: 2, PRODUCT_NAME: 'Minimalist Leather Watch', PRICE: 189, OLD_PRICE: 250, CATEGORY_NAME: 'Accessories', IMAGE_URL: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', RATING: 4.6, REVIEWS: 867 },
  { PRODUCT_ID: 3, PRODUCT_NAME: 'Smart Fitness Tracker Pro', PRICE: 129, OLD_PRICE: 159, CATEGORY_NAME: 'Electronics', IMAGE_URL: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500', RATING: 4.4, REVIEWS: 534 },
  { PRODUCT_ID: 4, PRODUCT_NAME: 'Noise-Cancelling Earbuds', PRICE: 179, OLD_PRICE: null, CATEGORY_NAME: 'Electronics', IMAGE_URL: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500', RATING: 4.7, REVIEWS: 2103 },
  { PRODUCT_ID: 5, PRODUCT_NAME: 'Mechanical Keyboard RGB', PRICE: 149, OLD_PRICE: 199, CATEGORY_NAME: 'Electronics', IMAGE_URL: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500', RATING: 4.5, REVIEWS: 742 },
  { PRODUCT_ID: 6, PRODUCT_NAME: 'Leather Bifold Wallet', PRICE: 49, OLD_PRICE: null, CATEGORY_NAME: 'Accessories', IMAGE_URL: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500', RATING: 4.3, REVIEWS: 398 },
  { PRODUCT_ID: 7, PRODUCT_NAME: 'Ultralight Running Shoes', PRICE: 119, OLD_PRICE: 160, CATEGORY_NAME: 'Sports', IMAGE_URL: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', RATING: 4.6, REVIEWS: 1564 },
  { PRODUCT_ID: 8, PRODUCT_NAME: 'Yoga Mat Premium', PRICE: 59, OLD_PRICE: null, CATEGORY_NAME: 'Sports', IMAGE_URL: 'https://images.unsplash.com/photo-1601925228009-35d0b3c2773e?w=500', RATING: 4.5, REVIEWS: 891 },
  { PRODUCT_ID: 9, PRODUCT_NAME: 'Stainless Insulated Bottle', PRICE: 39, OLD_PRICE: 55, CATEGORY_NAME: 'Sports', IMAGE_URL: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500', RATING: 4.7, REVIEWS: 3201 },
  { PRODUCT_ID: 10, PRODUCT_NAME: 'Linen Oversized Shirt', PRICE: 69, OLD_PRICE: 89, CATEGORY_NAME: 'Clothing', IMAGE_URL: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500', RATING: 4.2, REVIEWS: 215 },
  { PRODUCT_ID: 11, PRODUCT_NAME: 'Slim-Fit Chino Pants', PRICE: 79, OLD_PRICE: null, CATEGORY_NAME: 'Clothing', IMAGE_URL: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500', RATING: 4.3, REVIEWS: 310 },
  { PRODUCT_ID: 12, PRODUCT_NAME: 'Cashmere Crew-Neck Knit', PRICE: 149, OLD_PRICE: 200, CATEGORY_NAME: 'Clothing', IMAGE_URL: 'https://images.unsplash.com/photo-1580331451062-99ff652288f2?w=500', RATING: 4.8, REVIEWS: 128 },
  { PRODUCT_ID: 13, PRODUCT_NAME: 'Scented Soy Candle Set', PRICE: 44, OLD_PRICE: null, CATEGORY_NAME: 'Home', IMAGE_URL: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500', RATING: 4.6, REVIEWS: 612 },
  { PRODUCT_ID: 14, PRODUCT_NAME: 'Minimalist Desk Lamp', PRICE: 89, OLD_PRICE: 110, CATEGORY_NAME: 'Home', IMAGE_URL: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500', RATING: 4.4, REVIEWS: 447 },
  { PRODUCT_ID: 15, PRODUCT_NAME: 'Bamboo Cutting Board Set', PRICE: 34, OLD_PRICE: null, CATEGORY_NAME: 'Home', IMAGE_URL: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=500', RATING: 4.5, REVIEWS: 923 },
  { PRODUCT_ID: 16, PRODUCT_NAME: 'Vitamin C Serum 30ml', PRICE: 38, OLD_PRICE: 52, CATEGORY_NAME: 'Beauty', IMAGE_URL: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500', RATING: 4.7, REVIEWS: 2876 },
  { PRODUCT_ID: 17, PRODUCT_NAME: 'Hydrating Face Moisturizer', PRICE: 55, OLD_PRICE: null, CATEGORY_NAME: 'Beauty', IMAGE_URL: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500', RATING: 4.5, REVIEWS: 1453 },
  { PRODUCT_ID: 18, PRODUCT_NAME: '4K Portable Webcam', PRICE: 99, OLD_PRICE: 129, CATEGORY_NAME: 'Electronics', IMAGE_URL: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500', RATING: 4.3, REVIEWS: 387 },
];

async function execute(sql, binds = [], options = {}) {
  const isMockEnabled = process.env.USE_MOCK === 'true' || !process.env.DB_USER;

  const getMockData = (sql) => {
    console.log('Returning mock data for query:', sql);
    if (sql.includes('FROM Products') || sql.includes('FROM products')) {
      return { rows: MOCK_PRODUCTS };
    }
    if (sql.includes('FROM Users') || sql.includes('FROM users')) {
      return { rows: [{ USER_ID: 1, USERNAME: 'testuser', FULL_NAME: 'Test User' }] };
    }
    return { rows: [], outBinds: { status: 'Success (Mock)' } };
  };

  if (isMockEnabled) {
    return getMockData(sql);
  }

  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECTION_STRING
    });
    const result = await connection.execute(sql, binds, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      autoCommit: true,
      ...options
    });
    return result;
  } catch (err) {
    console.warn('Database connection/query failed. Falling back to mock data.', err.message);
    return getMockData(sql);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

module.exports = { initialize, execute };
