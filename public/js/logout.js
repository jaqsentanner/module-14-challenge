async function logout() {
    const response = fetch('/api/users/logout', {
        method: 'POST',
        headers: {'Content-type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#logout').addEventListener('click', logout);