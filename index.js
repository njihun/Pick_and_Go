import { getRegion } from "./parser.js";
import { mypage, favoriteAttractions } from "./pageLoad.js";
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
        console.log(e.querySelector('span').dataset.id);
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

console.log(location.host);


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
// mypage();