import React, { useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import { useGetFlashCardSetsById } from "../../hooks";

export default function ViewFlashCardSet() {
  const history = useHistory();
  const { id } = useParams();

  const { data: flashCardSetData } = useGetFlashCardSetsById(id);

  const flashCardSet = useMemo(() => {
    if (flashCardSetData && flashCardSetData.data) return flashCardSetData.data;
  }, [flashCardSetData]);

  return (
    <Card className="page-content">
      <Card.Header>
        <div className="page-header">
          <h4>Flash Card Set</h4>
        </div>
      </Card.Header>
      <Card.Body className="page-body">
        <Row>
          <Col lg={6} className="mx-auto">
            <div className="view-list">
              <div className="item">
                <h6>Name</h6>
                <p>{flashCardSet?.title}</p>
              </div>
              <div className="item">
                <h6>enabled</h6>
                <p>{flashCardSet?.enabled ? "Yes" : "No"}</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="6" className="mt-4 mx-auto">
            <Button
              variant="secondary"
              onClick={() => history.push("/cardsets")}
            >
              Back
            </Button>{" "}
            <Button
              variant="primary"
              onClick={() => history.push(`/cardsets/update/${id}`)}
            >
              Update
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
