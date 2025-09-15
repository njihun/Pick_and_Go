const url = 'https://d0g0h1.world';

let interTourList = [];
let tourId = new URL(location.href);
tourId = tourId.searchParams.get('id');
const data = (await getTour([tourId]))[0];
document.getElementById('title').innerText = data.title;
document.getElementById('addr').innerText = data.addr1;
document.getElementById('tour-img').src = data.firstimage;


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

async function star() {
    let work;
    
    if (!sessionStorage.getItem('jwt')) {
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
        if (document.getElementById('star').classList.contains('open')) {
            document.getElementById('star').classList.remove('open');
            work = "DELETE";
        } else {
            document.getElementById('star').classList.add('open');
            work = "ADD";
        }
        const req = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+jwt
            },
            "body": JSON.stringify({
                "attribute": work,
                "contendidList": [
                    tourId
                ]
            })
        }
        let res = await fetch(url+'/tour/setInterTour', req);
        res = await res.json();
        console.log(res.message);
    }
}
window.star = star;

// 처음 로드될 때 관심 관광지인지 확인할 것
if ((await getInterTour().map((e) => e["tour_id"])).indexOf(tourId)!=-1) {
    document.getElementById('star').classList.add('open');
}