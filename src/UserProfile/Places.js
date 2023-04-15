import React from "react";
import "./Account.css";
import { Link, useParams } from "react-router-dom";

import Places_Form from "./Places_Form";
import axios from "axios";

const Places = () => {
  const { action } = useParams();
  const [places, setPlaces] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("/allPlaces")
      .then((res) => {
        setPlaces(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {action !== "new" && (
        <div>
          {" "}
          <Link to={"/account/places/new"} className="add-new-link">
            <div className="Link-add-new-place">Add new Place</div>
          </Link>
          <div className="Container">
            {places.map((data) => (
              <div className="Cards" key={data.id}>
                <div className="image">
                  <Link to={`/account/places/${data._id}`}>
                    <img
                      src={`http://localhost:5000/Models/Uploads/${data.photos[0]}`}
                      alt={data.owner}
                    />
                  </Link>
                </div>
                <div className="Info">
                  <p>{data.title}</p>
                  <p>{data.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {action === "new" && <Places_Form />}
    </div>
  );
};

export default Places;
