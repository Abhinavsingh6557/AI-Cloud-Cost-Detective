import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def fallback_recommendations(summary, issues):
    return """
1. Review the highest cost AWS service and check whether the resources are right-sized.
2. Stop or resize underutilized EC2 instances to reduce compute costs.
3. Delete unattached EBS volumes after taking backups.
4. Release idle Elastic IPs that are not attached to running resources.
5. Reduce CloudWatch log retention and remove unnecessary debug logs.
6. Use VPC Endpoints where possible to reduce NAT Gateway data processing cost.
7. Enable AWS Budgets and cost alerts to monitor future spending.
"""


def generate_ai_recommendations(summary, issues):
    prompt = f"""
You are an AWS Cloud Cost Optimization Expert.

Cost Summary:
{summary}

Detected Issues:
{issues}

Provide:
1. Top cost optimization opportunities
2. Estimated savings ideas
3. AWS best practices
4. Resource cleanup recommendations

Keep response concise and actionable.
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        return response.text

    except Exception:
        return fallback_recommendations(summary, issues)