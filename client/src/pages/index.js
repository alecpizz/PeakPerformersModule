import App from '../App';
import logo from './cat.jpg';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Home = () =>
{
     const productRedirect = () => {Navigate('/product')};
     return (
          <div>
               <h1>Welcome to CAT 3DCP Digital Marketplace</h1>
               <img src={logo} alt="Caterpillar Logo" width="128" height="128"></img>
               <div>
                    <Link to="/product">Go to Product Page</Link>
               </div>
          </div>
     );
};

export default Home;
