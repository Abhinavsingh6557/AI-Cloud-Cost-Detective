import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/analyze")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Backend error:", err));
  }, []);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setData(response.data);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please check backend is running.");
    }
  };

  const downloadReport = () => {
    const report = {
      project: "AI Cloud Cost Detective",
      generated_at: new Date().toLocaleString(),
      total_cost: data.total_cost,
      optimization_score: data.optimization_score,
      summary: data.summary,
      service_costs: data.service_costs,
      recommendations: data.recommendations,
      issues_found: data.issues_found,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "aws-cost-analysis-report.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  const downloadPDFReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("AI Cloud Cost Detective Report", 14, 20);

    doc.setFontSize(11);
    doc.text(`Generated At: ${new Date().toLocaleString()}`, 14, 30);

    doc.setFontSize(14);
    doc.text("Summary", 14, 45);

    doc.setFontSize(11);
    doc.text(`Total Cost: $${data.total_cost}`, 14, 55);
    doc.text(`Optimization Score: ${data.optimization_score}/100`, 14, 63);
    doc.text(`Highest Cost Service: ${data.summary.highest_cost_service}`, 14, 71);
    doc.text(`Total Issues: ${data.summary.total_issues}`, 14, 79);
    doc.text(`Estimated Savings: $${data.summary.estimated_savings}`, 14, 87);

    doc.setFontSize(14);
    doc.text("AI Recommendations", 14, 105);

    let y = 115;

    data.recommendations.forEach((item, index) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(11);
      const lines = doc.splitTextToSize(`${index + 1}. ${item}`, 180);
      doc.text(lines, 14, y);
      y += lines.length * 7;
    });

    doc.setFontSize(14);
    doc.text("Detected Issues", 14, y + 8);

    y += 18;

    data.issues_found.forEach((issue, index) => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(11);

      const issueLines = doc.splitTextToSize(`${index + 1}. ${issue.issue}`, 180);
      doc.text(issueLines, 14, y);
      y += issueLines.length * 7;

      doc.text(`Service: ${issue.service}`, 18, y);
      y += 7;

      doc.text(`Resource: ${issue.resource_id}`, 18, y);
      y += 7;

      const suggestionLines = doc.splitTextToSize(
        `Suggestion: ${issue.suggestion}`,
        175
      );
      doc.text(suggestionLines, 18, y);
      y += suggestionLines.length * 7 + 8;
    });

    doc.save("aws-cost-analysis-report.pdf");
  };

  if (!data) {
    return <h2 className="loading">Loading AWS Cost Analysis...</h2>;
  }

  return (
    <div className="container">
      <h1>AI Cloud Cost Detective</h1>
      <p>AWS Cost Optimization Dashboard</p>

      <div className="upload-section">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={handleUpload}>Upload & Analyze</button>
      </div>

      <div className="report-buttons">
        <button className="download-btn" onClick={downloadReport}>
          Download JSON Report
        </button>

        <button className="pdf-btn" onClick={downloadPDFReport}>
          Download PDF Report
        </button>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Total Cost</h3>
          <h2>${data.total_cost}</h2>
        </div>

        <div className="card">
          <h3>Optimization Score</h3>
          <h2>{data.optimization_score}/100</h2>
        </div>

        <div className="card">
          <h3>Highest Cost Service</h3>
          <h2>{data.summary.highest_cost_service}</h2>
        </div>

        <div className="card">
          <h3>Total Issues</h3>
          <h2>{data.summary.total_issues}</h2>
        </div>

        <div className="card">
          <h3>Estimated Savings</h3>
          <h2>${data.summary.estimated_savings}</h2>
        </div>
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <h2>Service-wise Cost</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.service_costs}>
              <XAxis dataKey="service" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cost" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Cost Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.service_costs}
                dataKey="cost"
                nameKey="service"
                outerRadius={100}
                label
              >
                {data.service_costs.map((_, index) => (
                  <Cell
                    key={index}
                    fill={
                      [
                        "#38bdf8",
                        "#facc15",
                        "#fb923c",
                        "#22c55e",
                        "#a78bfa",
                        "#ef4444",
                      ][index % 6]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h2>AI Recommendations</h2>

      {data.recommendations.map((item, index) => (
        <div className="recommendation" key={index}>
          {item}
        </div>
      ))}

      <h2>Detected Issues</h2>

      {data.issues_found.map((issue, index) => (
        <div className="issue" key={index}>
          <h3>{issue.issue}</h3>
          <p>
            <b>Service:</b> {issue.service}
          </p>
          <p>
            <b>Resource:</b> {issue.resource_id}
          </p>
          <p>
            <b>Suggestion:</b> {issue.suggestion}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;