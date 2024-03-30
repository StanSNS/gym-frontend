import React from 'react';
import {Card, Col} from 'react-bootstrap';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import "./CardSkeletocLoader.css"

const CardSkeletonLoader = () => {
    const skeletonCards = [];
    for (let i = 0; i < 20; i++) {
        skeletonCards.push(
            <Col xl={3} lg={4} md={5} sm={12} key={i} className="mb-4">
                <Card className="h-100 cardShopSkeleton">
                    <div className="ps-4 pe-4 pt-2">
                        <Skeleton width={"100%"} height={200}/>
                    </div>
                    <Card.Body>
                        <Card.Title>
                            <Skeleton width={"100%"} height={"40%"}/>
                            <Skeleton width={"80%"} height={"40%"}/>
                        </Card.Title>
                        <Card.Text>
                            <Skeleton width={"90%"} height={"100%"} className="mb-3"/>

                            <Skeleton width={"100%"} height={"70%"}/>
                            <Skeleton width={"90%"} height={"70%"}/>
                            <Skeleton width={"80%"} height={"70%"}/>
                            <Skeleton width={"85%"} height={"70%"} className="mb-3"/>

                            <Skeleton width={"50%"} height={"100%"}/>
                            <Skeleton width={"70%"} height={"100%"}/>
                            <Skeleton width={"60%"} height={"100%"}/>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="cardFooterSkeleton ps-5">
                        <Skeleton width={"50%"} height={"100%"} className="ms-5"/>
                    </Card.Footer>
                </Card>
            </Col>
        );
    }

    return (skeletonCards);
};

export default CardSkeletonLoader;
