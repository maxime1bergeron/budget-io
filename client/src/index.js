import React from 'react';
import ReactDOM from 'react-dom';
import DB from './modules/database.js'
import Overview from './components/overview/overview.js'
import './index.css';


class App extends React.Component {
	constructor(props){
		super(props);

		const months = ["Janvier", "Février", "Mars", "Avril", "May", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
		
		const categories = [
			{"name":"Transport", 	"tag":"transport", 	"items":5},
			{"name":"Nourriture", 	"tag":"nourriture", "items":2},
			{"name":"Services", 	"tag":"services", 	"items":3},
			{"name":"Habitation", 	"tag":"habitation", "items":3},
			{"name":"Assurances", 	"tag":"assurances", "items":3},
			{"name":"Personnel", 	"tag":"personnel", 	"items":7},
		];

		const columns = [
			{"name":"Transport", 		"tag":"transport", 		"category":"transport"},
			{"name":"Essence", 			"tag":"essence", 		"category":"transport"},
			{"name":"Auto", 			"tag":"auto", 			"category":"transport"},
			{"name":"Stationnement", 	"tag":"stationnement", 	"category":"transport"},
			{"name":"Autre", 			"tag":"autre", 			"category":"transport"},
			{"name":"Restaurant", 		"tag":"restaurant",		"category":"nourriture"},
			{"name":"Épicerie", 		"tag":"epicerie",		"category":"nourriture"},
			{"name":"Cellulaire", 		"tag":"cellulaire",		"category":"services"},
			{"name":"Internet", 		"tag":"internet",		"category":"services"},
			{"name":"Abonnements", 		"tag":"abonnements",	"category":"services"},
			{"name":"Loyer", 			"tag":"loyer",			"category":"habitation"},
			{"name":"Mobilier", 		"tag":"mobilier",		"category":"habitation"},
			{"name":"Électricité", 		"tag":"electricite",	"category":"habitation"},
			{"name":"Automobile", 		"tag":"automobile",		"category":"assurances"},
			{"name":"Habitation", 		"tag":"habitation",		"category":"assurances"},
			{"name":"Santé", 			"tag":"sante",			"category":"assurances"},
			{"name":"Vêtements", 		"tag":"vetements",		"category":"personnel"},
			{"name":"Médicaments", 		"tag":"medicaments",	"category":"personnel"},
			{"name":"Services", 		"tag":"services",		"category":"personnel"},
			{"name":"Charité",	 		"tag":"charite",		"category":"personnel"},
			{"name":"Cadeaux", 			"tag":"cadeaux",		"category":"personnel"},
			{"name":"Vacances", 		"tag":"vacances",		"category":"personnel"},
			{"name":"Autres", 			"tag":"autres",			"category":"personnel"},
		];


		// Init states
		this.state = {
			year: 2023,
			months: months, 
			categories: categories, 
			columns: columns,
			overviewData: {},
			overviewDataStatus: {
				loaded: false,
				upToDate: false,
				saving: false,
			}

		}

	}

	// Load data 
	componentDidMount() {

		// Load overview data
	    DB.getOverviewData(this.state.year)
	      	.then((res) => {
	      		let overviewDataStatus = {...this.state.overviewDataStatus}
	      		overviewDataStatus.loaded = true;
	      		overviewDataStatus.upToDate = true;
	      		this.setState({ 
	      			overviewData: res,
	      			overviewDataStatus: overviewDataStatus
	      		})
	      	})
	      	.catch(err => console.log(err));

	}

	// TEMP : add random amount on click
	handleOverviewClick(key){
		if(!this.state.overviewDataStatus.loaded){
			alert("Data was not loaded")
			return;
		}

		const ids = key.split(".");
		const tags = ids[1].split("-");
		this.addSpending(ids[0], tags[0], tags[1]);	
	}
	addSpending(period, category, tag){
		let data = this.state.overviewData;

		let keys = [];
		keys.push(this.state.year+"."+category+"-"+tag);
		keys.push(this.state.year+"."+category);
		keys.push(this.state.year+".spending");
		keys.push(period+"."+category+"-"+tag);
		keys.push(period+"."+category);
		keys.push(period+".spending");

		let amount = Math.random()*100;
		for (let i=0; i<keys.length; i++) {
			data[keys[i]] = (data[keys[i]])? data[keys[i]] + amount : amount;
		}

		// Different calculation for total
		data[period+".total"] = (data[period+".total"])? data[period+".total"] - amount : -amount;
		data[this.state.year+".total"] = (data[this.state.year+".total"])? data[this.state.year+".total"] - amount : -amount;

		this.setState({ overviewData: data });

		if(this.state.overviewDataStatus.saving){
      		let overviewDataStatus = {...this.state.overviewDataStatus}
      		overviewDataStatus.upToDate = false;
			this.setState({overviewDataStatus:overviewDataStatus})	
		}else this.saveOverviewData();	
	}

	// Save overview data
	saveOverviewData() {
      	let overviewDataStatus = {...this.state.overviewDataStatus}
      	overviewDataStatus.saving = true;
		overviewDataStatus.upToDate = true;
		this.setState({overviewDataStatus:overviewDataStatus});

	    DB.saveOverviewData(this.state.year, this.state.overviewData)
	    .then((res) => {
	    	if(this.state.overviewDataStatus.upToDate === false){
	    		this.saveOverviewData();
	    	}else{
		      	let overviewDataStatus = {...this.state.overviewDataStatus}
		      	overviewDataStatus.saving = false;
	    		this.setState({overviewDataStatus:overviewDataStatus})	
	    	}	      	
	    })
	    .catch(err => console.log(err));

	}

	render() {

		let status = ""
		if(!this.state.overviewDataStatus.loaded) status = "Data not loaded."
		else if(!this.state.overviewDataStatus.upToDate) status = "Data requires saving."
		else if(this.state.overviewDataStatus.saving) status = "Data is saving."
		else status = "Data is up-to-date."

		return ([
			<Overview key="overview"
				year={this.state.year} 
				months={this.state.months}
				categories={this.state.categories}
				columns={this.state.columns}
				data={this.state.overviewData} 
				onClick={(key) => this.handleOverviewClick(key)}
			/>,
			<p key="status" >Overview : {status}</p>
		]);
	}
}

// ========================================

ReactDOM.render(
  <App />,	
  document.getElementById('root')
);
