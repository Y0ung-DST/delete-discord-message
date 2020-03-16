var before = 'LAST_MESSAGE_ID';
clearMessages = function(){
	const channel = window.location.href.split('/').pop();
	const baseURL = `https://discordapp.com/api/channels/${channel}/messages`;
	const headers = {"Authorization": "YOUR TOKEN" };

	let clock = 0;
	let interval = 500;

	function delay(duration) {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(), duration);
		});
	}

	fetch(baseURL + '?before=' + before + '&limit=100', {headers})
		.then(resp => resp.json())
		.then(messages => {
		return Promise.all(messages.map((message) => {
			before = message.id;
			return delay(clock += interval).then(() => fetch(`${baseURL}/${message.id}`, {headers, method: 'DELETE'}));
		}));
	}).then(() => clearMessages());
}
clearMessages();
