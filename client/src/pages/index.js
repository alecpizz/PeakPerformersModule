import React from "react";
import logo from './cat.jpg';

const Home = () => {
    return (
        <div>
            <button type="button" onClick={(e) => {
                e.preventDefault();
                fetch("http://localhost:5000/mongodb", {
                    method: "GET"});
                console.log('test');
            }}>Query MongoDB</button>
            <h1>Welcome to CAT 3DCP Digital Marketplace</h1>
            <img src={logo} alt="Caterpillar Logo" width="128" height="128"></img>
            <p>Caterpillar.</p>
        </div>
    );
};

export default Home;