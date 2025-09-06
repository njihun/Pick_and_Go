import { getRegion } from "./parser.js";
import { mypage, favoriteAttractions } from "./pageLoad.js";
await import('./hotplace.js');
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
        e.style.display = 'none';
    });
    overlay.style.display = 'none';
    document.body.style.overflow = '';
}
overlay.addEventListener('click', () => {
    close();
});
document.querySelectorAll('.close').forEach((e)=> {
    e.addEventListener('click', () => {
        close();
    });
});

document.getElementById('log').addEventListener('click', () => {
    document.body.style.overflow = 'hidden';
    const login = document.getElementById('login');
    overlay.style.display = 'block';
    login.style.display = 'block';
});

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


window.addEventListener("message", (event) => {
    // 보안상 origin 체크 필수
    if (event.origin !== window.location.origin) return;
    const { data } = event.data;
    console.log("카카오 토큰 받음:", data);
    close();
    
    document.body.style.overflow = 'hidden';
    const userData = document.getElementById('user-data');
    overlay.style.display = 'block';
    userData.style.display = 'block';
});


document.body.style.overflow = 'hidden';
const userData = document.getElementById('user-data');
overlay.style.display = 'block';
userData.style.display = 'block';

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