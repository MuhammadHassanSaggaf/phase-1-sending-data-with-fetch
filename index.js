function submitData(name, email) {
	// return the fetch chain so tests can attach their own then/catch
	return fetch("http://localhost:3000/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			name: name,
			email: email,
		}),
	})
		.then((response) => {
			// first then: check for HTTP-level errors?
			// (JSON Server will usually return a 201, so we can go straight to parsing)
			return response.json();
		})
		.then((userObj) => {
			// second then: we now have the parsed object,
			// which includes the new `id` assigned by JSON Server
			const p = document.createElement("p");
			p.textContent = `User ID: ${userObj.id}`;
			document.body.appendChild(p);
		})
		.catch((err) => {
			// catch any network / parsing errors
			const p = document.createElement("p");
			p.textContent = `Error: ${err.message}`;
			document.body.appendChild(p);
		});
}
