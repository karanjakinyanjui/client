const auth = require('./auth');

(async () => {
	s = await auth.login({email: 'abc@abc.com',password: 'abcd1234' })
	console.log(s)
})();