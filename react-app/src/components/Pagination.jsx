import React from 'react';
import './Pagination.css';

function Pagination({ totalRecords, perPageRecords, setCurrentPage, currentPage }) {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalRecords / perPageRecords); i++) {
        pages.push(i);
    }

    const previousPage = () => {
        if (currentPage > 1)
            setCurrentPage(currentPage - 1);
    }

    const nextPage = () => {
        if (currentPage < pages.length)
            setCurrentPage(currentPage + 1)
    }

    return (
        <div className='pagination-div'>
            <button onClick={previousPage}>previous</button>
            {
                pages.map((page, index) => {
                    return <button key={index} onClick={() => setCurrentPage(page)} className={
                        page === currentPage ? 'active' : ''}>{page}</button>;
                })
            }
            <button onClick={nextPage}>next</button>
        </div>
    )
}

export default Pagination