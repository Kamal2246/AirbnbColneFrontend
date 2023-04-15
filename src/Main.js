import "./Cards.css";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Main = ({ Static_uri }) => {
  const [products, setProducts] = React.useState([]);
  const [Loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    axios.get("/getAllPlaces").then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="Container">
      {Loading && <h5>Loading ......</h5>}
      {products.map((data) => (
        <div className="Cards" key={data._id}>
          <div className="image">
            <Link to={`/placespage/${data._id}`}>
              <img src={`${Static_uri}/${data.photos[0]}`} alt={data._id} />
            </Link>
          </div>
          <div className="Info">
            <p>{data.title}</p>
            <p className="description"> {data.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Main;
