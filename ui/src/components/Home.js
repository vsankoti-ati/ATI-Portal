import { Link } from 'react-router-dom';
import ATIimg from './../images/ati.jpeg'
const Home = () => {
    return (
        <>
            <div className="text-center">               
                <Link to="/home">
                    <img src={ATIimg} alt="ATI Portal"></img>
                </Link>
            </div>
        </>
    )
}

export default Home;