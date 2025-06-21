# Real-Time Analytics Dashboard



A full-stack, real-time analytics dashboard built from scratch. This application demonstrates a complete data pipeline: it captures user events via an API, processes them using a powerful database aggregation engine, and pushes live updates to a dynamic frontend dashboard using WebSockets.

This project was built as an advanced backend assignment to showcase skills in handling large data volumes, fast updates, and real-time communication protocols.

---

## ✨ Features

- **Real-Time Event Tracking**: A robust API endpoint (`/api/track`) to ingest a high volume of user events.
- **Live Dashboard Updates**: The server pushes data to all connected clients instantly using **Socket.IO (WebSockets)**, eliminating the need for polling or page refreshing.
- **Dynamic Data Visualization**: The frontend uses **Chart.js** to render and update several key metrics:
  - **Health Metrics**: A live count of total events today.
  - **Event Distribution**: A donut chart showing the breakdown of different event types (e.g., `pageView`, `click`, `formSubmit`).
  - **Top Pages**: A horizontal bar chart displaying the most viewed pages.
  - **Top Users**: A bar chart identifying the most active users by event count.
- **Efficient Data Aggregation**: The backend leverages **MongoDB's Aggregation Pipeline** to perform complex data analysis on the server, ensuring the frontend only receives pre-processed, display-ready information.
- **Scalable Architecture**: The clear separation of concerns between the API, real-time layer, and database logic makes the system easy to maintain and scale.

---


## Screenshots- Of Dashboard
![Screenshot (1210)](https://github.com/user-attachments/assets/87a7e8ca-2a5a-4442-9454-23a1f03ddd7c)
![Screenshot (1211)](https://github.com/user-attachments/assets/9e74da8f-586c-496d-a0c7-2415b7354b07)



## 🛠️ Technology Stack

This project was built using the **JavaScript (MERN-like) stack**:

- **Backend**: **Node.js** with **Express.js** for the server and API routing.
- **Database**: **MongoDB** with **Mongoose** for flexible data modeling and powerful queries.
- **Real-Time Engine**: **Socket.IO** for bidirectional, event-based communication.
- **Frontend**: Vanilla **HTML5**, **CSS3**, and **JavaScript (ES6+)**.
- **Charting**: **Chart.js** for creating beautiful, responsive, and animated charts.
- **Development Tools**: **Nodemon** for live server reloading and **Git** for version control.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your machine:
- [Node.js](https://nodejs.org/en/download/) (which includes npm)
- [Git](https://git-scm.com/downloads/)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### Installation & Setup

1.  **Clone the repository:**
    Open your terminal and clone the project to your local machine.

    ```bash
    git clone https://github.com/darkflayer/real-time-analytics-dashboard.git
    cd real-time-analytics-dashboard
    ```

2.  **Install backend dependencies:**
    Navigate to the project directory and install the required npm packages.

    ```bash
    npm install
    ```

3.  **Configure the database connection:**
    - Open the `config/db.js` file.
    - Change the `MONGO_URI` constant to point to your local or cloud-hosted MongoDB instance.

    ```javascript
    // example for a local database named 'analyticsDB'
    const MONGO_URI = 'mongodb://127.0.0.1:27017/analyticsDB'; 
    ```

4.  **Start the server:**
    Run the start script to launch the backend server with Nodemon.

    ```bash
    npm start
    ```

    The server will be running on `http://localhost:3001` and will automatically connect to your MongoDB database.

---

## Usage

Once the server is running, you can interact with the system in two ways:

1.  **View the Dashboard:**
    Open your web browser and navigate to `http://localhost:3001`. You will see the live dashboard interface. Initially, it will be empty.

2.  **Send Test Events:**
    Use an API client like **Postman** or `curl` to send `POST` requests to the tracking endpoint. As you send events, the dashboard will update in real time.

    **Endpoint:** `POST http://localhost:3001/api/track`
    
    **Headers:** `Content-Type: application/json`

    **Sample Request Body:**
    ```json
    {
        "eventType": "pageView",
        "userId": "user-alpha-123",
        "details": {
            "pageUrl": "/products/awesome-widget",
            "referrer": "google.com"
        }
    }
    ```
    
    **Another Sample:**
    ```json
    {
        "eventType": "click",
        "userId": "user-beta-456",
        "details": {
            "buttonId": "buy-now-button",
            "elementText": "Purchase Now"
        }
    }
    ```

---

## Project Structure
