const axios = require('axios');
let root_url = 'https://3000-df0291cc-875b-4121-ad18-fd77918a4b21.ws-eu01.gitpod.io';

let token = localStorage.getItem("authToken");
let authentication = {Authorization: `Bearer ${token}`}

module.exports.getEvents = async () => {
  let events = await axios.get(`${root_url}/events/`)
  return events.data;
}

module.exports.getOwnEvents = async () => {
  let events = await axios.get(`${root_url}/events/own`, authentication );
  return events.data;
}

module.exports.addEvent = async (event) => {
	try{
		await axios.post(`${root_url}/events/`, event, authentication )
	} catch (error){
		if(error.response.status == 403)
		{
			throw Error('Not Authorised to add Events')
		}
		if(error.response.status == 400)
		{
			throw Error('Please enter all event information')
		}
	}
}

module.exports.editEvent = async (event) => {
	try{
		await axios.put(`${root_url}/events/`, event, authentication )
	} catch (error){
		if(error.response.status == 403)
		{
			throw Error('Not Authorised to edit this event')
		}
		if(error.response.status == 401)
		{
			throw Error('Event does not exist')
		}
	}
}


module.exports.deleteEvent = async (eventID) => {
	try{
		let response = await axios.delete(`${root_url}/event/${eventID}`, authentication )
		console.log(response)
	} catch (error){
		throw Error('Could not delete')
	}
}


module.exports.rate = async (eventID, rating) => {
	try{
		await axios.post(`${root_url}/event/${eventID}`, {rating}, {Authorization: `Bearer ${token}`})
	} catch (error){
		throw Error('Rating failed')
	}
}
