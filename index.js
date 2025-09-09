import { getRegion } from "./parser.js";
import { mypage, favoriteAttractions } from "./pageLoad.js";
await import('./hotplace.js');
const url = 'https://d0g0h1.world';
window.mypage = mypage;
window.favoriteAttractions = favoriteAttractions;
const region = await getRegion();
const regionElement = document.querySelector('#recommend > form > div:nth-of-type(1) > div:nth-of-type(1)');
const regionDropDown = document.getElementById('cities');
const overlay = document.getElementById('overlay');
const burgerBar = document.querySelector('.burger-bar');
regionDropDown.innerHTML = '';
region.forEach(e => {
    const city = document.createElement('div');
    city.classList.add('city');
    const name = document.createElement('span');
    name.classList.add('name');
    name.innerText = e.name;
    city.appendChild(name);
    const children = document.createElement('div');
    children.classList.add('child');
    e.child.forEach((e2) => {
        const city2 = document.createElement('div');
        city2.classList.add('city');
        city2.tabIndex = 0;
        const name = document.createElement('span');
        name.classList.add('name');
        name.dataset.id = e2.id
        name.innerText = e2.name;
        city2.appendChild(name);
        children.appendChild(city2);
    });
    city.appendChild(children);
    regionDropDown.appendChild(city);
});

document.querySelectorAll('footer > *:last-child > div > *').forEach((e) => {
    e.style.backgroundImage = `url(./imgs/${e.dataset.social}.png)`;
});

regionElement.addEventListener('click', (e) => {
    if (document.getElementById('cities').contains(e.target)) return;
    if (regionDropDown.style.display) {
        document.querySelector('.dropdown-icon').classList.remove('open');
        regionDropDown.style.display = '';
    } else {
        document.querySelector('.dropdown-icon').classList.add('open');
        regionDropDown.style.display = 'block';
    }
});

document.querySelectorAll('#cities > .city > .child > .city').forEach((e) => {
    e.addEventListener('click', () => {
        parent = e.parentElement.parentElement.querySelector('span');
        regionElement.querySelector('span').innerText = (parent.innerText + ' ' + e.innerText);
        
        document.querySelector('.dropdown-icon').classList.remove('open');
        regionDropDown.style.display = '';
    });
});

regionElement.addEventListener('focusout', (e) => {
    if (Array.from(document.querySelectorAll('#cities > .city > .child')).some((e2)=>{
        return e2.contains(e.relatedTarget)
    })) return;
    document.querySelector('.dropdown-icon').classList.remove('open');
    regionDropDown.style.display = '';
});

function close() {
    document.querySelectorAll('#modal > *').forEach((e) => {
        e.style.display = '';
    });
    overlay.style.display = '';
    document.body.style.overflow = '';
}

overlay.addEventListener('click', () => {
    if (document.getElementById('user-data').style.display) return;
    close();
});

document.querySelectorAll('.close').forEach((e)=> {
    e.addEventListener('click', () => {
        close();
    });
});

document.getElementById('log').onclick = () => {
    document.body.style.overflow = 'hidden';
    const login = document.getElementById('login');
    overlay.style.display = 'block';
    login.style.display = 'block';
};

burgerBar.addEventListener('click', () => {
    const menuItems = document.querySelector('.menu-bar > :first-child:not(.menu-item)');
    const sticks = Array.from(burgerBar.children[0].children);
    if (menuItems.style.transform) {
        sticks.forEach((e) => {
            e.classList.remove('open');
        });
        menuItems.style.transition = '';
        menuItems.style.transform = '';
        sticks[1].style.height = '';
        sticks[0].style.transform = '';
        sticks[2].style.transform = '';
    } else {
        sticks.forEach((e) => {
            e.classList.add('open');
        });
        menuItems.style.transition = 'all 0.3s ease';
        menuItems.style.transform = 'translateX(0)';
        sticks[1].style.height = '0px';
        sticks[0].style.transform = 'translate(-50%, -50%) rotate(45deg)';
        sticks[2].style.transform = 'translate(-50%, -50%) rotate(-45deg)';
    }
});

document.querySelector('.social > div > div:nth-of-type(1)').addEventListener('click', () => {
    const url = 'https://kauth.kakao.com/oauth/authorize?client_id=e8af967f22a2e98d8aa94bcfc421bcfa&redirect_uri=https://njihun.github.io/Pick_and_Go/login/kakao.html&response_type=code';
    const windowFeatures = "left=100,top=100,width=420,height=640";
    window.open(url, '카카오 로그인', windowFeatures);
});

