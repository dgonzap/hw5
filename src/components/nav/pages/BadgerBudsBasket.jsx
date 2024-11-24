import React, { useContext, useEffect, useState } from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext.js";
import SavedBuddySummary from '../../SavedBuddySummary.jsx';
import { Container, Row, Col } from "react-bootstrap";

export default function BadgerBudsBasket(props) {
    const allBuddies = useContext(BadgerBudsDataContext);
    const [savedBuddies, setSavedBuddies] = useState([]); 

    useEffect(() => {
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
        const adoptedCatIds = JSON.parse(sessionStorage.getItem("adoptedCatIds")) || [];
        const filteredBuddies = allBuddies.filter(
            buddy => savedCatIds.includes(buddy.id) && !adoptedCatIds.includes(buddy.id)
        );
        setSavedBuddies(filteredBuddies);
    }, [allBuddies]);

    const handleUnselect = (buddyId, buddyName) => {        
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
        
        const updatedCatIds = savedCatIds.filter(id => id !== buddyId);
        sessionStorage.setItem("savedCatIds", JSON.stringify(updatedCatIds));
        
        alert(`${buddyName} has been removed from your basket!`);
        
        setSavedBuddies(savedBuddies.filter(buddy => buddy.id !== buddyId));
    };

    const handleAdopt = (buddyId, buddyName) => {
        const adoptedCatIds = JSON.parse(sessionStorage.getItem("adoptedCatIds")) || [];

        const updatedAdoptedCatIds = [...adoptedCatIds, buddyId];
        sessionStorage.setItem("adoptedCatIds", JSON.stringify(updatedAdoptedCatIds));

        alert(`Thank you for adopting ${buddyName}!`);

        setSavedBuddies(savedBuddies.filter(buddy => buddy.id !== buddyId));
    };

    return (
        <Container>
            <h1>Badger Buds Basket</h1>
            <p>These cute cats could all be yours!</p>
            {savedBuddies.length === 0 ? (
                <p>You have no buds in your basket!</p>
            ) : (
            <Row className="g-4">
                {savedBuddies.map(buddy => (
                    <Col key={buddy.id} xs={12} sm={6} md={4} lg={3}>
                        <SavedBuddySummary
                            id={buddy.id}
                            name={buddy.name}
                            imgIds={buddy.imgIds}
                            onUnselect={() => handleUnselect(buddy.id, buddy.name)}
                            onAdopt={() => handleAdopt(buddy.id, buddy.name)}
                        />
                    </Col>
                ))}
            </Row>
            )}
        </Container>
    );
}
