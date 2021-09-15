import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

export default function ShowTlPopup(tlData) {

    let open = true;
    let idMessage = 'en-US', localeCode = 'en-US';

    console.log('### in TL Popup. Data is - ' + JSON.stringify(tlData));
    console.log('### locale - ' + tlData?.tlData.localeCode);

    return(
        <>
            {/* <div className="d-flex justify-content-center"> */}
            <Card className="page-content">
                <Card.Header>
                    <div className="page-header">
                        <h4>{tlData?.tlData.localeCode}</h4>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col lg={6} className="mx-auto">
                            <div className="view-list">
                                <div className="item">
                                    <h6>Challenge Text</h6>
                                    <p>{tlData?.tlData?.challengeText}</p>
                                </div>
                            </div>
                            <div className="view-list">
                                <div className="item">
                                    <h6>Challenge Image File</h6>
                                    <p>{tlData?.tlData?.challengeImageFileLoc}</p>
                                </div>
                            </div>
                            <div className="view-list">
                                <div className="item">
                                    <h6>Answer Text</h6>
                                    <p>{tlData?.tlData?.answerText}</p>
                                </div>
                            </div>
                            <div className="view-list">
                                <div className="item">
                                    <h6>Answer Image File</h6>
                                    <p>{tlData?.tlData?.answerImageFileLoc}</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {/* </div> */}
        </>
    );

}