// index.js

const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const connectDB = require('./config/db');
connectDB();
const Event = require('./models/event.model.js');

// --- Basic Setup ---
const app = express();
app.use(cors()); // Use cors middleware
app.use(express.json());
app.use(express.static('public'));
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for simplicity. In production, restrict this.
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3001;

const getDashboardStats = async () => {
  // Get the start and end of the current day
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  try {
    // We run all aggregation queries in parallel for efficiency
    const [
      totalEventsToday,
      eventsByType,
      topPages,
      topUsers
    ] = await Promise.all([
      // 1. Total Events Today (for the "Health" widget)
      Event.countDocuments({
        timestamp: { $gte: todayStart, $lte: todayEnd }
      }),

      // 2. Events by Type (for the "Tasks" donut chart)
      Event.aggregate([
        { $match: { timestamp: { $gte: todayStart, $lte: todayEnd } } },
        { $group: { _id: '$eventType', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),

      // 3. Top 5 Pages by Views (for the "Progress" bar chart)
      Event.aggregate([
        { $match: { eventType: 'pageView', timestamp: { $gte: todayStart, $lte: todayEnd } } },
        { $group: { _id: '$details.pageUrl', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]),

      // 4. Top 5 Users by Activity (for the "Workload" bar chart)
      Event.aggregate([
        { $match: { timestamp: { $gte: todayStart, $lte: todayEnd } } },
        { $group: { _id: '$userId', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ])
    ]);

    return { totalEventsToday, eventsByType, topPages, topUsers };

  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {}; // Return empty object on error
  }
};
// --- A simple route to check if the server is up ---
app.get('/', (req, res) => {
  res.send('<h1>Analytics Server is Running!</h1>');
});

app.post('/api/track', async (req, res) => {
  try {
    // Create a new event object from the request body
    const newEvent = new Event({
      eventType: req.body.eventType,
      userId: req.body.userId,
      details: req.body.details,
    });

    // Save the event to the database
    await newEvent.save();

    const stats = await getDashboardStats();
    io.emit('dashboardUpdate', stats);


    // Send a success response back to the sender
    res.status(201).json({
      message: 'Event tracked successfully!'
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error tracking event',
      error: error.message,
    });
  }
});

// --- Socket.io Connection Logic ---
io.on('connection', async (socket) => { // Make this async
  console.log('A user connected with socket id:', socket.id);

  // **NEW:** Send the initial dashboard stats when a client first connects
  const stats = await getDashboardStats();
  socket.emit('dashboardUpdate', stats);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// --- Start the Server ---
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});