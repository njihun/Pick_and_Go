if (!sessionStorage.getItem('name')) {
    document.body.style.overflow = 'hidden';
    const login = document.getElementById('login');
    overlay.style.display = 'block';
    login.style.display = 'block';
} else {
    document.querySelector('#profile > p > span').innerText = sessionStorage.getItem('name');
    let user = document.querySelectorAll('#user > div:nth-of-type(2) > div');
    user[0].innerText = sessionStorage.getItem('email');
    user[1].innerText = sessionStorage.getItem('sex');
    user[2].innerText = sessionStorage.getItem('age');
}