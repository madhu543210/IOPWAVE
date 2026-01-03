IOPWAVE – IoT-Based Glaucoma Monitoring System

IOPWAVE (GlaucoGuard) is an IoT-based, non-invasive glaucoma monitoring system designed to measure and track Intraocular Pressure (IOP) in real time.
The system aims to support early glaucoma detection and continuous monitoring, improving accessibility and affordability compared to traditional clinical methods.

🚀 Key Features

Real-time IOP monitoring using IoT sensors

Cloud-based data storage with Firebase Realtime Database

Interactive web dashboard with live charts

Manual IOP risk assessment based on medical factors

Secure demo login system for controlled access

Responsive and user-friendly UI

🧠 Problem Statement

Glaucoma is a leading cause of irreversible blindness worldwide.
Current IOP measurement methods are:

Expensive

Clinic-dependent

Not suitable for continuous monitoring

IOPWAVE addresses this gap by providing a portable, cloud-connected solution for frequent and remote IOP tracking.

🛠️ System Architecture

Hardware Layer

ESP32 microcontroller

Ultrasonic / pressure-based sensing for corneal deformation

Data Layer

Firebase Realtime Database

Live streaming of sensor values

Application Layer

Web-based dashboard

Real-time charts using Chart.js

Risk analysis module

📊 Dashboard Capabilities

Displays current IOP value and status (Low / Normal / High)

Plots IOP history graph (last N readings)

Shows device measurement status

Manual glaucoma risk prediction using:

IOP value

Age

Family history

Medical conditions

🔐 Authentication (Demo Mode)

This project uses a demo login system (Firebase Auth disabled).

Demo Credentials

Email: admin@gmail.com
Password: madhu@123


Session handling is implemented using browser session storage.

🧪 Risk Assessment Logic

Risk level is computed based on:

IOP thresholds

Age group

Family history

Existing medical conditions

Risk categories:

Low Risk

Moderate Risk

High Risk

💻 Tech Stack

Frontend

HTML5

CSS3

JavaScript (Vanilla)

Chart.js

Backend / Cloud

Firebase Realtime Database

Hardware

ESP32

Ultrasonic sensing

📂 Project Structure
├── index.html        # Login page
├── home.html         # Informational landing page
├── dashboard.html    # Monitoring dashboard
├── style.css         # Global styles
├── script.js         # Core logic (auth, charts, Firebase)
└── README.md

⚙️ Setup Instructions

Clone the repository

git clone https://github.com/your-username/iopwave.git


Open index.html in a browser

Login using demo credentials

Navigate to Dashboard to view live data

No backend server is required.

📈 Future Enhancements

Role-based access (Doctor / Patient)

Historical data analytics (daily / weekly trends)

Mobile application integration

Secure authentication with owned Firebase project

Alert notifications for abnormal IOP spikes


🏆 Academic Relevance

This project demonstrates:

IoT + Cloud integration

Real-time data visualization

Healthcare-focused system design

Practical problem solving using engineering principles

Suitable for:

Final year projects

Hackathons

Portfolio & placements

📄 License

This project is for academic and educational purposes.
