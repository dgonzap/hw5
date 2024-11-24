import React, { useState } from "react";
import { Carousel, Button} from "react-bootstrap";

export default function BadgerBudSummary ({ id, name, imgIds, gender, breed, age, description, onSave}) {
    const selectedImageId = imgIds[0];

    const [showMore, setShowMore] = useState(false);

    const toggleAdditionalDetails = () => {
        setShowMore(!showMore);
    };

    return (
        <div>
            {showMore ? (
                <Carousel>
                    {imgIds.map((imgId, index) => (
                        <Carousel.Item key={index}>
                            <img
                                src={`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${imgId}`}
                                alt={`A picture of ${name}!`}
                                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <img
                    src={`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${imgIds[0]}`}
                    alt={`A picture of ${name}!`}
                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                />
            )}
            
            <h2>{name}</h2>

            {showMore && /*asked chatGPT for a shorthand if with null else*/ (
                <div>
                    <p>{gender}</p>
                    <p>{breed}</p>
                    <p>{age}</p>
                    {description && <p>{description}</p>}
                </div>
            )}

            <div className="d-inline-flex mt-3" /*asked chatGPT for tips in button styling*/>
                <Button variant="primary" onClick={toggleAdditionalDetails} className="me-1" style={{ whiteSpace: 'nowrap' }}>
                    {showMore ? "Show Less" : "Show More"}
                </Button>
                <Button variant="success" onClick={onSave}>
                    Save
                </Button>
            </div>
        </div>
    )
}