import React, {useState} from "react";
import logo from './cat.jpg';

const Home = () =>
{
     const [dbText, setDbText] = useState('');
     return (
          <div>
               <button type="button" onClick={(e) =>
               {
                    e.preventDefault();
                    fetch("http://localhost:5000/mongodb", {
                         method: "GET"
                    }).then((response) => response.json()).then((data) =>
                    {
                         console.log(data.message);
                         setDbText(data.message);
                    });
               }}>Query MongoDB</button>
               <h1>Welcome to CAT 3DCP Digital Marketplace</h1>
               <img src={logo} alt="Caterpillar Logo" width="128" height="128"></img>
               <p>{dbText}</p>
          </div>
     );
};

export default Home;
