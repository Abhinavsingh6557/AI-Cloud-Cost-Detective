\# AI Cloud Cost Detective



An AI-powered AWS Cloud Cost Optimization Dashboard that analyzes cloud billing data, identifies cost inefficiencies, detects unused resources, and provides actionable recommendations to reduce cloud spending.



\---



\## Features



\### Cost Analysis



\* Upload AWS billing CSV files

\* Analyze cloud spending automatically

\* Service-wise cost breakdown

\* Total cost summary



\### Optimization Engine



\* Detect high-cost EC2 instances

\* Identify unattached EBS volumes

\* Find idle Elastic IPs

\* Detect expensive NAT Gateway usage

\* Analyze CloudWatch log costs



\### AI Recommendations



\* Automated optimization suggestions

\* Cost reduction opportunities

\* Resource right-sizing guidance

\* AWS best practices recommendations



\### Dashboard



\* Interactive cost dashboard

\* Cost Optimization Score

\* Bar Chart visualization

\* Pie Chart distribution analysis

\* Issue tracking dashboard



\### Reporting



\* Download JSON reports

\* Download PDF reports

\* Detailed issue analysis

\* Cost-saving estimation



\---



\## Architecture



```text

User

&#x20;│

&#x20;▼

React Frontend

&#x20;│

&#x20;▼

FastAPI Backend

&#x20;│

&#x20;├── CSV Upload API

&#x20;├── Cost Analysis Engine

&#x20;├── AI Recommendation Engine

&#x20;└── Report Generator

&#x20;│

&#x20;▼

AWS Billing Data

```



\---



\## Tech Stack



\### Frontend



\* React.js

\* Axios

\* Recharts

\* jsPDF



\### Backend



\* FastAPI

\* Python

\* Pandas

\* Uvicorn



\### DevOps



\* Git

\* GitHub

\* Docker (In Progress)



\---



\## Project Structure



```text

AI-Cloud-Cost-Detective

│

├── backend

│   ├── services

│   ├── routes

│   ├── models

│   ├── uploads

│   ├── main.py

│   └── requirements.txt

│

├── frontend

│   ├── src

│   ├── public

│   ├── package.json

│   └── vite.config.js

│

├── data

│   └── sample-billing-data.csv

│

├── docker-compose.yml

├── README.md

└── .gitignore

```



\---



\## Installation



\### Backend



```bash

cd backend



python -m venv .venv



.venv\\Scripts\\activate



pip install -r requirements.txt



uvicorn main:app --reload

```



Backend URL:



```text

http://127.0.0.1:8000

```



\---



\### Frontend



```bash

cd frontend



npm install



npm run dev

```



Frontend URL:



```text

http://localhost:5173

```



\---



\## API Endpoints



\### Health Check



```http

GET /health

```



\### Analyze Default Dataset



```http

GET /analyze

```



\### Upload Billing CSV



```http

POST /upload

```



\---



\## Sample Output



\### Dashboard Metrics



\* Total Cost

\* Optimization Score

\* Highest Cost Service

\* Total Issues

\* Estimated Savings



\### Visualizations



\* Cost Distribution Pie Chart

\* Service-wise Cost Bar Chart



\---



\## Future Enhancements



\* AWS Cost Explorer API Integration

\* AWS SDK (Boto3)

\* User Authentication

\* Historical Analysis

\* Cost Forecasting

\* Gemini AI Integration

\* Docker Deployment

\* CI/CD Pipeline

\* Kubernetes Deployment



\---



\## Learning Outcomes



\* FastAPI Development

\* React Dashboard Development

\* AWS Cost Optimization Concepts

\* Cloud FinOps Fundamentals

\* Data Visualization

\* REST API Development

\* Report Generation

\* DevOps Best Practices



\---



\## Author



\*\*Abhinav Singh\*\*



GitHub:

https://github.com/Abhinavsingh6557



LinkedIn:

https://www.linkedin.com/in/abhinav-singh-374ba3216/