function login(user) {
    console.log('로그인 성공: '+user);
    sessionStorage.setItem('name', user.name);
    sessionStorage.setItem('email', user.email);
    sessionStorage.setItem('sex', user.sex);
    sessionStorage.setItem('age', user.age);

    // 로그아웃 처리
    document.getElementById('log').style.backgroundColor = '#FF5151';
    document.getElementById('log').innerText = 'LogOut';
    document.getElementById('log').onclick = () => {
        document.body.style.overflow = 'hidden';
        const login = document.getElementById('login');
        overlay.style.display = 'block';
        login.style.display = 'block';
    };
    mypage();
}

let data = null;
window.addEventListener("message", async (event) => {
    // 보안상 origin 체크 필수
    console.log('메시지 받음', event.origin, window.location.origin);
    
    if (event.origin !== window.location.origin) return;
    data = JSON.parse(event.data.data);
    console.log("카카오 토큰 받음:", data);
    const req = {
        "method": "GET",
        "headers":{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+data.PIGO_token
        }
    }
    let res = await fetch(url+'/user/getUserInfo', req);
    res = await res.json();
    if (res.sex) {
        login(res);
        close();
        return;
    }
    
    document.getElementById('name').value = data.user.kakao_account.profile.nickname;
    document.getElementById('email').value = data.user.kakao_account.email.split('@')[0];
    const domain = Array.from(document.getElementById('domain').children).slice(1, document.getElementById('domain').children.length - 1).some((e)=>{
        return e.value==data.user.kakao_account.email.split('@')[1];
    });
    if (domain) {
        Array.from(document.getElementById('domain').children).slice(1, document.getElementById('domain').children.length - 1).filter((e)=>{
            return e.value==data.user.kakao_account.email.split('@')[1];
        })[0].selected = true;
    } else {
        document.getElementById('domain').children[document.getElementById('domain').children.length - 1].selected = true;
        document.getElementById('email-domain').style.display = 'block';
        document.getElementById('email-domain').value = data.user.kakao_account.email.split('@')[1];
    }
    
    close();
    document.body.style.overflow = 'hidden';
    const userData = document.getElementById('user-data');
    overlay.style.display = 'block';
    userData.style.display = 'block';
});

function numberTypeLength(e) {
    e.value = e.value.slice(0, e.dataset.max);
    if (e.value.length < e.dataset.max) return;
    if (e.dataset.max == 4) {
        e.parentElement.children[1].focus();
    } else {
        e.parentElement.children[2].focus();
    }
}
window.numberTypeLength = numberTypeLength;

document.getElementById('domain').addEventListener('change', (e) => {
    if (e.target.value == 'write') {
        document.getElementById('email-domain').style.display = 'block';
        document.getElementById('email-domain').focus();
    } else {
        document.getElementById('email-domain').style.display = '';
    }
});

let editing = false;
async function editUserData() {
    if (editing) return;
    let domain = document.querySelector('#domain').value;
    if (domain == 'write') {
        domain = document.getElementById('email-domain').value;
        if (!domain) {
            alert('이메일을 입력해 주세요.');
            return;
        }
    } else if (domain == 'select') {
        // 선택 안 한 경우
        alert('이메일을 입력해 주세요.');
        return
    }
    const userData = Array.from(document.querySelectorAll('#user-data > *:nth-child(2) input')).filter((e) => {
        return e.id != 'email-domain'
    }).map((e) => e.value);
    if (userData.some((e)=>!Boolean(e)) || document.getElementById('gender').value == 'select') {
        alert('모든 입력란을 채워주세요.');
        return;
    }
    if (userData[2] > new Date().getFullYear() || Number(userData[3]) < 1 || Number(userData[3]) > 12 || userData[4] < 1 || userData[4] > 31) {
        alert("유효한 날짜를 입력해 주세요.");
        return;
    }
    if (userData[2] == new Date().getFullYear()) {
        if (userData[3] > new Date().getMonth + 1) {
            alert("유효한 날짜를 입력해 주세요.");
            return;
        } else if (userData[3] == new Date().getMonth + 1 && userData[4] > new Date().getDate()) {
            alert("유효한 날짜를 입력해 주세요.");
            return;
        }
    }
    editing = true;
    const req = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+data.PIGO_token
        },
        "body": JSON.stringify({
            "newName": userData[0],
            "newEmail": `${userData[1]}@${domain}`,
            "newSex": document.getElementById('gender').value,
            "newAge": `${userData[2]}${userData[3]}${userData[4]}`,
        })
    };
    let res = await fetch(url + '/user/setUserInfo', req);
    if (res.status == 200) {
        res = await fetch(url+'/user/getUserInfo', {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+data.PIGO_token
            }
        });
        res = await res.json();
        login(res);
        close();
        editing = false;
    }
}
window.editUserData = editUserData;

async function getTour(tourList) {
    let res = await fetch(url+'/tour/getTour', {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            "contentidList": tourList
        })
    });
    res = res.json();
    console.log(res.data);
    
}
window.getTour = getTour;