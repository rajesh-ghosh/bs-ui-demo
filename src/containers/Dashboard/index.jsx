import React, { useMemo } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { TagCloud } from "react-tagcloud";
import DashboardCard from "../../components/DashboardCard";
import {
  useGetDashboardFlashCards,
  useGetDashboardFlashCardSets,
  useGetTagCloud,
} from "../../hooks";

export default function Dashboard() {
  const { data: flashCardData } = useGetDashboardFlashCards();
  const { data: flashCardSetsData } = useGetDashboardFlashCardSets();
  const { data: tagCloudData } = useGetTagCloud();

  const flashCards = useMemo(() => {
    if (flashCardData && flashCardData.data) {
      return flashCardData.data;
    }
  }, [flashCardData]);

  const flashCardSets = useMemo(() => {
    if (flashCardSetsData && flashCardSetsData.data) {
      return flashCardSetsData.data;
    }
  }, [flashCardSetsData]);

  const tagCloud = useMemo(() => {
    if (tagCloudData && tagCloudData.data) {
      return tagCloudData.data || [];
    }
  }, [tagCloudData]);

  console.log(tagCloud);

  return (
    <>
      <Row>
        <Col sm="3">
          <DashboardCard cardTitle="Total Sets" count={flashCardSets} drillDownPath="/cardsets" />
        </Col>
        <Col sm="3">
          <DashboardCard cardTitle="Total Cards" count={flashCards?.totalCards} drillDownPath="/cards" />
        </Col>
        <Col sm="3">
          <DashboardCard
            cardTitle="Full Translations"
            count={flashCards?.fullTlCards}
          />
        </Col>
        <Col sm="3">
          <DashboardCard
            cardTitle="Partial Translations"
            count={flashCards?.partTlCards}
            drillDownPath="/cards/filterbyparttls"
          />
        </Col>
      </Row>
      <Row>
        
        <Col xs="12" className="tagcloud-col">
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-center">
                <span className="tagcloud-title">Word Cloud</span>
              </div>
              <TagCloud minSize={20} maxSize={50} tags={tagCloud || []} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
