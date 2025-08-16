// const express = require('express');
// const cors = require('cors');
// const sequelize = require('./database');
// const Url = require('./models/Url');
// const apiRoutes = require('./api');

// const app = express();
// const PORT = process.env.PORT || 3001;

// //app.use(cors()); 
// app.use(cors({
//   origin: 'https://project-url-shortener-lyart.vercel.app', // your frontend URL
//   methods: ['GET', 'POST'],
//   credentials: true
// }));


// app.use(express.json());
// app.use('/api', apiRoutes);

// app.get('/:shortCode', async (req, res) => {
//   try {
//     const url = await Url.findOne({ where: { shortCode: req.params.shortCode } });
//     if (url) {
//       return res.redirect(url.longUrl);
//     } else {
//       return res.status(404).send('Not Found');
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server error');
//   }
// });

// const startServer = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('✅ Database connection has been established successfully.');
//     await sequelize.sync({ alter: true });
//     console.log('🔄 All models were synchronized successfully.');
//     app.listen(PORT, () => {
//       console.log(`🚀 Server is running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error('❌ Unable to connect to the database:', error);
//   }
// };

// startServer(); 



const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const Url = require('./models/Url');
const apiRoutes = require('./api');

const app = express();

// This CORS setup is correct for your deployed frontend.
app.use(cors({
  origin: 'https://project-url-shortener-lyart.vercel.app',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/:shortCode', async (req, res) => {
  try {
    const url = await Url.findOne({ where: { shortCode: req.params.shortCode } });
    if (url) {
      // Ensure the database connection is ready before redirecting
      await sequelize.authenticate();
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).send('Not Found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Vercel will not use this, but it's good for local development.
const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'production') {
  const startServer = async () => {
    try {
      await sequelize.authenticate();
      console.log('✅ Database connection has been established successfully.');
      await sequelize.sync({ alter: true });
      console.log('🔄 All models were synchronized successfully.');
      app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('❌ Unable to connect to the database:', error);
    }
  };
  startServer();
}

// Export the app instance for Vercel
module.exports = app;