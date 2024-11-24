import React, { useState } from "react";
import { Button} from "react-bootstrap";

export default function BadgerBudSummary ({ id, name, imgIds, gender, breed, age, description, onAdopt, onUnselect}) {
    const selectedImageId = imgIds[0];

    return (
        <div>
            <img
            src={`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${selectedImageId}`}
            alt={`A picture of ${name}!`}
            style={{ width: '200px', height: '200px' }} />
            
            <h2>{name}</h2>

            <div className="d-inline-flex mt-3" /*asked chatGPT for tips in button styling*/>
                <Button variant="primary" onClick={onUnselect} className="me-1" style={{ whiteSpace: 'nowrap' }}>
                    Unselect
                </Button>
                <Button variant="success" onClick={onAdopt}>
                    Adopt
                </Button>
            </div>
        </div>
    )
}