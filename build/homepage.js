import React from 'react';
import ReactDOM from 'react-dom'
import {Link} from 'react-router';

export default class homepage extends React.Component {
  render(){
    return(
      <div class="row-md-4">
          <div class="col-md-4">
              <div class="panel panel-default">
                  <div class="panel-body">
                      <h4>What You Have Next...</h4>
                      <ul class="next-events-list">
                          <li><a href="#">CMPSCI 326</a> @ 4:00pm</li>
                          <li><a href="#">Karate</a> @ 6:45pm</li>
                          <li><a href="#">Something Random</a> @ 8:30pm</li>
                      </ul>
                  </div>
              </div>
          </div>
          <div class="col-md-8">
              <div class="panel panel-default">
                  <div class="panel-body">
                      <h4>Tell Us How It Was!</h4>
                      <div class="card">
                          <h4>On OCTOBER 3rd You Attended</h4>
                          <img class="card-img-top" src="img/mountain-hike.jpeg" alt="UMASS Outing Club img">
                          <div class="card-block">
                              <h4 class="card-title">Mountain Hike</h4>
                              <h6 class="card-subtitle text-muted"><a href="#">UMASS Outing Club</a></h6>
                              <p class="card-text">Just hiking around, doing outdoorsy stuff.</p>
                              <a href="#" class="btn btn-primary">
                                  <span class="glyphicon glyphicon-edit"></span> Review
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
