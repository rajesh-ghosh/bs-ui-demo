import React, { useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import { useGetLangueageById } from "../../hooks";

export default function ViewLanguage() {
  const history = useHistory();
  const { id } = useParams();

  const { data: languageData } = useGetLangueageById(id);

  const language = useMemo(() => {
    if (languageData && languageData.data) return languageData.data;
  }, [languageData]);

  return (
    <Card className="page-content">
      <Card.Header>
        <div className="page-header">
          <h4>Language </h4>
          <div className="links"></div>
        </div>
      </Card.Header>
      <Card.Body className="page-body">
        <Row>
          <Col lg={6} className="mx-auto">
            <div className="view-list">
              <div className="item">
                <h6>Name</h6>
                <p>{language?.name}</p>
              </div>
              <div className="item">
                <h6>Locale</h6>
                <p>{language?.locale}</p>
              </div>
              <div className="item">
                <h6>IsoCharSet</h6>
                <p>{language?.isoCharSet}</p>
              </div>
              <div className="item">
                <h6>enabled</h6>
                <p>{language?.enabled ? "Yes" : "No"}</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="6" className="mt-4 mx-auto">
            <Button
              variant="secondary"
              onClick={() => history.push("/language")}
            >
              Back
            </Button>{" "}
            <Button
              variant="primary"
              onClick={() => history.push(`/language/update/${id}`)}
            >
              Update
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
