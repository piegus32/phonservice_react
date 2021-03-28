import React from 'react';
import { Pagination } from "react-bootstrap";

const Paginate = ({postsPerPage, totalPosts, paginate, active}) => {
    var items = [];

    for (var number = 1; number <= Math.ceil(totalPosts / postsPerPage); number++) {
        items.push(number);
    }

    return (
        <div>
            <Pagination>
                {items.map(number => (
                    <Pagination.Item onClick={() => paginate(number)} key={number}>{number}</Pagination.Item>
                ))}
            </Pagination>
        </div>
    )
}

export default Paginate;