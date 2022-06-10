import React from 'react';
import { ListGroup, Image, Button, Spinner } from "react-bootstrap";
import apple from "../images/apple.png";
import noLogo from "../images/no-image.png"
import samsung from "../images/samsung.png"
import "../images/images.css"

const ProductList = props => {
    
    const openSelectedList = key => {
        if (document.getElementById(key) && document.getElementById(key + "image")) {
            if (document.getElementById(key).style.visibility === "hidden") {
                document.getElementById(key).style.visibility = "visible"
                document.getElementById(key + "image").style.height = "auto"
            }
            else {
                document.getElementById(key).style.visibility = "hidden"
                document.getElementById(key + "image").style.height = "250px"
            }
        }
    }


    const selectPhoto = brand => {
        switch (brand) {
            case "iPhone":
                return apple;
            case "Samsung":
                return samsung;
            default:
                return noLogo
        }
    }

    if (props.loading) {
        return (
            <div position>
            <Spinner animation="border" role="status" position="Center">
                <div>Loading...</div>
            </Spinner>
            </div>
        )
    }
    
    return (
        <div>
            {props.showBrands && props.groupedList.map((option, key) => {
                return (
                    <div id={key + "image"} key={key.toString()} style={{ float: 'left', position: 'relative', width: "250px", height: "250px" }}>
                        <Image src={selectPhoto(option.brand)} className="imageStyle" fluid></Image>

                        <p style={{ textAlign: 'center' }}><Button onClick={() => openSelectedList(key)}>{option.brand}</Button></p>

                        <ListGroup id={key} style={{ visibility: "hidden" }} variant="flush">
                            {option.models.map((model, modelKey) => {
                                return (
                                    <ListGroup.Item key={modelKey}>{model}</ListGroup.Item>
                                )
                            })}
                        </ListGroup>
                    </div>
                )
            })}
        </div>
    )
}

export default ProductList;