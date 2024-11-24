import React, { useContext, useState, useEffect } from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext.js"
import BadgerBudSummary from '../../BadgerBudsSummary.jsx'; 
import { Col, Container, Row } from "react-bootstrap";

export default function BadgerBudsAdoptable(props) {

    const allBuddies = useContext(BadgerBudsDataContext);
    const[buddies, setBuddies] = useState(allBuddies);

    useEffect(() => {
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
        setBuddies(allBuddies.filter(buddy => !savedCatIds.includes(buddy.id)));
    }, [allBuddies]);

    const handleSave = (buddyId, buddyName) => {
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];

        const updatedCatIds = [...savedCatIds, buddyId] /*Asked chatGPT how to use spread operator*/;
        sessionStorage.setItem("savedCatIds", JSON.stringify(updatedCatIds));

        alert(`${buddyName} has been added to your basket!`);

        setBuddies(buddies.filter(buddy => buddy.id !== buddyId));
    }

    return <Container>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        {buddies.length === 0 ? (
            <p>No buds are available for adoption!</p>
        ) : (
        <Row className="g-5" /*Asked ChatGPT how to have cards not be packed together.*/>
            {buddies.map((buddy) => (
                <Col 
                    key={buddy.id}
                    xs={12} sm={6} md={4} lg={3}
                >

                <BadgerBudSummary
                    id={buddy.id}
                    name={buddy.name}
                    imgIds={buddy.imgIds}
                    gender={buddy.gender}
                    breed={buddy.breed}
                    age={buddy.age}
                    description={buddy.description}
                    onSave={() => handleSave(buddy.id, buddy.name)}
                />
                </Col>
            ))}
        </Row>
        )}
    </Container>
}