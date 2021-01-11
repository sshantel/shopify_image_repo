import React, { useState } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;
//using Hooks
//useState is a Hook. A hook is a function provided by React that let you hook into
//React features from your function components.
export default function SearchPhotos(props) {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);

  const searchPhotos = async (e) => {
    e.preventDefault();

    const url = `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${query}&client_id=${API_KEY}`;

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
        setPhotos(data.results);
        console.log(data);
      });
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
      <div className="photo-list">
        {photos.map((photo) => (
          <div className="card">
            <input type="checkbox" id={`cb-${photo.id}`} />
            <label className="checkbox" for={`cb-${photo.id}`}>
              <div className="caption"> {photo.alt_description} </div>

              <img
                className="card--photo"
                src={photo.urls.small}
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

// class SearchPhotos extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       query: "",
//     };
//   }

//   handleReset = () => {
//     Array.from(document.querySelectorAll("input")).forEach(
//       (input) => (input.value = "")
//     );
//     this.setState({
//       query: "",
//     });
//   };

//   handleSubmit = (e) => {
//     console.log(e);
//     e.preventDefault();
//     this.search(this.query.value);
//     e.currentTarget.reset();
//   };

//   search = (query) => {
//     console.log(query);
//     const API_KEY = process.env.REACT_APP_API_KEY;
//     const url = `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${query}&client_id=${API_KEY}`;
//     fetch(url)
//       .then(function (data) {
//         return data.json();
//       })
//       .then(function (data) {
//         data.results.forEach((photo) => {
//           let result = `
//           <input type="checkbox" id="checkbox-image${photo.id}"/>
//             <label className="label">
//             <img src ="${photo.urls.regular}" height="200" width="200"
//              </label>
//           `;
//           $(".image-result-main").append(result);
//         });
//       });
//   };

//   render() {
//     const { query } = this.state;
//     return (
//       <div className="form">
//         <form className="search-form" onSubmit={this.handleSubmit}>
//           <div className="form-input">
//             <input
//               type="text"
//               className="search-box"
//               placeholder="Search for..."
//               ref={(input) => (this.query = input)}
//             />
//           </div>
//           <button type="submit" value="submit">
//             {" "}
//             submit{" "}
//           </button>
//           <button onClick={this.handleReset} type="reset" value="reset">
//             {" "}
//             reset form{" "}
//           </button>
//           <div className="image-result-main"></div>
//         </form>
//       </div>
//     );
//   }
// }
// export default SearchPhotos;
