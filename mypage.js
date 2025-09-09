if (!sessionStorage.getItem('name')) {
    document.body.style.overflow = 'hidden';
    const login = document.getElementById('login');
    overlay.style.display = 'block';
    login.style.display = 'block';
} else {
    document.querySelector('#profile > p > span').innerText = sessionStorage.getItem('name');
    let user = document.querySelectorAll('#user > div:nth-of-type(2) > div');
    user[0].innerText = sessionStorage.getItem('email');
    const sex = sessionStorage.getItem('sex');
    user[1].innerText = sex=='male'?'남':sex=='female'?'여':'알 수 없음.';
    const age = sessionStorage.getItem('age').slice(0, 4);
    user[2].innerText = new Date().getFullYear()+1-Number(age);
}