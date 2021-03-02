import React, { Component } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import { connect } from 'react-redux'
import { fetchPhotos } from './redux/user/userActions'
import Photopage from './Photopage'

class App extends Component {
  constructor() {
    super();
    this.state = {
      page: 0, //based on the scroll event, the page number will be updated in order to fetch the new data from the API.
      prevY: 0
    };
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const lastPhoto = this.props.photoData.photos[this.props.photoData.photos.length - 1];
      const curPage = lastPhoto.albumId;//albumId
      this.props.fetchPhotos(curPage);
      this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
  }

  componentDidMount() {
    this.props.fetchPhotos(this.state.page);//calling fetchPhotos() from componentDidMount() lifecycle hook

    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }



  render() {
    // Additional css
    const loadingCSS = {
      height: "100px",
      margin: "30px"
    };

    // To change the loading icon behavior
    const loadingTextCSS = { display: this.props.photoData.loading ? "block" : "none" };

    return (
      <Router>
        <div className='App'>
          <Switch>
            <div>
              <Route path="/" exact>
                <h1>InCampus</h1>
                <p>Intern Assignment</p>
                <div className="">{/*style={{ minHeight: "700px" }}*/} {/*`.location.query.photo`*/}
                  {this.props.photoData.photos.map((photo, i) => ( 
                    <Link to={{pathname: `/album${photo.albumId}/${photo.id}/`}} key={i}><img className="" src={photo.url} height="200px" width="400px" alt="" key={i} /></Link>
                  ))}
                </div>
              </Route>
              <Route path="/album:albumId/:id/">
                <Photopage />
              </Route>{/* component={Photopage} /*/}
              <div
                ref={loadingRef => (this.loadingRef = loadingRef)}
                style={loadingCSS}
              >

                <span style={loadingTextCSS}>Loading...</span>
              </div>
            </div>


          </Switch>

        </div>
      </Router>
    );
  }
}



const mapStateToProps = state => {
  return {
    photoData: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPhotos: () => dispatch(fetchPhotos())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)



