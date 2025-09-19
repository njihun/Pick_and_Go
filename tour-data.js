const url = 'https://d0g0h1.world';
import { tourLocation } from "./index.js";

// 쿼리 파라미터 바탕으로 분류하여 화면에 나타낼 것.



// let interTourList = [];
let query = new URL(location.href).searchParams;
let tourType = query.get('type');
// for (const [key, value] of query.entries()) {
//     console.log(value, key);
// }
console.log(tourType);

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
    case 'recommend-data':
        
        const req = {
            "method": "POST",
            "headers": {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+sessionStorage.getItem('jwt')
            },
            "body": JSON.stringify({
                "location": tourLocation
            })
        }
        // res = await fetch(url+'/recommend/getRecommendTour', req);
        // res = await res.json();
        const res = ({"message":"추천결과","result":{"elapsed_time":43.76996159553528,"data":[{"addr1":"서울특별시 종로구 창의문로11가길 4 (부암동)","addr2":"","areacode":"1","cat1":"A02","cat2":"A0206","cat3":"A02060100","contentid":"2554142","contenttypeid":"14","createdtime":"20180718185120","firstimage":"http://tong.visitkorea.or.kr/cms/resource/81/3384781_image2_1.JPG","firstimage2":"http://tong.visitkorea.or.kr/cms/resource/81/3384781_image3_1.JPG","cpyrhtDivCd":"Type3","mapx":"126.9626772472","mapy":"37.5937674640","mlevel":"6","modifiedtime":"20250317110026","sigungucode":"23","tel":"","title":"유금와당박물관","zipcode":"03022","lDongRegnCd":"11","lDongSignguCd":"110","lclsSystm1":"VE","lclsSystm2":"VE07","lclsSystm3":"VE070100"},{"addr1":"서울특별시 종로구 대학로 104","addr2":"","areacode":"1","cat1":"A02","cat2":"A0202","cat3":"A02020700","contentid":"126487","contenttypeid":"12","createdtime":"20031106090000","firstimage":"http://tong.visitkorea.or.kr/cms/resource/35/3506735_image2_1.jpg","firstimage2":"http://tong.visitkorea.or.kr/cms/resource/35/3506735_image3_1.jpg","cpyrhtDivCd":"Type1","mapx":"127.0027239807","mapy":"37.5802419773","mlevel":"6","modifiedtime":"20250718090000","sigungucode":"23","tel":"","title":"마로니에공원","zipcode":"03087","lDongRegnCd":"11","lDongSignguCd":"110","lclsSystm1":"VE","lclsSystm2":"VE03","lclsSystm3":"VE030100"},{"addr1":"서울특별시 종로구 율곡로1길 40 (사간동)","addr2":"","areacode":"1","cat1":"A02","cat2":"A0206","cat3":"A02060500","contentid":"3056315","contenttypeid":"14","createdtime":"20231204105201","firstimage":"http://tong.visitkorea.or.kr/cms/resource/00/3056300_image2_1.jpg","firstimage2":"http://tong.visitkorea.or.kr/cms/resource/00/3056300_image3_1.jpg","cpyrhtDivCd":"Type3","mapx":"126.9807316132","mapy":"37.5776613265","mlevel":"6","modifiedtime":"20250718090000","sigungucode":"23","tel":"","title":"갤러리미르","zipcode":"03062","lDongRegnCd":"11","lDongSignguCd":"110","lclsSystm1":"VE","lclsSystm2":"VE07","lclsSystm3":"VE070600"},{"addr1":"서울특별시 종로구 이화동","addr2":"","areacode":"1","cat1":"A02","cat2":"A0206","cat3":"A02060600","contentid":"3013252","contenttypeid":"14","createdtime":"20230920144035","firstimage":"http://tong.visitkorea.or.kr/cms/resource/66/3012966_image2_1.jpg","firstimage2":"http://tong.visitkorea.or.kr/cms/resource/66/3012966_image3_1.jpg","cpyrhtDivCd":"Type3","mapx":"127.0039461920","mapy":"37.5766979666","mlevel":"6","modifiedtime":"20241015145536","sigungucode":"23","tel":"","title":"JTN아트홀","zipcode":"03100","lDongRegnCd":"11","lDongSignguCd":"110","lclsSystm1":"VE","lclsSystm2":"VE06","lclsSystm3":"VE060100"},{"addr1":"서울특별시 종로구 북촌로11다길 22-3 (삼청동)","addr2":"","areacode":"1","cat1":"A02","cat2":"A0205","cat3":"A02050600","contentid":"3056278","contenttypeid":"12","createdtime":"20231204104534","firstimage":"http://tong.visitkorea.or.kr/cms/resource/39/3056239_image2_1.jpg","firstimage2":"http://tong.visitkorea.or.kr/cms/resource/39/3056239_image3_1.jpg","cpyrhtDivCd":"Type3","mapx":"126.9828007145","mapy":"37.5831329500","mlevel":"6","modifiedtime":"20250718090000","sigungucode":"23","tel":"","title":"북촌전망대","zipcode":"03052","lDongRegnCd":"11","lDongSignguCd":"110","lclsSystm1":"VE","lclsSystm2":"VE01","lclsSystm3":"VE010200"}],"length":438,"server data":{"success":{"count":0,"inputTourcontentid":[]},"alreadyExists":{"count":5,"alreadyExistscontentid":["2554142","126487","3056315","3013252","3056278"]},"fail":{"count":0,"error":[]}}}});

        const recommendData = res.result.data;
        console.log(recommendData);
        recommendData.forEach((e) => {
            const tourList = document.getElementById('tourList').cloneNode(true);
            tourList.getElementById('title').innerText = recommendData.title;
            tourList.getElementById('addr').innerText = recommendData.addr1;
            tourList.getElementById('tour-img').src = recommendData.firstimage;
            console.log(tourList);
            
        });
        
    default:de
        break;
}