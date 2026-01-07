# Mini Cloud Security Posture Management (CSPM)

This project is a simplified Cloud Security Posture Management (CSPM) application designed to provide visibility into an AWS environment's security posture. It scans for common misconfigurations in EC2 and S3, assesses them against predefined security policies, and presents the findings in a clean web dashboard.

## Architecture

The application consists of two main components:

-   **Backend**: A Python-based API built with **FastAPI**. It accepts AWS credentials, uses `boto3` to scan AWS resources, and runs a security analysis engine to identify risks.
-   **Frontend**: A JavaScript application built with **React** and **Material-UI**. It provides a dashboard to input credentials and visualize the scan results.

The two components are designed to run concurrently and communicate via REST API calls.

## Prerequisites

Before you begin, ensure you have the following installed:
-   Python 3.8+
-   pip (for Python package management)
-   Node.js 14+
-   npm (for JavaScript package management)

## Setup and Running the Application

Follow these steps to get the application running locally.

### 1. Backend Setup

First, set up and run the FastAPI backend server.

```bash
# 1. Navigate to the project root directory
# (This is the directory containing this README file)

# 2. Create and activate a virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate

# On Windows, use:
# venv\Scripts\activate

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Start the backend server
uvicorn main:app --reload
```
The backend API will now be running at `http://localhost:8000`.

*Note: You may need to create a `requirements.txt` file if one does not exist. Based on the project, it should contain `fastapi`, `uvicorn`, `boto3`, and `python-dotenv`.*

### 2. Frontend Setup

In a **new terminal window**, set up and run the React frontend.

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install JavaScript dependencies
npm install

# 3. Start the frontend development server
npm start
```

The frontend will open automatically in your browser at `http://localhost:3000`.

### 3. Usage

1.  Once the frontend is loaded, you will see a "Start Scan" button.
2.  Click the button to open the credentials modal.
3.  Enter a valid **AWS Access Key ID**, **AWS Secret Access Key**, and **AWS Region** (e.g., `us-east-1`). The credentials should have at least read-only permissions for EC2 and S3.
4.  Click "Submit". The application will perform the scan and display the security posture dashboard.