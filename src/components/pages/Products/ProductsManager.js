import React, { useState } from 'react';
import { Table, Button } from "react-bootstrap";
import Paginate from "./Paginate"

const ProductsManager = props => {
    
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)
    const [active, setActive] = useState(1)

    //Get Current Posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentProductList = props.productList.slice(indexOfFirstPost, indexOfLastPost).sort((a, b) => a.brand < b.brand ? 1 : -1)

    const paginate = number => {
        setCurrentPage(number)
        setActive(number)
    }

    return (
        <div>
            {props.showProductsList &&
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Color</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentProductList.map((product, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{product.brand}</td>
                                            <td>{product.model}</td>
                                            <td>{product.color}</td>
                                            <td>
                                                <Button className="btn btn-light" onClick={() => props.handleEditForm(product.brand, product.model, product.color, product.id)}>Edit</Button>{ }
                                                <Button variant="outline-secondary" onClick={() => props.onDelete(product.id)}>Delete</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    <Paginate postsPerPage={postsPerPage} totalPosts={props.productList.length} paginate={paginate} active={active}/>
                </div>}
        </div>
    )
}

export default ProductsManager;