import React from "react";
import axios, { Axios } from "axios";
import Films from "../Films";
import "./style.css";

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      directorName: "",
      isLoading: false,
      data: [],
    };
  }

  handleChange = (e) => {
    this.setState({ directorName: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { directorName } = this.state;

    const token = "8c5996d5-fb89-46c9-8821-7063cfbc18b1";

    this.setState({ isLoading: true });
    axios
      .get(
        "https://app.codescreen.com/api/assessments/films",

        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            directorName: directorName.trim(),
          },
        }
      )
      .then((res) => {
        const data = res?.data;

        if (data.length > 0) {
          this.setState({
            data: data,
            isLoading: false,
          });
        } else {
          this.setState({
            data: [
              { name: "N/A", length: "N/A", rating: "0", releaseDate: "N/A" },
            ],
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <form
          className="container"
          id="input-form"
          onSubmit={this.handleSubmit}
        >
          <p className="films-analysis-service">Films Analysis Service </p>

          <input
            type="text"
            className="director-name-input-box"
            id="input-box"
            value={this.state.directorName}
            onChange={(e) => {
              this.handleChange(e);
            }}
          />
          <button className="submit-button" type="submit">
            SUBMIT
          </button>
        </form>
        {this.state.isLoading ? (
          <div className="loader">Fetching data please wait ....</div>
        ) : (
          <Films data={this.state.data} />
        )}
      </div>
    );
  }
}

export default App;
