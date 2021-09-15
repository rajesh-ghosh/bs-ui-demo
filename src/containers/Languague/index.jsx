import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Row, Button, Col, Form } from "react-bootstrap";
import LanguagueItem from "../../components/LanguagueItem";
import { useGetAllLanguages } from "../../hooks";

export default function Languague() {
  const history = useHistory();
  const [showData, setShowData] = useState(10);
  const [filterData, setFilterData] = useState(null);

  const loadMore = () => {
    setShowData(showData + 10);
  };

  const { data: allLanguageData } = useGetAllLanguages();

  const allLanguages = useMemo(() => {
    if (allLanguageData && allLanguageData.data) {
      setFilterData(allLanguageData.data);
      return allLanguageData.data;
    }
  }, [allLanguageData]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    if (value === null || value === "") {
      setFilterData(allLanguages);
      return;
    }
    const filterData = allLanguages.filter((data) => {
      return data.name.toLowerCase().search(value) !== -1;
    });
    setFilterData(filterData);
  };

  return (
    <Card className="page-content">
      <Card.Header>
        <div className="page-header">
          <h4>Languages </h4>
          <div className="links">
            <Button
              type="primary"
              size="sm"
              onClick={() => history.push("/language/create")}
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
              placeholder="Filter Language"
              className="mb-4"
              onChange={handleSearch}
            />
          </Col>
        </Row>
        <Row>
          {filterData?.slice(0, showData).map((item) => (
            <LanguagueItem
              data={item}
              key={item.id}
              onClick={() => history.push(`/language/${item.id}`)}
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
