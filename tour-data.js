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

async function getInterTour() {
    const url = 'https://d0g0h1.world';
    const jwt = sessionStorage.getItem('jwt');
    if (!jwt) return 'jwt is undefined';
    let res = await fetch(url+'/tour/getInterTour', {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+jwt
        }
    });
    res = await res.json();
    console.log(res)
    return res.tours;
}

function star() {
    if (document.getElementById('star').classList.contains('open')) {
        // 관심 관광지에서 삭제
        document.getElementById('star').classList.remove('open');
    } else {
        document.getElementById('star').classList.add('open');

    }
}
window.star = star;

// 처음 로드될 때 관심 관광지인지 확인할 것
if (await getInterTour().indexOf(tourId)!=-1) {
    console.log(1);
} else {
    console.log(2);
    
}