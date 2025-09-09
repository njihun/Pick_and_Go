const url = 'https://d0g0h1.world';

let tourId = new URL(location.href);
tourId = tourId.searchParams.get('id');
const data = (await getTour([tourId]))[0];
document.getElementById('title').innerText = data.title;
document.getElementById('addr').innerText = data.addr1;


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