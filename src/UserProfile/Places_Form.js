import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "./Account.css";

const Places_Form = ({ id }) => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [redirected, setredirected] = useState(false);

  // const { data } = res;
  //       setTitle(data.title);
  //       setAddress(data.address);
  //       setPhotos(data.photos);
  //       setDescription(data.description);
  //       setExtraInfo(data.setExtraInfo);
  //       setCheckIn(data.checkIn);
  //       setCheckOut(data.checkOut);
  //       setMaxGuest(data.maxGuest);
  //       setPerks(data.perks);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/getSinglePlaces/" + id).then((res) => {
      const { data } = res;
      setTitle(data[0].title);
      setAddress(data[0].address);
      setPhotos(data[0].photos);
      setDescription(data[0].description);
      setExtraInfo(data[0].extraInfo);
      setCheckIn(data[0].checkIn);
      setCheckOut(data[0].checkOut);
      setMaxGuest(data[0].maxGuest);
      setPerks(data[0].perks);
    });
  }, [id]);
  const addNewPlace = async (e) => {
    e.preventDefault();
    const sendData = {
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
    };
    if (id) {
      await axios.patch("/addPlace", {
        id,
        ...sendData,
      });
      console.log("Updated Records");
      setredirected(true);
    } else {
      await axios.post("/addPlace", sendData);
      console.log("Registerd");
      setredirected(true);
    }
  };

  if (redirected) {
    return <Navigate to={"/account/places"} />;
  }
  async function addPhotobyLink() {
    const { data } = await axios.post("/upload-by-link", { link: photoLink });
    setPhotos([...photos, data]);
    setPhotoLink("");
  }
  function handelCheckbox(e) {
    const { name, checked } = e.target;

    if (checked) {
      setPerks([...perks, name]); // Push the new item to the end of the list
    } else {
      setPerks(perks.filter((item) => item !== name)); // Remove the specified item from the list
    }
  }
  async function Uploadphoto(e) {
    const files = e.target.files;
    const data = new FormData();
    setIsLoading(true);
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    const res = await axios.post("/fileUpload", data, {
      headers: { "Content-Type": "multpart/form-data" },
    });

    setIsLoading(false);
    setPhotos([...photos, ...res.data]);
  }
  function InputField(placeholder, description, area = false, val, func) {
    return (
      <div className="Places-form-input-each">
        <p>{description + " :"}</p>
        {area ? (
          <textarea
            placeholder={placeholder}
            className="textarea"
            value={val}
            onChange={(e) => {
              func(e.target.value);
            }}
          />
        ) : (
          <input
            placeholder={placeholder}
            type="text"
            value={val}
            onChange={(e) => {
              func(e.target.value);
            }}
          />
        )}
      </div>
    );
  }
  function getCheckbox(name, icon) {
    return (
      <div className="eminities-Checkbox">
        <input
          type="checkbox"
          name={name}
          value={name}
          onChange={handelCheckbox}
          checked={perks.includes(name)}
        />
        <label htmlFor={name}>{name}</label>
        <img src={`/images/${icon}.png`} alt="wifi" />
      </div>
    );
  }

  return (
    <>
      <div className="Places-Form-container">
        <form className="Places-form" onSubmit={addNewPlace}>
          <div className="Places-form-input">
            {InputField(
              "Name of the property",
              "Title",
              false,
              title,
              setTitle
            )}
            {InputField(
              "Provide property address",
              "Address",
              false,
              address,
              setAddress
            )}
          </div>
          <div className="link-add">
            {InputField(
              "Paste the image link",
              "Add photo link",
              false,
              photoLink,
              setPhotoLink
            )}
            <button
              type="button"
              onClick={() => {
                addPhotobyLink();
              }}
            >
              Add Photo
            </button>
          </div>

          <div className="Places-pics">
            <label type="button" className="Upload-Local">
              <img src={"/images/plus.png"} alt="add" className="Local-pic" />
              <p>Upload from device</p>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={Uploadphoto}
              />
            </label>
            <div className="display-images">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                photos.map((data) => {
                  return (
                    <div className="Pics-container">
                      <div
                        className="product-Image"
                        onClick={() => {
                          setPhotos([
                            data,
                            ...photos.filter((photo) => photo !== data),
                          ]);
                        }}
                      >
                        <img
                          src={`http://localhost:5000/Models/Uploads/${data}`}
                        />
                      </div>
                      <div className="trash">
                        <img
                          src={"/images/trash.svg"}
                          alt="delete"
                          onClick={() => {
                            setPhotos(photos.filter((photo) => photo !== data));
                          }}
                        />
                      </div>
                      {photos[0] === data && (
                        <div className="star">
                          <img src={"/images/star.svg"} alt="star" />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="Places-form-input">
            {InputField(
              "Property description",
              "Description",
              true,
              description,
              setDescription
            )}
            {InputField(
              "Provide Extra Information",
              "Extra Info",
              true,
              extraInfo,
              setExtraInfo
            )}
          </div>
          <div className="eminities">
            {getCheckbox("Wifi", "Wifi")}
            {getCheckbox("Parking", "Parking")}
            {getCheckbox("Pets", "Pets")}
            {getCheckbox("Gym", "Gym")}
          </div>
          <div className="booking-date">
            <label htmlFor="in">Check In:</label>
            <input
              type="date"
              name="in"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
              }}
            />
            <div className="dateinbetween"></div>
            <label htmlFor="out">Check Out:</label>
            <input
              type="date"
              name="out"
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
              }}
            />
          </div>
          <div className="Guest-counter">
            <h5>Guests</h5>
            <button
              type="button"
              onClick={() => {
                maxGuest > 1 ? setMaxGuest(maxGuest - 1) : setMaxGuest(1);
              }}
            >
              -
            </button>
            <h4>{maxGuest}</h4>
            <button
              type="button"
              onClick={() => {
                maxGuest > 4 ? setMaxGuest(5) : setMaxGuest(maxGuest + 1);
              }}
            >
              +
            </button>
            <h4>
              {maxGuest > 4 ? (
                <p>Cannot Accomodate more than 5 Guests</p>
              ) : (
                <p></p>
              )}
            </h4>
          </div>

          <button id="Places-save">Save</button>
        </form>
      </div>
    </>
  );
};

export default Places_Form;
