import React from 'react';
import './App.css';


class App extends React.Component {
	constructor(){
    super();
		this.state={
      data:[],
      search:'',
      searchbyname: '',
      selectedLocation: "all"
    }
    this.onChange=this.onChange.bind(this);
		
  }
  filteredProjects = [];
  availableLocations = ['Location'];
  allProjects = [];
  
  locationOptions = () => {
    return this.availableLocations.map((location, index) => { 
     return <option key={index} value={location}>{location}</option>
     })
  }
	componentDidMount(){
    fetch('http://starlord.hackerearth.com/kickstarter')
    .then((response)=>response.json())
    .then((response)=>{
        response.map((details) => {
            if(details.location && this.availableLocations.indexOf(details.location) < 0) {
              this.availableLocations.push(details.location);
            }          
            return this.availableLocations;
        });
        this.setState({data: response});
        this.allProjects = response;
      })
  
  }

  onChange(event){
    this.setState({search: event.target.value})
  }
  onLocationChange = (event) => {
    let locationFilteredProjects;
    if(event.target.value === 'all'){
      locationFilteredProjects = this.allProjects;
    } else {
      locationFilteredProjects = this.allProjects.filter(details => {
        return details.location === event.target.value
      })
    }
    this.setState({
      data: locationFilteredProjects
    })
  }

render() {
  const {search}=this.state;
  this.filteredProjects=this.state.data.filter(details=>{
    return details.blurb.toLowerCase().indexOf(search.toLowerCase()) !==-1
  })

    return (
      <div>
       <input type="text" placeholder="Search for Kickstarter projects" onChange={this.onChange} className="searchProjects" />
       {
         this.availableLocations ? (<select
          id="location"
            name="location"
            onChange={this.onLocationChange}
            className="locationSelection">
          { this.locationOptions()}
         </select>): ''
       }
     { 
       this.state.data ?
       (this.filteredProjects.map((details, index) => 
       <div key={index} className="flex-container">
       <div>AMOUNT PLEDGED : {details["amt.pledged"]}</div>
       <div>PROJECT BLURB : {details.blurb}</div>
       <div>PROJECT CREATOR:  {details.by}</div>
       <div>ABBREVIATED COUNTRY CODE : {details.country}</div>
       <div>CURRENCY TYPE OF AMOUNT PLEDGED : {details.currency} </div>
       <div>CAMPAIGN END TIME: {details["end.time"]} </div>
       <div>LOCATION : {details.location} </div>
       <div>PERCENTAGE FUNDED : {details["percentage.funded"]} </div>
       <div>TOTAL NO OF BACKERS : {details["num.backers"]} </div>
       <div>STATE : {details.state} </div>
       <div>TITLE : {details.title} </div>
       <div>TYPE : {details.type} </div>
       <div>URL : {details.url} </div>
       </div>
       )) 
       :
       <h3>Data Loading</h3>
      }
      </div>
    );
  }
}
export default (App);