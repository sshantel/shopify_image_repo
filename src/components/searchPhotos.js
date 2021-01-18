import React, { useState } from "react";
import { allKeys } from "underscore";
import { isLet } from "@babel/types";

const API_KEY = process.env.REACT_APP_API_KEY;

export default function SearchPhotos(props) {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);

  const searchUnsplash = (prev) => {
    const url = `https://api.unsplash.com/search/photos/?page=1&query=${query}&client_id=${API_KEY}`;
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          console.log("yay!");
        } else {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        let filter = data.results.map((r) => ({
          id: r.id,
          alt_description: r.alt_description,
          url: r.urls.small,
        }));

        prev.map((r) => {
          filter.push(r);
        });
        setPhotos(filter);
        console.log(prev);
      });
  };

  const searchPhotos = async (e) => {
    e.preventDefault();
    let allPhoto = [];
    try {
      fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({ query: query }),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          const filter = result.map((r) => ({
            id: r.public_id,
            alt_description: r.filename,
            url: r.url,
          }));
          searchUnsplash(filter);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <form className="form" onSubmit={searchPhotos}>
        <label className="label-search" htmlFor="query">
          Search for photos{" "}
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e. tea"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          {" "}
          Search
        </button>
      </form>
      <br></br>
      <div className="photo-list">
        {photos.map((photo) => (
          <div className="card" key={photo.id}>
            <input type="checkbox" id={`cb-${photo.id}`} />
            <label for={`cb-${photo.id}`}>
              <div className="caption"> {photo.alt_description} </div>
              <img
                className="card--photo"
                src={photo.url}
                width="200"
                height="200"
              />
            </label>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
