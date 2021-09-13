import React, { useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import { useGetAllEnabledLanguages, useGetFlashCardById } from "../../hooks";

function renderMission(allEnabledLocale, flashCard) {
  return allEnabledLocale
    ?.map((i) => i.locale)
    .filter(function (el) {
      return flashCard?.translations?.map((i) => i.localeCode).indexOf(el) < 0;
    })
    .toString();
}

export default function ViewFlashCard() {
  const history = useHistory();
  const { id } = useParams();

  const { data: flashCardData } = useGetFlashCardById(id);
  const { data: allEnabledLocaleData } = useGetAllEnabledLanguages();

  const flashCard = useMemo(() => {
    if (flashCardData && flashCardData.data) return flashCardData.data;
  }, [flashCardData]);

  const allEnabledLocale = useMemo(() => {
    if (allEnabledLocaleData && allEnabledLocaleData.data)
      return allEnabledLocaleData.data;
  }, [allEnabledLocaleData]);

  return (
    <Card className="page-content">
      <Card.Header>
        <div className="page-header">
          <h4>Flash Card </h4>
          <div className="links">
            <Button
              type="primary"
              size="sm"
              onClick={() => history.push("/cards")}
            >
              Back
            </Button>
          </div>
        </div>
      </Card.Header>
      <Card.Body className="page-body">
        <Row>
          <Col lg={6} className="mx-auto">
            <div className="view-list">
              <div className="item">
                <h6>CardSet</h6>
                <p>{flashCard?.cardGroupTitle}</p>
              </div>
              <div className="item">
                <h6>Question Type</h6>
                <p>{flashCard?.challengeType}</p>
              </div>
              <div className="item">
                <h6>Question</h6>
                <p>
                  {flashCard?.challengeType === "TEXT"
                    ? flashCard?.challengeText
                    : flashCard?.challengeImageFileLoc}
                </p>
              </div>
              <div className="item">
                <h6>Answer</h6>
                <p>
                  {flashCard?.answerType === "TEXT"
                    ? flashCard?.answerText
                    : flashCard?.answerImageFileLoc}
                </p>
              </div>
              <div className="item">
                <h6>Tags</h6>
                <p>{flashCard?.tagStringInt.toString()}</p>
              </div>
              <div className="item">
                <h6>Available Translations</h6>
                <p>
                  {flashCard?.translations
                    ?.map((i) => i.localeCode)
                    ?.toString()}
                </p>
              </div>
              <div className="item">
                <h6>Missing Translations</h6>
                <p>{renderMission(allEnabledLocale, flashCard)}</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="6" className="mt-4 mx-auto">
            <Button variant="secondary" onClick={() => history.push("/cards")}>
              Back
            </Button>{" "}
            <Button
              variant="primary"
              onClick={() => history.push(`/cards/update/${id}`)}
            >
              Update
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
