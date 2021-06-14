import React from 'react'
import Pagin from '@material-ui/lab/Pagination';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    function handleClick(e, value) {
        paginate(value)
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;
    }

    return (
        <>
            <div className='d-flex justify-content-center mb-5'>
                <Pagin onChange={handleClick} count={Math.ceil(totalPosts / postsPerPage)} />
            </div>
        </>
    )
}

export default Pagination
