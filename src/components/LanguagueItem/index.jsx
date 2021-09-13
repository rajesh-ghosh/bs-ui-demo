import React from "react";
import { Card, Row, Col } from "react-bootstrap";

export default function LanguagueItem({ data, onClick }) {
  return (
    <Col md="6">
      <Card className="flashcard-list-card" onClick={onClick}>
        <Card.Body className="flashcard-list">
          <Row>
            <Col>
              <div className="list-item">
                <label>Locale:</label>
                <div>{data?.locale}</div>
              </div>
            </Col>
            <Col md="auto">
              <div className="list-item">
                <label>Enabled:</label>
                <div>{data?.enabled ? "Yes" : "No"}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="list-item">
                <label>Name:</label>
                <div>{data?.name}</div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}
