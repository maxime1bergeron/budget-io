export default class Database {


	// LOAD OVERVIEW DATA
	static loadOverviewData(year, app){
		this.async_getOverview(year)
		.then((res) => {
      		let overviewDataStatus = {...app.state.overviewDataStatus}
      		overviewDataStatus.loaded = true;
      		overviewDataStatus.upToDate = true;
      		app.setState({ 
      			year: year,
      			overviewData: res,
      			overviewDataStatus: overviewDataStatus
      		})
      	})
      	.catch(err => console.log(err));
	}
	static async_getOverview = async (year) => {
	    const response = await fetch('/api/overview/'+year);
	    if(response.status !== 204) {
	    	const body = await response.json();
		    if(response.status !== 200) throw Error(body.error);
		    else return body;
	    } return {};
	};


	// SAVE OVERVIEW DATA
	static saveOverviewData(app) {
      	let overviewDataStatus = {...app.state.overviewDataStatus}
      	overviewDataStatus.saving = true;
		overviewDataStatus.upToDate = true;
		app.setState({overviewDataStatus:overviewDataStatus});

	    this.async_saveOverview(app.state.year, app.state.overviewData)
	    .then((res) => {
	    	if(app.state.overviewDataStatus.upToDate === false){
	    		app.saveOverviewData();
	    	}else{
		      	let overviewDataStatus = {...app.state.overviewDataStatus}
		      	overviewDataStatus.saving = false;
	    		app.setState({overviewDataStatus:overviewDataStatus})	
	    	}	      	
	    })
	    .catch(err => console.log(err));

	}
	static async_saveOverview = async (year, data) => {
		const options = {
			method: "POST",
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
			body: JSON.stringify({ data:data })
		}
	    const response = await fetch('/api/overview/'+year, options);
	    if(response.status !== 204) {
	    	const body = await response.json();
		    throw Error(body.error);
	    } return true;
	};


}
