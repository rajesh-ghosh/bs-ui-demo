import React from "react";
import { Card, Row, Col } from "react-bootstrap";

export default function FlashCardItem({ data, onClick }) {
  return (
    <Col md="6">
      <Card className="flashcard-list-card" onClick={onClick}>
        <Card.Body className="flashcard-list">
          <Row>
            <Col>
              <div className="list-item">
                <label>Question:</label>
                <div>
                  {data?.challengeType === "TEXT"
                    ? data?.challengeText
                    : data?.challengeImageFileLoc}
                </div>
              </div>
            </Col>
            <Col>
              <div className="list-item">
                <label>Title:</label>
                <div>{data?.cardGroupTitle}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="list-item">
                <label>Answer:</label>
                <div>
                  {data?.answerType === "TEXT"
                    ? data?.answerText
                    : data?.answerImageFileLoc}
                </div>
              </div>
            </Col>
            <Col>
              <div className="list-item">
                <label>Translations:</label>
                <div>{data?.translations.length}</div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}
