import { getFilterList } from "./parser.js";
const jwt = sessionStorage.getItem('jwt');
async function getInterTour() {
    const url = 'https://d0g0h1.world';
    if (!jwt) return 'jwt is undefined';
    let res = await fetch(url+'/tour/getInterTour', {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+jwt
        }
    });
    res = await res.json();
    return res.tours;
}

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
    res = await res.json();
    console.log(res)
    return res.data;
}

const filter = await getFilterList();
const list = document.querySelector('.sub-header .menu-bar>.menu-item .list');

document.querySelector('.sub-header .menu-bar>.menu-item:first-child').addEventListener('click', (e) => {
    if (document.querySelector('.sub-header .menu-bar>.menu-item .list').contains(e.target)) return;
    if (list.style.display) {
        list.style.display = '';
    } else {
        list.style.display = 'block';
        const select = Array.from(document.querySelectorAll('.sub-header > .menu-bar > .menu-item:not(:first-child)')).map((e) => e.innerText.trim());
        list.children[1].innerHTML = '';
        filter.forEach((e) => {
            const div = document.createElement('div');
            div.innerText = e.Nm;
            if (select.includes(e.Nm)) {
                div.style.backgroundColor = '#9ED0FF';
                div.style.color = '#fff';
            }
            div.addEventListener('click', () => {
                if (div.style.backgroundColor) {
                    div.style.backgroundColor = '';
                    div.style.color = '';
                } else {
                    div.style.backgroundColor = '#9ED0FF';
                    div.style.color = '#fff';
                }
            });
            list.children[1].appendChild(div);
        });
        
        
        
    }
    
});

document.querySelector('.sub-header .menu-bar>.menu-item .list > :last-child > div:nth-of-type(1)').addEventListener('click', () => {
    document.querySelector('.sub-header .menu-bar>.menu-item .list').style.display = '';
});
document.querySelector('.sub-header .menu-bar>.menu-item .list > :last-child > div:nth-of-type(2)').addEventListener('click', () => {
    const select = Array.from(list.children[1].children).filter((e) => e.style.backgroundColor);
    console.log(select);
    const menuBar = document.querySelector('.sub-header .menu-bar');
    menuBar.replaceChildren(menuBar.children[0]);
    select.forEach((e) => {
        const div = document.createElement('div');
        div.classList.add('menu-item');
        const span = document.createElement('span');
        span.innerText = e.innerText;
        const close = document.createElement('div');
        close.classList.add('close');
        close.addEventListener('click', () => {
            div.remove();
        });
        div.append(span, close);
        menuBar.appendChild(div);
    });
    document.querySelector('.sub-header .menu-bar>.menu-item .list').style.display = '';
});

if (!sessionStorage.getItem('name')) {
    const notice = document.getElementById('notice');
    notice.style.display = 'block';
    overlay.style.display = 'block';
    notice.onclick = () => {
        notice.style.display = '';
        document.body.style.overflow = 'hidden';
        const login = document.getElementById('login');
        login.style.display = 'block';
    };
} else {
    try {
        const tourList = await getTour(await getInterTour());
        console.log(tourList);
    } catch(err) {
        console.log(err);
        
    };
}