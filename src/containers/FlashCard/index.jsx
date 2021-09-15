import React, { useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Card, Row, Button, Col, Form } from "react-bootstrap";
import FlashCardItem from "../../components/FlashCardItem";
import { useGetAllFlashCards } from "../../hooks";


export default function FlashCard() {

  const history = useHistory();
  const location = useLocation();
  const urlPath = location.pathname;
  const [showData, setShowData] = useState(10);
  const [filterData, setFilterData] = useState(null);
  const queryString = useLocation().search;
  console.log('query string - ' + queryString);
  const searchQuery = new URLSearchParams(queryString).get("q");
  console.log('search string - ' + searchQuery);
  const filterQuery = new URLSearchParams(queryString).get("f");
  console.log('filter string - ' + filterQuery);

  const loadMore = () => {
    setShowData(showData + 10);
  };

  const { data: allFlashCardsData } = useGetAllFlashCards( searchQuery ? 'q' : ( filterQuery ? 'f' : '' ) ,  searchQuery ? searchQuery : filterQuery);

  const allFlashCards = useMemo(() => {
    if (allFlashCardsData && allFlashCardsData.data) {
      setFilterData(allFlashCardsData.data);
      return allFlashCardsData.data;
    }
  }, [allFlashCardsData]);

  const handleFilter = (e) => {
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
            <a href="#"></a>
            <a href="#"><img src="https://img.icons8.com/ios/50/000000/pdf-2.png" className="tool-bar-image"/></a>
            <a href="#"><img src="https://img.icons8.com/material-sharp/24/000000/download--v1.png" className="tool-bar-image"/></a>
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
              onChange={handleFilter}
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


