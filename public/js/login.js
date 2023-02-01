async function loginFormHandler(e) {

    event.preventDefault();

    const username = document.querySelector('#login-username').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({username: username, password:password}),
            headers: {'Content-type': 'application/json'},
        });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('failed to login');
    }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
