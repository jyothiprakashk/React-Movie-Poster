import "./App.css";
import React, { Component } from "react";
import MovieData from "./MovieData";
import axios from "axios";
import NetworkDetector from "./NetworkDetector";
import Spinner from "./Spinner";

export class App extends Component {
  state = {
    movieList: ["data"],
    search: "",
    isDisconnected: false,
    isLoading: false,
    setError: "",
    dark: false,
  };

  searchEvent = (e) => {
    this.setState({ isLoading: true });
    e.preventDefault();
    axios
      .get(
        `https://www.omdbapi.com/?apikey=2ff3447e&s=${this.state.search}&plot=full`
      )
      .then((res) => res.data)

      .then((res) => {
        if (!res.Search) {
          this.setState({ movieList: [] });
          return;
        }

        const movieList = res.Search.map((data) => data.imdbID);
        this.setState({ movieList, isLoading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          setError: "Your fetching details are wrong please check details",
        });
      });
  };
  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };
  handleClickdata = () => {
    const darkstorage=!this.state.dark
    this.setState({ dark: darkstorage });
    localStorage.setItem("dark",JSON.stringify(darkstorage))
  };
  componentDidMount() {
    const getdata=JSON.parse(localStorage.getItem("dark"))
    this.setState({dark:getdata})
  }
  render() {
    const { movieList } = this.state;
    const { isLoading } = this.state;
    const { setError } = this.state;
    const { dark } = this.state;
    return (
      <div>
        <div className={dark ? "black" : "light"}>
          <div className="header">
          <h2 className="data-poster">React Movie Poster</h2>
          <label className="switch">
            <input
              type="checkbox"
              defaultChecked={this.state.checked}
              onChange={this.handleClickdata}
            />
            <span className="slider round" />
          </label>
          </div>
          <form onSubmit={this.searchEvent} className="form">
            <input onChange={this.handleChange} value={this.state.search} />
            <button className="button" type="submit">Search</button>
          </form>
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="Movies">
              {movieList.length > 0 ? (
                movieList.map((data) => (
                  <MovieData ImdbData={data} key={data} />
                ))
              ) : (
                <p className="error"> OOPS!! No Results Found</p>
              )}
            </div>
          )}
          <div className="internet ">{setError ? setError : null}</div>
        </div>
        
      </div>
    );
  }
}

export default NetworkDetector(App);
