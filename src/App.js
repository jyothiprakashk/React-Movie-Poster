import './App.css';
import React, { Component } from 'react'
import MovieData from './MovieData';
import axios from 'axios'
import NetworkDetector from './NetworkDetector';

export class App extends Component {
  state={
    movieList:["data"],
    search:"",
    isDisconnected: false
  }
  searchEvent=e=> {
    e.preventDefault()
    axios.get(`https://www.omdbapi.com/?apikey=2ff3447e&s=${this.state.search}&plot=full`)
    .then(res=> res.data)
    
    .then(res=>{
      if(!res.Search) {
        this.setState({movieList:[]});
        return;
      }
      const movieList=res.Search.map(data=>data.imdbID)
      this.setState({movieList})
    }
    )
  }
  handleChange=e=> {
      this.setState({
        search:e.target.value
      })
  }
  
  render() {
    const { movieList }=this.state
   
   
    return (
      <div>
      <div className="header">React Movie Poster</div>
      <form onSubmit={this.searchEvent} className="form">
          <input onChange={this.handleChange} value={this.state.search}/>
          <button type="submit">Search</button>
      </form>
      <div className="Movies">
      {movieList.length > 0 ?(
        movieList.map(data=> (
          
               <MovieData ImdbData={data} key={data} />
        ))
      ): (
        <p className="error"> OOPS!! No Results Found</p>
      )}
      </div>
      
        
      </div>
    )
  }
}



export default NetworkDetector(App)

