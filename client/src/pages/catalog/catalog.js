import React, {useState, useEffect} from "react";
import { CatalogPage, Tags, Results, Element, Link, Img, Footer } from "./catalogElements";

const Catalog = () => {
    //const initialMyArray = JSON.parse(localStorage.getItem("myArray")) || ['a', 'b', 'c', 'd', 'e'];
    //const [myArray, setMyArray] = useState(initialMyArray);
    const [query, setQuery] = useState([]);
    //const [counter, setCounter] = useState(parseInt(localStorage.getItem("counter")) || 0);
    //const [arrayChanged, setArrayChanged] = useState(false);
    const [ numElements, setCount ] = useState(0);

    useEffect(() => {
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
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
        //console.log("OUT fetch", query);
    }, []);

    const search = () => {
        //setQuery(getQuery());
        //setCount(query.length);
        //console.log(query);
    }

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
        let num = query.length;
        let link = "http://localhost:3000/product/";
        for (let i = 0; i < num; i++) {
            content.push(
                <Element>
                    <h1><Link href={link + query[i].structure_id}>{query[i].structure_id}</Link></h1>
                    <Img src={query[i].images[0]} alt="Alternative Text" />
                    <p><Link href="https://www.cat.com/en_US.html">House Construction Group</Link></p>
                </Element>
            );
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
            <Tags>
                <h1><Link>Tag 1</Link></h1>
                <h1><Link>Tag 2</Link></h1>
                <h1><Link onClick={() => {search()}}>Search</Link></h1>
            </Tags>
            <Results>
                {renderElements()}
            </Results>
            <Footer>
                <p>Results Displayed: {numElements}</p>
            </Footer>
        </CatalogPage>
    );
}

export default Catalog;
