import React, {useState, useEffect} from "react";
import { CatalogPage, Search, Tags, Results, Element, Link, Img, NumResults, Footer } from "./catalogElements";
import SearchBar from '../../components/SearchBar';
import axios from 'axios';

const Catalog = () => {
    //const initialMyArray = JSON.parse(localStorage.getItem("myArray")) || ['a', 'b', 'c', 'd', 'e'];
    //const [myArray, setMyArray] = useState(initialMyArray);
    //const [query, setQuery] = useState([]);
    //const [counter, setCounter] = useState(parseInt(localStorage.getItem("counter")) || 0);
    //const [arrayChanged, setArrayChanged] = useState(false);
    const [ numElements, setCount ] = useState(0);
    const [error, setError] = useState('');
    const [results, setResults] = useState([]);

    /*useEffect(() => {
        fetch("http://localhost:5000/catalog/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ test: "asdw" }),
        })
        .then((response) => response.json())
        .then((data) => {
            setQuery(data);
            setCount(data.length);
            console.log("IN fetch: ", query);
            setError('');
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setError('An error occurred while fetching data.');
        });
        //console.log("OUT fetch", query);
    }, []);*/

    const handleSubmit = async (query) => {
        try {
            setResults([]);
            //const response = await axios.get(`http://localhost:5000/structures?q=${query}`);
            /*const response = await axios.get(`http://localhost:5000/catalog`);
            if (response.data.length === 0) {
                setError('No results found for the specified query.');
            } else {
                setResults(response.data);
                setError('');
                //console.log("IN fetch: ", response.data);
            }*/

            fetch("http://localhost:5000/catalog/1", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({query}),
            })
            .then((response) => response.json())
            .then((data) => {
                setResults(data);
                console.log(data);
                console.log("Q", query);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('An error occurred while fetching data.');
        }
    };

    /*const handleSubmit = async (query) => {
        try {
            setResults([]);
            //const response = await axios.get(`http://localhost:5000/structures?q=${query}`);
            const response = await axios.get(`http://localhost:5000/catalog`);
            if (response.data.length === 0) {
                setError('No results found for the specified query.');
            } else {
                setResults(response.data);
                setError('');
                //console.log("IN fetch: ", response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('An error occurred while fetching data.');
        }
    };*/

    /*const handleClick = () => {
        if (arrayChanged) {
          setMyArray(initialMyArray);
        } else {
          setMyArray(['f', 'g', 'h', 'i', 'j']);
        }
        setCounter(prevCounter => prevCounter + 1);
        setArrayChanged(!arrayChanged);

        //Test additions 4/2/24
        fetch("http://localhost:9090/catalog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ test: 1 }),
        })
          .then((response) => response.json())
          .then((data) => {
            setQuery(data);
          });
    };*/

    /*const handleClear = () => {
        localStorage.removeItem("myArray");
        localStorage.removeItem("counter");
        setMyArray(['a', 'b', 'c', 'd', 'e']); // Set array back to initial value
        setCounter(0);
        setArrayChanged(false);
    };

    useEffect(() => {
        localStorage.setItem("myArray", JSON.stringify(myArray));
    }, [myArray]);

    useEffect(() => {
        localStorage.setItem("counter", counter);
    }, [counter]);*/

    const renderElements = () => {
        //console.log("I'm doing stuff");
        let content = [];
        let num = results.length;
        let link = "http://localhost:3000/product/";
        console.log("RENDER 1: ", results);
        console.log("RENDER 1.1: ", results.structure_id);
        console.log("RENDER 2: ", num);
        if (num === undefined) {
            console.log("RENDER 3: ", results);
            content.push(
                <Element>
                    <h1><Link href={link + results.structure_id}>{results.structure_id}</Link></h1>
                    <Img src={results.images[0]} alt="Alternative Text" />
                    <p><Link href="https://www.cat.com/en_US.html">House Construction Group</Link></p>
                </Element>
            );
        } else {
            for (let i = 0; i < num; i++) {
                console.log("RENDER 3: ", results[i]);
                content.push(
                    <Element>
                        <h1><Link href={link + results[i].structure_id}>{results[i].structure_id}</Link></h1>
                        <Img src={results[i].images[0]} alt="Alternative Text" />
                        <p><Link href="https://www.cat.com/en_US.html">House Construction Group</Link></p>
                    </Element>
                );
            }
        }

        return content;
        /*return query.map((item) => (
            <Element key={item._id}>
                <h1><Link>{item._id}</Link></h1>
                <img src={item.images[0]} alt="Alternative Text" />
                <p><Link href="https://www.cat.com/en_US.html">House Construction Group</Link></p>
            </Element>
        ));*/
    }

    /*function ColorChangingButton() {
        const initialColor = localStorage.getItem('buttonColor') || '#007bff';
        const [buttonColor, setButtonColor] = useState(initialColor);

        const getRandomColor = () => {
            return '#' + Math.floor(Math.random()*16777215).toString(16);
        };

        const handleClick = () => {
            const randomColor = getRandomColor();
            setButtonColor(randomColor);
        };

        useEffect(() => {
            localStorage.setItem('buttonColor', buttonColor);
        }, [buttonColor]);

        return (
            <button
                style={{ backgroundColor: buttonColor, color: '#ffffff' }}
                onClick={handleClick}
            >
            {myArray.length > 0 ? JSON.stringify(myArray) : 'No Array'}
            </button>
        );
    }*/

    return (
        <CatalogPage>
            <Search>
                <SearchBar onSubmit={handleSubmit} />
                {error && <p className="error">{error}</p>}
            </Search>
            <Tags>
                <h1><Link>Tag 1</Link></h1>
                <h1><Link>Tag 2</Link></h1>
            </Tags>
            <Results>
                {renderElements()}
            </Results>
            <NumResults>
                <p>Results Displayed: {numElements}</p>
            </NumResults>
            <Footer>
                <p>CAT 3DCP Teams Peak Performers, Screen Warriors, and Kryptonite</p>
            </Footer>
        </CatalogPage>
    );
}

export default Catalog;
