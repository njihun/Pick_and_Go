const url = 'https://d0g0h1.world';
const req = {
    "method": "GET",
    "headers": {
        "Content-Type": "application/json",
    }
}
const res = await fetch(url+"/recommend/getRandomTour", req);
const data = await res.json();
let seq = 0;
let randomTourData = data.result;

document.getElementById('tour-img').src = randomTourData.images[seq];
document.querySelector('#tour-data > div > div:nth-of-type(1)').innerText = seq+1+'/15';

const select = document.querySelectorAll('#select > div');

let interTour = [];
Array.from(select).forEach((e, i) => {
    e.addEventListener('pointerenter', () => {
        if (i==0) {
            document.getElementById('tour-img').style.marginLeft = '-5%';
        } else {
            document.getElementById('tour-img').style.marginLeft = '5%';
        }
        e.classList.add('focus');
    });
    e.addEventListener('pointerleave', () => {
        e.classList.remove('focus');
        document.getElementById('tour-img').style.marginLeft = '';
    });
    e.addEventListener('click', async () => {
        if (i==1) {
            // 관심 관광지 추가
            interTour.push(randomTourData.data[seq].contentid);
        }
        if (seq>=14) {
            // 추천
            if (!sessionStorage.getItem('jwt')) {
                const notice = document.getElementById('notice');
                notice.style.display = 'block';
                overlay.style.display = 'block';
                notice.onclick = () => {
                    location.reload();
                };
            } else {
                let req = {
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer "+sessionStorage.getItem('jwt')
                    },
                    "body": JSON.stringify({
                        "attribute": "ADD",
                        "contendidList": interTour
                    })
                }
                let res = await fetch(url+'/tour/setInterTour', req);
                res = await res.json();
                console.log(res.message);
                
                req = {
                    "method": "POST",
                    "headers": {
                        "Content-Type":"application/json",
                        "Authorization":"Bearer {YourToken}"
                    }
                }
                res = await fetch(url+'/recommend/getRecommendTour', req);
                res = await res.json();
                console.log(res);
                
                return;
            }
        }
        document.querySelector('#tour-data > div > div:nth-of-type(1)').innerText = ++seq+1+'/15';
        document.getElementById('tour-img').src = randomTourData.images[seq];
    })
});
