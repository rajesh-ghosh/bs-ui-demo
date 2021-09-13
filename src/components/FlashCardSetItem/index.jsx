import React from "react";
import { Card, Row, Col } from "react-bootstrap";

export default function FlashCardSetItem({ data, onClick }) {
  return (
    <Col md="6">
      <Card className="flashcard-list-card" onClick={onClick}>
        <Card.Body className="flashcard-list">
          <Row>
            <Col>
              <div className="list-item">
                <label>Title:</label>
                <div>{data?.title}</div>
              </div>
            </Col>
            <Col>
              <div className="list-item">
                <label>Cards:</label>
                <div>{data?.cards.length}</div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}
