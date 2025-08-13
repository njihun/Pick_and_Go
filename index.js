import { getRegion } from "./parser.js";
const region = await getRegion();
const regionElement = document.querySelector('#recommend > form > div:nth-of-type(1) > div:nth-of-type(1)');
const regionDropDown = document.getElementById('cities');
const overlay = document.getElementById('overlay');
regionDropDown.innerHTML = '';
region.forEach(e => {
    const city = document.createElement('div');
    city.classList.add('city');
    const name = document.createElement('span');
    name.classList.add('name');
    name.innerText = e.name;
    city.appendChild(name);
    const children = document.createElement('div');
    children.id = 'child';
    e.child.forEach((e2) => {
        const city2 = document.createElement('div');
        city2.classList.add('city');
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

regionElement.addEventListener('click', () => {
    if (regionDropDown.style.display) {
        document.querySelector('.dropdown-icon').classList.remove('open');
        regionDropDown.style.display = '';
    } else {
        document.querySelector('.dropdown-icon').classList.add('open');
        regionDropDown.style.display = 'block';

    }
});

document.querySelectorAll('#cities > .city > #child > .city').forEach((e) => {
    e.addEventListener('click', () => {
        parent = e.parentElement.parentElement.querySelector('span');
        regionElement.querySelector('span').innerText = (parent.innerText + ' ' + e.innerText);
    });
});

regionElement.addEventListener('focusout', () => {
    document.querySelector('.dropdown-icon').classList.remove('open');
    regionDropDown.style.display = '';
});

function close(e) {
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