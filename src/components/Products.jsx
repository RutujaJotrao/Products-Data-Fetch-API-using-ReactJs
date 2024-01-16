import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const Products = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getProducts();
        getCategories();
    }, []);

    const getProducts = async () => {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        const productsData = await response.json();
        setData(productsData);
        setFilter(productsData);
        setLoading(false);
    };

    const getCategories = async () => {
        const response = await fetch("https://fakestoreapi.com/products/categories");
        const categoriesData = await response.json();
        setCategories(categoriesData);
    };

    const Loading = () => {
        return (
            <div className="mt-4 ">
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
            </div>
        );
    };

    const filterProduct = (cat) => {
        const updatedItems = cat ? data.filter((item) => item.category === cat) : data;
        setFilter(updatedItems);
        setCurrentPage(1); // Reset to the first page when applying filters
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filter.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons">
                    <Button onClick={() => filterProduct("")} className='me-2' variant="outline-dark">All Brands</Button>
                    {categories.map((category) => (
                        <Button key={category} onClick={() => filterProduct(category)} className='me-2' variant="outline-dark">
                            {category}
                        </Button>
                    ))}
                </div>
                {currentProducts.map((item) => {
                    return (
                        <div className="col-3 mt-5" key={item.id}>
                            <Card className="border border-dark">
                                <Card.Img variant="top" style={{ height: '300px' }} src={item.image} />
                                <Card.Body>
                                    <Card.Title>{item.title.substring(0, 12)}</Card.Title>
                                    <Card.Text className='fw-bold'>
                                        $ {item.price}
                                    </Card.Text>
                                    <Link to={`/products/${item.id}`}> <Button variant="dark">Buy Now</Button></Link>
                                </Card.Body>
                            </Card>
                        </div>
                    );
                })}
            </>
        );
    };

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filter.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <div className="container mt-5 pb-5">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className='display-6 '>All Products</h1>
                        <hr />
                        <div className="row justify-content-center">
                            {loading ? <Loading /> : <ShowProducts />}
                        </div>
                        <div className="pagination mt-3">
                            {pageNumbers.map((number) => (
                                <Button key={number} onClick={() => paginate(number)} variant="outline-dark" className="me-2">
                                    {number}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
