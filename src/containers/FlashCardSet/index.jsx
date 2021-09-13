import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Row, Button, Col, Form } from "react-bootstrap";
import FlashCardSetItem from "../../components/FlashCardSetItem";
import { useGetAllFlashCardSets } from "../../hooks";

export default function FlashCardSet() {
  const history = useHistory();
  const [showData, setShowData] = useState(10);
  const [filterData, setFilterData] = useState(null);

  const loadMore = () => {
    setShowData(showData + 10);
  };

  const { data: allFlashCardSetData } = useGetAllFlashCardSets();

  const allFlashCardSets = useMemo(() => {
    if (allFlashCardSetData && allFlashCardSetData.data) {
      setFilterData(allFlashCardSetData.data);
      return allFlashCardSetData.data;
    }
  }, [allFlashCardSetData]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    if (value === null || value === "") {
      setFilterData(allFlashCardSets);
      return;
    }
    const filterData = allFlashCardSets.filter((data) => {
      return data.title.toLowerCase().search(value) !== -1;
    });
    setFilterData(filterData);
  };

  return (
    <Card className="page-content">
      <Card.Header>
        <div className="page-header">
          <h4>Flash Card Set</h4>
          <div className="links">
            <Button
              type="primary"
              size="sm"
              onClick={() => history.push("/cardsets/create")}
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
              placeholder="Search Card Set"
              className="mb-4"
              onChange={handleSearch}
            />
          </Col>
        </Row>
        <Row>
          {filterData?.slice(0, showData)?.map((data) => (
            <FlashCardSetItem
              data={data}
              key={data.id}
              onClick={() => history.push(`/cardsets/${data.id}`)}
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
