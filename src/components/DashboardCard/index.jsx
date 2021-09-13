import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function DashboardCard({ cardTitle, count, drillDownPath }) {
  var path = drillDownPath ? drillDownPath : "/";
  return (
    <Card>
      <Card.Body>
        <div className="dashboard-counter">
          <span className="card-title">{cardTitle}</span>
          <span className="card-info"><Link to={path}>{count}</Link></span>
        </div>
      </Card.Body>
    </Card>
  );
}
