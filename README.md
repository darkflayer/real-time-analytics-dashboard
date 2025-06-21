# Real-Time Analytics Dashboard

A full-stack application that processes and visualizes real-time data analytics. This project tracks user events on a website (like page views and clicks) and displays live, aggregated metrics on a dynamic dashboard.

## Live Demo

[Link to your deployed application - if you deploy it later]

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Real-Time Communication:** Socket.IO (WebSockets)
- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Charting Library:** Chart.js

## Features

- Real-time event tracking via a POST API endpoint.
- Live dashboard updates pushed from the server using WebSockets.
- Aggregated data visualization for:
  - Total events today
  - Events by type (donut chart)
  - Top 5 pages by views (horizontal bar chart)
  - Top 5 users by activity (bar chart)
- Efficient data processing using MongoDB's Aggregation Pipeline.

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/darkflayer/real-time-analytics-dashboard.git
    cd real-time-analytics-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your database:**
    Make sure you have a running MongoDB instance. Update the connection string in `config/db.js`.

4.  **Start the server:**
    ```bash
    npm start
    ```
    The server will run on `http://localhost:3001`.

5.  **Test the system:**
    - Open the dashboard at `http://localhost:3001` in your browser.
    - Use a tool like Postman to send `POST` requests to `http://localhost:3001/api/track` to see the dashboard update in real time.
