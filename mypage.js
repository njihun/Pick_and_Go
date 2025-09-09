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
    user[2].innerText = (new Date().getFullYear()+1-Number(age))+'세';
    document.getElementById('user-edit').onclick = () => {
        document.getElementById('name').value = sessionStorage.getItem('name');
        document.getElementById('email').value = sessionStorage.getItem('email').split('@')[0];
        const domain = Array.from(document.getElementById('domain').children).slice(1, document.getElementById('domain').children.length - 1).some((e)=>{
            return e.value==sessionStorage.getItem('email').split('@')[1];
        });
        if (domain) {
            Array.from(document.getElementById('domain').children).slice(1, document.getElementById('domain').children.length - 1).filter((e)=>{
                return e.value==sessionStorage.getItem('email').split('@')[1];
            })[0].selected = true;
        } else {
            document.getElementById('domain').children[document.getElementById('domain').children.length - 1].selected = true;
            document.getElementById('email-domain').style.display = 'block';
            document.getElementById('email-domain').value = sessionStorage.getItem('email').split('@')[1];
            document.getElementById('gender').value = sessionStorage.getItem('sex')=='male'?'male':sessionStorage.getItem('sex')=='female'?'female':'select';
        }
        
        close();
        document.body.style.overflow = 'hidden';
        const userData = document.getElementById('user-data');
        overlay.style.display = 'block';
        userData.style.display = 'block';
    };
}


