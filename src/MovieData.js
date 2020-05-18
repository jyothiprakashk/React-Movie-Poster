import React, { Component } from 'react'
import axios from 'axios';


export class MovieData extends Component {
    state={
        moviedata:{}
    }
    componentDidMount() {
        try {
        axios.get(`https://www.omdbapi.com/?apikey=2ff3447e&i=${this.props.ImdbData}`)
        .then(res=> res.data)
        .then(res=> {
          this.setState({
            moviedata:res
          })
        })
    }
    catch(error) {
        this.setState({
            moviedata:"Your Query params are Wrong"
        })
    }
        
      }
    render() {

        const {
            Title,
            Released,
            Runtime,
            Director,
            Poster,
            Plot,
            imdbRating
        }=this.state.moviedata
        if (!Poster||Poster==="N/A") {
            return null
        }

        let Hours1=2
        const Minute1=30
        
        if (Runtime==="N/A") {
            return <div className="container">
            <div >
                <img src={Poster} alt="NoImage" id="movie-image"></img>
            </div>
          <div className="maindata">
                <div className="title">{Title}</div>
                <div className="data">{Released}</div>
                <p className="data">{Plot && Plot.substr(0, 100)}</p>
                <p>{Director && Director.substr(0,20)}</p>
                <div className="flex">
                <p>{Hours1}:{Minute1}</p>
                <div className="star">
                        <span className="fa fa-star checked"></span>
                        <p>{imdbRating}</p>
                    </div>
                </div>
            </div>
        </div>
        }

        const time=parseInt(Runtime)
        let Hours=Math.floor(time/60)
        const Minute=time%60
       
        
        return (
            
            
            <div className="container">
                <div >
                    <img src={Poster} alt="NoImage" id="movie-image"></img>
                </div>
              <div className="maindata">
                    <div className="title">{Title}</div>
                    <div className="data">{Released}</div>
                    <p className="data">{Plot && Plot.substr(0, 100)}</p>
                    <p>{Director && Director.substr(0,20)}</p>
                    <div className="flex">
                    <p>{Hours}:{Minute}</p>
                    <div className="star">
                        <span className="fa fa-star checked"></span>
                        <p>{imdbRating}</p>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieData
