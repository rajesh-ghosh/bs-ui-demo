import React, { useMemo, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { Card, Row, Button, Col, Modal } from "react-bootstrap";
import ShowTlPopup from "../../components/ViewTranslation";
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
  const [openModal, setOpenModal] = useState(false);
  const [ modalContent, setModalContent] = useState(null);

  const { data: flashCardData } = useGetFlashCardById(id);
  const { data: allEnabledLocaleData } = useGetAllEnabledLanguages();

  const flashCard = useMemo(() => {
    if (flashCardData && flashCardData.data) return flashCardData.data;
  }, [flashCardData]);

  const allEnabledLocale = useMemo(() => {
    if (allEnabledLocaleData && allEnabledLocaleData.data)
      return allEnabledLocaleData.data;
  }, [allEnabledLocaleData]);

  const handleTlLink = (tlData) => {
      //console.log('### TL Link clicked. Value - ' + JSON.stringify(tlData));
      setOpenModal(true);
      setModalContent(tlData);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  
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
            <a href=""></a>
            <a href="#"><img src="https://img.icons8.com/material-sharp/24/000000/download--v1.png" className="tool-bar-image"/></a>
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
                <h6>Challenge Type</h6>
                <p>{flashCard?.challengeType}</p>
              </div>
              <div className="item">
                <h6>Challenge</h6>
                <p>
                  {flashCard?.challengeType === "TEXT"
                    ? flashCard?.challengeText
                    : flashCard?.challengeImageFileLoc}
                </p>
              </div>
              <div className="item">
                <h6>Answer Type</h6>
                <p>{flashCard?.answerType}</p>
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
                <p>{flashCard?.tagString.toString()}</p>
              </div>
              <div className="item">
                <h6>Available Translations</h6>
                {
                /* <p>
                  {flashCard?.translations?.map((i) => { <Link to="#">{i.localeCode?.toString()}</Link> })}
                </p> */
                  <div>
                    <p>
                      {flashCard?.translations?.map( (i, index) => { return(  <Link to="#" onClick={ () => handleTlLink(i)  }> {(index === 0 ? i.localeCode : ', ' + i.localeCode)}</Link>  ) } ) }  
                    </p>
                    <Modal show={openModal} onHide={handleModalClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>View Translation</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <ShowTlPopup tlData={modalContent}/>
                      </Modal.Body>
                    </Modal>
                  </div>
                }
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
