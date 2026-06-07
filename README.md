# 🚀 AI Cloud Cost Detective

An AI-powered AWS Cloud Cost Optimization Dashboard that analyzes AWS billing data, detects cloud cost inefficiencies, identifies unused resources, and provides intelligent recommendations to reduce cloud spending.

---

## 📌 Overview

Managing AWS costs can be challenging as cloud environments grow. AI Cloud Cost Detective helps users understand where money is being spent and provides actionable optimization recommendations.

The application analyzes AWS billing CSV data, detects expensive resources, estimates potential savings, and generates AI-powered recommendations through a modern dashboard.

---

## ✨ Features

### 💰 Cost Analysis

* Upload AWS Billing CSV files
* Analyze total cloud spending
* Service-wise cost breakdown
* Cost distribution visualization

### 🔍 Resource Optimization

* Detect high-cost EC2 instances
* Identify unattached EBS volumes
* Detect idle Elastic IPs
* Identify expensive NAT Gateway usage
* Analyze CloudWatch logging costs

### 🤖 AI Recommendation Engine

* Gemini AI integration
* Intelligent AWS optimization suggestions
* Cost-saving recommendations
* AWS best practices guidance
* Automatic fallback recommendation engine

### 📊 Dashboard & Visualization

* Total AWS Cost Summary
* Optimization Score
* Highest Cost Service Detection
* Estimated Savings
* Interactive Bar Charts
* Interactive Pie Charts

### 📄 Reporting

* Download JSON Reports
* Download PDF Reports
* AI-generated recommendation summary
* Detailed issue reporting

---

## 🏗️ Architecture

```text
                     ┌─────────────┐
                     │    USER     │
                     └──────┬──────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │ React Frontend    │
                  │ (Vite + Recharts) │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │ FastAPI Backend   │
                  │ Python Analyzer   │
                  └─────────┬─────────┘
                            │
         ┌──────────────────┼──────────────────┐
         │                  │                  │
         ▼                  ▼                  ▼
   Cost Analysis      Gemini AI        Report Generator
   Engine             Recommendations  JSON/PDF Export
         │
         ▼
   AWS Billing CSV
```

---

## 🤖 AI Recommendation Flow

```text
AWS Billing CSV
      ↓
FastAPI Analyzer
      ↓
Cost Issue Detection
      ↓
Gemini AI Recommendation Service
      ↓
Fallback Recommendation Engine
      ↓
React Dashboard
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Axios
* Recharts
* jsPDF
* CSS3

### Backend

* FastAPI
* Python
* Pandas
* Uvicorn
* Python Dotenv

### AI

* Google Gemini API
* Custom Fallback Recommendation Engine

### DevOps

* Git
* GitHub
* Docker (In Progress)

---

## 📂 Project Structure

```text
AI-Cloud-Cost-Detective
│
├── Backend
│   ├── services
│   │   ├── cost_analyzer.py
│   │   └── ai_recommender.py
│   │
│   ├── models
│   ├── routes
│   ├── database
│   ├── main.py
│   └── requirements.txt
│
├── Frontend
│   ├── src
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   ├── public
│   └── package.json
│
├── data
│   └── sample-billing-data.csv
│
├── README.md
└── .gitignore
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Abhinavsingh6557/AI-Cloud-Cost-Detective.git

cd AI-Cloud-Cost-Detective
```

---

### Backend Setup

```bash
cd Backend

python -m venv .venv

.venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

API Docs:

```text
http://127.0.0.1:8000/docs
```

---

### Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## 🔌 API Endpoints

### Health Check

```http
GET /health
```

### Analyze Billing Data

```http
GET /analyze
```

### Upload CSV File

```http
POST /upload
```

---

## 📊 Dashboard Metrics

The dashboard displays:

* Total Cloud Cost
* Optimization Score
* Highest Cost Service
* Total Issues Found
* Estimated Savings
* Service-wise Cost Distribution
* AI Recommendations

---

## 📈 Sample Optimizations Detected

### EC2

* Over-provisioned instances
* High compute costs
* Idle instances

### EBS

* Unattached volumes
* Unused storage

### NAT Gateway

* High data transfer costs
* VPC endpoint recommendations

### Elastic IP

* Idle IP detection

### CloudWatch

* Excessive log retention
* High logging costs

---

## 🔮 Future Enhancements

* AWS Cost Explorer API Integration
* AWS SDK (Boto3) Integration
* Real-time AWS Analysis
* User Authentication
* PostgreSQL Database
* Historical Cost Tracking
* Monthly Cost Forecasting
* Docker Deployment
* GitHub Actions CI/CD
* Kubernetes Deployment
* Multi-Cloud Support (AWS + Azure)

---

## 🎯 Learning Outcomes

This project demonstrates:

* FastAPI Development
* React Dashboard Development
* AWS Cost Optimization Concepts
* Cloud FinOps Fundamentals
* REST API Design
* Data Visualization
* AI Integration
* Report Generation
* Git & GitHub Workflow
* DevOps Best Practices

---

## 📸 Screenshots

Add screenshots here:

### Dashboard

```text
screenshots/dashboard.png
```

### Cost Charts

```text
screenshots/charts.png
```

### AI Recommendations

```text
screenshots/recommendations.png
```

---

## 👨‍💻 Author

### Abhinav Singh

GitHub:
https://github.com/Abhinavsingh6557

LinkedIn:
https://www.linkedin.com/in/abhinav-singh-374ba3216/

---

⭐ If you found this project useful, please consider giving it a star.
