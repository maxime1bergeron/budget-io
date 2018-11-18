export default class Database {

	static getOverviewData = async (year) => {
	    const response = await fetch('/api/overview/'+year);
	    if(response.status !== 204) {
	    	const body = await response.json();
		    if(response.status !== 200) throw Error(body.error);
		    else return body;
	    } return {};
	};

	static saveOverviewData = async (year, data) => {
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
