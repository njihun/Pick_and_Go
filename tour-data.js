const url = 'https://d0g0h1.world';


// 쿼리 파라미터 바탕으로 분류하여 화면에 나타낼 것.



// let interTourList = [];
let query = new URL(location.href).searchParams;
let tourType = query.get('type');
// for (const [key, value] of query.entries()) {
//     console.log(value, key);
// }
switch (tourType) {
    case 'tour-data':
        let tourId = query.get('id');
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
                notice.children[1].innerText = '해당 기능은 로그인 후 이용 가능합니다!';
                document.querySelector('#notice > *:last-child > div').onclick = () => {
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
        const interTour = await getInterTour();
        console.log(interTour);
        
        if (interTour.some((e)=>e["tour_id"] == tourId)) {
            document.getElementById('star').classList.add('open');
        }
        break;
    default:
        break;
}