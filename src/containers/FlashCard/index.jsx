import React, { useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Card, Row, Button, Col, Form } from "react-bootstrap";
import FlashCardItem from "../../components/FlashCardItem";
import { useGetAllFlashCards } from "../../hooks";
import { useGetFlashCardsWithPartTls } from "../../hooks";


export default function FlashCard() {

  const history = useHistory();
  const location = useLocation();
  const urlPath = location.pathname;
  const [showData, setShowData] = useState(10);
  const [filterData, setFilterData] = useState(null);
  const search = useLocation().search;
  const query = new URLSearchParams(search).get("q");

  const loadMore = () => {
    setShowData(showData + 10);
  };

  // console.log('Container FlashCard called - ' + location.pathname);
  // let pathFrag1 = urlPath.split("/")[1];
  // let pathFrag2 = urlPath.split("/")[2];
  
  // let allCards = pathFrag2 ? false : true;
  
  // let partTlCards = pathFrag2  ? ( pathFrag2 === 'filterbyparttls' ) : false;
  // let fullTlCards = pathFrag2  ? ( pathFrag2 === 'filterbyfulltls' ) : false;

  // console.log('### Values - ' + allCards + ' , ' + partTlCards + ', ' + fullTlCards);

  // const { data: allFlashCardsData } = allCards ? useGetAllFlashCards() : useGetFlashCardsWithPartTls();

  const { data: allFlashCardsData } = useGetAllFlashCards(query || "");

  const allFlashCards = useMemo(() => {
    if (allFlashCardsData && allFlashCardsData.data) {
      setFilterData(allFlashCardsData.data);
      return allFlashCardsData.data;
    }
  }, [allFlashCardsData]);

  //const { dataPartTl : flashCardPartTlData } = useGetFlashCardsWithPartTls();

  // const flashCardsWithPartTls = useMemo( () => {
  //   if (flashCardPartTlData && flashCardPartTlData.data) {
  //     setFilterData(flashCardPartTlData.data);
  //     return flashCardPartTlData.data;
  //   }

  // }, [flashCardPartTlData]);

  // const handleSearch = (e) => {
  //   const value = e.target.value.toLowerCase();
    
  //   if (value === null || value === "") {
  //     if (allCards)
  //       setFilterData(allFlashCards);

  //     if (partTlCards)
  //       setFilterData(flashCardsWithPartTls);

  //     return;
  //   }

  //   //if (allCards) {
  //     const filterData = allFlashCards.filter((data) => {
  //       return (
  //         (data.cardGroupTitle?.toLowerCase().search(value) &&
  //           data.challengeText?.toLowerCase().search(value) &&
  //           data.answerText?.toLowerCase().search(value)) !== -1
  //       );
  //     });
  //   //}
    
  //   setFilterData(filterData);
  // };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    if (value === null || value === "") {
      setFilterData(allFlashCards);
      return;
    }
    const filterData = allFlashCards.filter((data) => {
      return (
        (data.cardGroupTitle.toLowerCase().search(value) &&
          data.challengeText?.toLowerCase().search(value) &&
          data.answerText?.toLowerCase().search(value)) !== -1
      );
    });
    setFilterData(filterData);
  };

  return (
    <Card className="page-content">
      <Card.Header>
        <div className="page-header">
          <h4>Flash Cards </h4>
          <div className="links">
            <Button
              type="primary"
              size="sm"
              onClick={() => history.push("/cards/create")}
            >
              Add
            </Button>
          </div>
        </div>
      </Card.Header>
      <Card.Body className="page-body">
        <Row className="justify-content-end">
          <Col sm={4} md={3}>
            <Form.Control
              type="text"
              placeholder="Filter Card ... "
              className="mb-4"
              onChange={handleSearch}
            />
          </Col>
        </Row>
        <Row>
          {filterData?.slice(0, showData)?.map((data) => (
            <FlashCardItem
              data={data}
              key={data.id}
              onClick={() => history.push(`/cards/${data.id}`)}
            />
          ))}
        </Row>
        {showData < filterData?.length && (
          <Row>
            <Col className="text-center">
              <Button variant="primary" onClick={loadMore}>
                Load More
              </Button>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
}


