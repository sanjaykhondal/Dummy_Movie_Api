import React, { useState, useEffect } from 'react';
import './User.css';
import Pagination from './Pagination';

export default function User() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('id');
    const [sortDirection, setSortDirection] = useState('asc');
    const perPageRecords = 10;

    useEffect(() => {
        (async () => {
            try {
                const moviesUrl = await fetch('https://dummyapi.online/api/movies');
                const data = await moviesUrl.json();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
    }, []);

    const searchHandler = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    }

    const handleSort = (column) => {
        if (column === sortBy) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortDirection('asc');
        }
    }

    const sortedMovies = movies
        .filter(item => item.movie.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

    const startIndex = (currentPage - 1) * perPageRecords;
    const currentMovies = sortedMovies.slice(startIndex, startIndex + perPageRecords);

    return (
        <>
            <div className='heading-div'>
                <h2>Information</h2>
                <input
                    type='text'
                    onChange={searchHandler}
                />
            </div>

            <table className='info-table'>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('id')}>ID</th>
                        <th onClick={() => handleSort('movie')}>Movie</th>
                        <th onClick={() => handleSort('rating')}>Rating</th>
                        <th>IMDB Url</th>
                    </tr>
                </thead>
                <tbody>
                    {currentMovies.map((data, index) => (
                        <tr key={index}>
                            <td>{data.id}</td>
                            <td>{data.movie}</td>
                            <td>{data.rating}</td>
                            <td><a href={data.imdb_url}>{data.imdb_url}</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <Pagination
                    totalRecords={sortedMovies.length}
                    perPageRecords={perPageRecords}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
        </>
    );
}
