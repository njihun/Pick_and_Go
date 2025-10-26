const url = 'https://d0g0h1.world';
const req = {
    "method": "GET",
    "headers": {
        "Content-Type": "application/json",
    }
}
const res = await fetch(url+"/recommend/getRandomTour", req);
const data = await res.json();
// const data = {
//     "result": {
//         "counts" : 3,
//         "data": [
//             {
//                 "addr1": "부산광역시 기장군 기장해안로 147",
//                 "addr2": "2층",
//                 "areacode": "6",
//                 "cat1": "A04",
//                 "cat2": "A0401",
//                 "cat3": "A04011000",
//                 "contentid": "2902668",
//                 "contenttypeid": "38",
//                 "createdtime": "20221031074026",
//                 "firstimage": "http://tong.visitkorea.or.kr/cms/resource/33/2885033_image2_1.jpg",
//                 "firstimage2": "http://tong.visitkorea.or.kr/cms/resource/33/2885033_image3_1.jpg",
//                 "cpyrhtDivCd": "Type3",
//                 "mapx": "129.2128079785",
//                 "mapy": "35.1922521684",
//                 "mlevel": "6",
//                 "modifiedtime": "20240423230642",
//                 "sigungucode": "3",
//                 "tel": "",
//                 "title": "버커루 롯데동부산",
//                 "zipcode": "46084",
//                 "lDongRegnCd": "26",
//                 "lDongSignguCd": "710",
//                 "lclsSystm1": "SH",
//                 "lclsSystm2": "SH04",
//                 "lclsSystm3": "SH040300"
//             },
//             {
//                 "addr1": "부산광역시 기장군 기장해안로 147",
//                 "addr2": "1층",
//                 "areacode": "6",
//                 "cat1": "A04",
//                 "cat2": "A0401",
//                 "cat3": "A04011000",
//                 "contentid": "2910281",
//                 "contenttypeid": "38",
//                 "createdtime": "20221031063606",
//                 "firstimage": "http://tong.visitkorea.or.kr/cms/resource/29/2884829_image2_1.jpg",
//                 "firstimage2": "http://tong.visitkorea.or.kr/cms/resource/29/2884829_image3_1.jpg",
//                 "cpyrhtDivCd": "Type3",
//                 "mapx": "129.2128079785",
//                 "mapy": "35.1922521684",
//                 "mlevel": "6",
//                 "modifiedtime": "20240423230636",
//                 "sigungucode": "3",
//                 "tel": "",
//                 "title": "탠디 롯데동부산",
//                 "zipcode": "46084",
//                 "lDongRegnCd": "26",
//                 "lDongSignguCd": "710",
//                 "lclsSystm1": "SH",
//                 "lclsSystm2": "SH04",
//                 "lclsSystm3": "SH040300"
//             },
//             {
//                 "addr1": "부산광역시 기장군 기장해안로 147",
//                 "addr2": "",
//                 "areacode": "6",
//                 "cat1": "A04",
//                 "cat2": "A0401",
//                 "cat3": "A04011000",
//                 "contentid": "2928644",
//                 "contenttypeid": "38",
//                 "createdtime": "20221031072623",
//                 "firstimage": "http://tong.visitkorea.or.kr/cms/resource/11/2884911_image2_1.jpg",
//                 "firstimage2": "http://tong.visitkorea.or.kr/cms/resource/11/2884911_image3_1.jpg",
//                 "cpyrhtDivCd": "Type3",
//                 "mapx": "129.2128079785",
//                 "mapy": "35.1922521684",
//                 "mlevel": "6",
//                 "modifiedtime": "20240423230630",
//                 "sigungucode": "3",
//                 "tel": "",
//                 "title": "잇미샤 롯데동부산",
//                 "zipcode": "46084",
//                 "lDongRegnCd": "26",
//                 "lDongSignguCd": "710",
//                 "lclsSystm1": "SH",
//                 "lclsSystm2": "SH04",
//                 "lclsSystm3": "SH040300"
//             },
//         ],
//         "images": [
//             "http://tong.visitkorea.or.kr/cms/resource/33/2885033_image2_1.jpg",
//             "http://tong.visitkorea.or.kr/cms/resource/29/2884829_image2_1.jpg",
//             "http://tong.visitkorea.or.kr/cms/resource/11/2884911_image2_1.jpg"
//         ]
//     }
// };
let seq = 0;
let randomTourData = data.result;
randomTourData.counts = Number(randomTourData.counts);

document.getElementById('tour-img').src = randomTourData.images[seq];
document.querySelector('#tour-data > div > div:nth-of-type(1)').innerText = seq+1+'/' + randomTourData.counts;

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
        if (seq==randomTourData.counts - 1) {
            // 추천
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
                
                const url2 = new URL(location.href);
                url2.searchParams.set('type', 'recommend-data');
                location.href = url2.href;
                
                seq++;
                return;
            }
        }
        if (seq >= randomTourData.counts) return;
        document.querySelector('#tour-data > div > div:nth-of-type(1)').innerText = ++seq+1+'/' + randomTourData.counts;
        document.getElementById('tour-img').src = randomTourData.images[seq];
    })
});
