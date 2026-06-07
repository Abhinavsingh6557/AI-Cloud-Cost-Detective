import pandas as pd
from services.ai_recommender import generate_ai_recommendations


def analyze_costs(csv_path: str):
    df = pd.read_csv(csv_path)

    total_cost = round(df["cost"].sum(), 2)

    service_costs = (
        df.groupby("service")["cost"]
        .sum()
        .reset_index()
        .sort_values(by="cost", ascending=False)
    )

    issues = []

    for _, row in df.iterrows():
        service = row["service"]
        usage_type = row["usage_type"]
        cost = row["cost"]
        resource_id = row["resource_id"]

        if service == "EC2" and cost > 30:
            issues.append({
                "resource_id": resource_id,
                "service": service,
                "issue": "High EC2 compute cost detected",
                "suggestion": "Check instance size and stop unused instances."
            })

        if service == "EBS" and "Unattached" in usage_type:
            issues.append({
                "resource_id": resource_id,
                "service": service,
                "issue": "Unattached EBS volume detected",
                "suggestion": "Delete unused EBS volumes after taking backup."
            })

        if service == "Elastic IP" and "Idle" in usage_type:
            issues.append({
                "resource_id": resource_id,
                "service": service,
                "issue": "Idle Elastic IP detected",
                "suggestion": "Release unused Elastic IP to avoid charges."
            })

        if service == "CloudWatch" and cost > 15:
            issues.append({
                "resource_id": resource_id,
                "service": service,
                "issue": "High CloudWatch log storage cost",
                "suggestion": "Reduce log retention period and delete unnecessary logs."
            })

        if service == "NAT Gateway" and cost > 15:
            issues.append({
                "resource_id": resource_id,
                "service": service,
                "issue": "High NAT Gateway cost",
                "suggestion": "Review NAT Gateway usage and consider VPC endpoints."
            })

    summary = {
        "highest_cost_service": service_costs.iloc[0]["service"],
        "highest_cost_amount": round(service_costs.iloc[0]["cost"], 2),
        "total_issues": len(issues),
        "estimated_savings": round(len(issues) * 8, 2)
    }

    recommendations = []

    if summary["highest_cost_service"] == "EC2":
        recommendations.append(
            "Consider rightsizing EC2 instances and enabling Auto Scaling."
        )

    if summary["highest_cost_service"] == "CloudWatch":
        recommendations.append(
            "Reduce CloudWatch log retention period and archive old logs."
        )

    if summary["highest_cost_service"] == "NAT Gateway":
        recommendations.append(
            "Use VPC Endpoints where possible to reduce NAT Gateway data processing costs."
        )

    if len(issues) > 5:
        recommendations.append(
            "Multiple cost issues detected. Conduct a full AWS cost optimization review."
        )

    if not recommendations:
        recommendations.append(
            "No major cost risk detected. Continue monitoring AWS usage regularly."
        )
    
    score = 100
    
    score -= len(issues) * 5
    
    if score < 0:
        score = 0   
                
    ai_text = generate_ai_recommendations(summary, issues)
    
    return {
        "total_cost": total_cost,
        "summary": summary,
        "service_costs": service_costs.to_dict(orient="records"),
        "issues_found": issues,
        "optimization_score": score,
        "recommendations": recommendations,
        "ai_text": ai_text
        
    }