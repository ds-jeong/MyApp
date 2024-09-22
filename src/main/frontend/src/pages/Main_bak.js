import React, {useEffect, useState} from 'react';
import {
    Container,
    Button,
    Card,
    CardImg,
    CardBody,
    CardFooter
} from 'react-bootstrap';


import axios from "axios";

const Main_bak = () => {
    const [resArr, setResArr] = useState([])
    useEffect(() => {
        axios.get('/main')
            .then(response => {
                    setResArr(response.data);
                }
            )
            .catch(error => console.log(error))
    }, []);

    const renderProductList = () => {
        const result = [];
        for (let i = 0; i < resArr.length; i++) {
            result.push(
            <div className="col mb-5">
                <Card className="h-100">
                    <CardImg top="true" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                             alt="Card image cap"/>
                    <CardBody>
                        <div className="text-center">
                            <h5 className="fw-bolder"></h5>
                            $40.00 - $80.00
                        </div>
                    </CardBody>
                    <CardFooter className="p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center">
                            <Button variant="outline-dark">View options</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>);
        }
        return result;
    };

    return (
        <div>
            <header className="bg-dark py-5">
                <Container>
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Shop in style</h1>
                        <p className="lead fw-normal text-white-50 mb-0">With this shop homepage template</p>
                    </div>
                </Container>
            </header>
            <section className="py-5">
                <Container>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
                        {resArr.map((item) => (
                            <div className="col mb-5" key={item}>
                                <Card className="h-100">
                                    <CardImg top="true" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                                             alt="Card image cap"/>
                                <CardBody>
                                    <div className="text-center">
                                        <h5 className="fw-bolder">{item}</h5>
                                        $40.00 - $80.00
                                    </div>
                                </CardBody>
                                <CardFooter className="p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center">
                                        <Button variant="outline-dark">View options</Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                        ))}
                        {/* Add more cards here */}
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default Main_bak;