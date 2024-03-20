import logo from './cat.jpg';

const Home = () =>
{ 
     return (
          <div>
               <button type="button" onClick={(e) =>
               {
               }}>Query MongoDB</button>
               <h1>Welcome to CAT 3DCP Digital Marketplace</h1>
               <img src={logo} alt="Caterpillar Logo" width="128" height="128"></img>
          </div>
     );
};

export default Home;
