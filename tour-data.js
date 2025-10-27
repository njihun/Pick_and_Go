const url = 'https://d0g0h1.world';

// 쿼리 파라미터 바탕으로 분류하여 화면에 나타낼 것.
const tourLocation = JSON.parse(localStorage.getItem('tourLocation'));
let data;

let query = new URL(location.href).searchParams;
let tourType = query.get('type');

async function star(e) {
    let work;
    
    const jwt = sessionStorage.getItem('jwt');
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
        if (tourType = "tour-data") {
            if (document.getElementById('addTourList').classList.contains('open')) {
                document.getElementById('addTourList').classList.remove('open');
                document.getElementById('addTourList').children[0].textContent = "관심 관광지에 추가";
                work = "DELETE";
            } else {
                document.getElementById('addTourList').classList.add('open');
                document.getElementById('addTourList').children[0].textContent = "관심 관광지에서 제거";
                work = "ADD";
            }
            
        } else {
            if (e.querySelector('.star').classList.contains('open')) {
                e.querySelector('.star').classList.remove('open');
                work = "DELETE";
            } else {
                e.querySelector('.star').classList.add('open');
                document.getElementById('addTourList').classList.add('open');
                work = "ADD";
            }
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
                    e.dataset.id
                ]
            })
        }
        let res = await fetch(url+'/tour/setInterTour', req);
        res = await res.json();
        console.log(res.message);
    }
}
window.star = star;

async function setVisitedTour(e) {
    if (e.getElementById('addTourList').classList.contains('open')) {
        document.getElementById('addTourList').classList.remove('open');
        work = "DELETE";
    } else {
        document.getElementById('addTourList').classList.add('open');
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
                e.dataset.id
            ]
        })
    }
    let res = await fetch(url+'/tour/setInterTour', req);
    res = await res.json();
    console.log(res);
    
}
window.setVisitedTour = setVisitedTour;

function travelReommend() {
    const tourList = Array.from(document.querySelectorAll('.tourList'));

    const container = document.getElementById('container');
    container.innerHTML = '';
    const otherContainer = document.createElement('div');
    otherContainer.id = 'otherTourList';
    otherContainer.classList.add('schedule');

    tourList.forEach((e, i) => {
        const tourList = document.createElement('div');
        tourList.dataset.id = e.dataset.id;
        tourList.style.position = 'relative';
        tourList.classList.add('tourList');
        
        const checkbox = document.createElement('div');
        checkbox.classList.add("checkbox");
        const input = document.createElement('input');
        input.type = "checkbox";
        input.addEventListener('change', (e) => {
            if (input.checked) {
                tourList.classList.add("checked");
            } else {
                tourList.classList.remove("checked");
            }
        });
        checkbox.appendChild(input);

        const rank = document.createElement('div');
        rank.classList.add('rank');
        rank.innerText = i+1+".";

        const div = document.createElement('div');
        div.classList.add('tour-img');

        const img = document.createElement('img');
        img.src = e.querySelector('img').src;
        div.appendChild(img);

        const data = document.createElement('div');
        data.classList.add('tour-data');

        const title = document.createElement('div');
        title.classList.add('title');
        title.innerText = e.querySelector('.title').innerText;
        const addr = document.createElement('div');
        addr.classList.add('addr');
        addr.innerText = e.querySelector('.addr').innerText;

        data.append(title, addr);

        const star = document.createElement('div');
        star.classList.add('star');
        star.onclick = () => window.star(tourList);
        
        tourList.append(checkbox, rank, div, data, star);
        tourList.addEventListener('click', (e) => {
            if (e.target.tagName == 'INPUT') return;
            input.click();
        });
        
        otherContainer.appendChild(tourList);
    });
    
    const div = document.createElement('div');
    div.classList.add('stationery');
    div.innerText = "여행에서 꼭 가고 싶은 관광지를 선택해 주세요!";

    const div2 = document.createElement('div');
    div2.id = 'submit';
    const btn = document.createElement('button');
    btn.innerText = "확인";
    btn.addEventListener('click', async () => {
        const selectedTourList = Array.from(document.querySelectorAll('.tourList.checked'));
        const body = {};
        body["location"] = tourLocation;
        body["numofPeople"] = localStorage.getItem("numofPeople");
        body["selectedTourID"] = selectedTourList.map((e) => e.dataset.id);
        const req = {
            "method": "POST",
            "headers": {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+sessionStorage.getItem('jwt')
            },
            "body": JSON.stringify(body)
        }
        let res = await fetch(url+'/recommend/getRecommendPlan', req);
        res = await res.json();
        console.log(res);
    });
    div2.appendChild(btn);

    container.append(div, otherContainer, div2);

    
}
window.travelReommend = travelReommend;

function loadGraph(e) {
    Array.from(e.parentElement.children).forEach((e2) => {
        e2.classList.remove('select');
    });
    e.classList.add('select');
    document.querySelector('#container .container').innerHTML = '';
    switch (e.dataset.classname) {
        case "key-info":
            document.querySelector('#container .container').classList.remove("statistics");
            document.querySelector('#container .container').classList.add("key-info");
            
            // 데이터 객체
            const info = data.detail;


            // 🔹 카드 컨테이너 생성
            const card = document.createElement("div");
            card.className = "event-card";

            // 🔹 기본 정보 섹션
            const header = document.createElement("div");
            header.className = "event-header";

            const title = document.createElement("h2");
            title.textContent = data.tourInfo[0].title;

            const contact = document.createElement("div");
            contact.innerHTML = `
            📞 ${info?.tel} &nbsp;&nbsp; 🌐 <a href="https://${info?.homepage}" target="_blank">${info?.homepage}</a>
            `;

            header.appendChild(title);
            // header.appendChild(contact);

            // 🔹 소개 및 내용 섹션
            const body = document.createElement("div");
            body.className = "event-body";

            // 개별 섹션 생성 함수
            function createSection(label, content) {
            const section = document.createElement("div");
            section.className = "event-section";

            const heading = document.createElement("h3");
            heading.textContent = label;

            const text = document.createElement("p");
            text.innerHTML = content?.replace(/(?<!^)(?=\d\\\.)/g, '<br><br>')?.replace(/(\d)\\\./g, "$1.")?.replace(/\\-/g, '<br>-');

            section.appendChild(heading);
            section.appendChild(text);
            return section;
            }

            // 섹션 추가

            Object.keys(info).forEach((e2) => {
                if (e2=='homepage') {
                    body.appendChild(createSection(e2, `<a href="${info[e2].replace(/^(?!http)/, "https://")}" target="_blank">${info[e2]}</a>`));
                } else {
                    body.appendChild(createSection(e2, info[e2]));
                }
            })

            // 🔹 카드 결합
            card.appendChild(header);
            card.appendChild(body);

            // 🔹 문서에 추가
            document.querySelector('#container .container').appendChild(card);

            // 🔹 간단한 스타일 추가
            const style = document.createElement("style");
            style.textContent = `
            .event-card {
            max-width: 700px;
            margin: 16px auto;
            padding: 24px;
            border-radius: 16px;
            background: #f9f9ff;
            box-shadow: 0 4px 16px rgba(0,0,0,0.1);
            font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
            line-height: 1.6;
            }

            .event-header {
            border-bottom: 2px solid #6d81ff;
            padding-bottom: 12px;
            margin-bottom: 16px;
            }

            .event-header h2 {
            margin: 0;
            color: #333;
            }

            .event-header a {
            color: #6d81ff;
            text-decoration: none;
            }

            .event-header a:hover {
            text-decoration: underline;
            }

            .event-body .event-section {
            margin-bottom: 20px;
            }

            .event-body h3 {
            color: #6d81ff;
            margin-bottom: 6px;
            }

            .event-body p {
            background: #fff;
            border-radius: 8px;
            padding: 12px 16px;
            white-space: pre-wrap;
            }
            `;
            document.head.appendChild(style);

            
            break;
        case "statistics":
            // 최상위 컨테이너
            const container2 = document.createElement("div");

            // 첫 번째 블록 (방문객 수 정보)
            const statsBlock = document.createElement("div");
            const stats = [
                "이번 달 방문객 수: 12",
                "전체 방문객 수: 32",
                "즐겨찾기 추가된 횟수: 12"
            ];

            stats.forEach(text => {
                const div = document.createElement("div");
                div.textContent = text;
                statsBlock.appendChild(div);
            });

            // 두 번째 블록 (연령대 및 비율)
            const ageBlock = document.createElement("div");
            const ages = [
                { label: "20대", female: "36%" },
                { label: "30대", female: "47%" },
                { label: "40대", female: "0%" }
            ];

            ages.forEach(({ label, female }) => {
                const ageRow = document.createElement("div");

                const labelDiv = document.createElement("div");
                labelDiv.textContent = label;

                const barContainer = document.createElement("div");
                const bar = document.createElement("div");
                bar.style.setProperty("--female", female);
                bar.textContent = female;
                barContainer.appendChild(bar);

                ageRow.appendChild(labelDiv);
                ageRow.appendChild(barContainer);

                ageBlock.appendChild(ageRow);
            });

            // 상위 div에 두 블록을 추가
            container2.appendChild(statsBlock);
            container2.appendChild(ageBlock);
            

            // 원하는 위치에 추가 (예: body)
            document.querySelector('#container .container').appendChild(container2);



            document.querySelector('#container .container').classList.remove("key-info");
            document.querySelector('#container .container').classList.add("statistics");
            const statistics = document.querySelectorAll("#container .container.statistics > div:nth-of-type(1) > div");
            const thisMonth = new Date().getFullYear() + '-' + (new Date().getMonth() + 1);
            const thisMonthCount = data.statistics.visitedResult.some((e2) => e2.period == thisMonth) ? data.statistics.visitedResult.filter((e2) => e2.period == thisMonth)[0].visit_count : 0;
            statistics[0].children[0].innerText = '이번 달 방문객 수: ' + thisMonthCount;
            let everyMonthCount = 0;
            data.statistics.visitedResult.forEach((e2) => everyMonthCount += e2.visit_count);
            statistics[0].children[1].innerText = '전체 방문객 수: ' + everyMonthCount;
            const interCount = data.statistics.interResult[0].inter_count;
            statistics[0].children[2].innerText = '즐겨찾기 추가된 횟수: ' + interCount;
            
            let userStatisticResult = [];
            userStatisticResult.push(data.statistics.userStatisticResult.filter((e2) => e2.age_group == "20-29"));
            userStatisticResult.push(data.statistics.userStatisticResult.filter((e2) => e2.age_group == "30-39"));
            userStatisticResult.push(data.statistics.userStatisticResult.filter((e2) => e2.age_group == "40-49"));
            userStatisticResult.forEach((e2, i) => {
                const male = e2.filter((e3) => e3.user_sex == "male").length==0 ? 0 : Number(e2.filter((e3) => e3.user_sex == "male")[0].visit_count);
                const female = e2.filter((e3) => e3.user_sex == "female").length==0 ? 0 : Number(e2.filter((e3) => e3.user_sex == "female")[0].visit_count);
                const maleProportion = Math.round(male / (male + female) * 100) || 0;
                const femaleProportion = Math.round(female / (male + female) * 100) || 0;
                
                statistics[1].children[i].querySelector("div > div:nth-of-type(2)").style.setProperty("--male", "'" + maleProportion + "%'");
                statistics[1].children[i].querySelector("div > div:nth-of-type(2)").children[0].innerText = femaleProportion + '%';
                statistics[1].children[i].querySelector("div > div:nth-of-type(2)").children[0].style.setProperty("--female", femaleProportion + '%');
                
                statistics[1].children[i].querySelector("div > div:nth-of-type(2)").addEventListener('mousemove', (e) => {
                    const over = statistics[1].children[i].querySelector("div > div:nth-of-type(2)").children[0].contains(e.target);
                    // console.log('자식 포함?', over);
                    if (over) {
                        statistics[1].children[i].querySelector("div > div:nth-of-type(2)").children[0].innerText = femaleProportion + '%(' + female + '명)';
                        statistics[1].children[i].querySelector("div > div:nth-of-type(2)").style.setProperty("--male", "'" + maleProportion + "%'");
                    } else {
                        statistics[1].children[i].querySelector("div > div:nth-of-type(2)").style.setProperty("--male", "'" + maleProportion + "%(" + male + "명)'");
                        statistics[1].children[i].querySelector("div > div:nth-of-type(2)").children[0].innerText = femaleProportion + '%';
                    }

                    statistics[1].children[i].querySelector("div > div:nth-of-type(2)").addEventListener('mouseleave', () => {
                        statistics[1].children[i].querySelector("div > div:nth-of-type(2)").style.setProperty("--male", "'" + maleProportion + "%'");
                        statistics[1].children[i].querySelector("div > div:nth-of-type(2)").children[0].innerText = femaleProportion + '%';
                    });
                });
            });
            break;
        default:
            break;
    }
    
}
window.loadGraph = loadGraph;


function close() {
    document.querySelectorAll('#modal > *').forEach((e) => {
        e.style.display = '';
    });
    overlay.style.display = '';
    document.body.style.overflow = '';
}

overlay.addEventListener('click', () => {
    if (document.getElementById('user-data').style.display) return;
    if (document.getElementById('notice').style.display) return;
    close();
});


document.getElementById('log').onclick = () => {
    document.body.style.overflow = 'hidden';
    const login = document.getElementById('login');
    overlay.style.display = 'block';
    login.style.display = 'block';
};

async function getTourDetail(tourId) {
    let res = await fetch(url+'/tour/getTourDetail?contentId='+tourId);
    res = await res.json();
    // const res = {"message":"관광지 상세정보 조회 성공","data":{"tourInfo":[{"contentid":"141375","contenttypeid":"15","addr1":"울산광역시 울주군 서생면 간절곶해안길 189","title":"울주 간절곶 해맞이 축제","mapx":129.3598710555,"mapy":35.3610443336,"firstimage":"http://tong.visitkorea.or.kr/cms/resource/87/3057487_image2_1.JPG","firstimage2":"http://tong.visitkorea.or.kr/cms/resource/87/3057487_image3_1.JPG","lDongRegnCd":"31","lDongSignguCd":"710","lclsSystm1":"EV","lclsSystm2":"EV01","lclsSystm3":"EV010200","avg_rating":"0.00"}],"detail":{"tel":"052-980-2232","homepage":"www.ucf.or.kr","overview":"울주 간절곶은 한반도에서 2025년 1월 1일 새해 첫 일출을 가장 빨리 만날 수 있는 곳이다. 1월 1일 새해 첫 해를 가장 빨리 만날 수있는 간절곶을 방문하는 해맞이객을 위해 눈과 귀와 입이 즐거운 프로그램이 준비되어 있다. 인기가수가 출연하는 <해넘이 행사>, 2025년새해 첫 일출을 기념하며 1천500대의 드론이 연출하는 <드론라이트쇼>, <축하불꽃놀이>, <새해 떡국 나눔>이 있으며, 새해 첫 일출을만나기 위해 간절곶을 방문한다면 한반도 첫 일출과 함께 다채로운 행사를 만날 수 있다.","행사소개":"울주 간절곶은 한반도에서 2025년 1월 1일 새해 첫 일출을 가장 빨리 만날 수 있는 곳이다. 1월 1일 새해 첫 해를 가장 빨리 만날 수있는 간절곶을 방문하는 해맞이객을 위해 눈과 귀와 입이 즐거운 프로그램이 준비되어 있다. 인기가수가 출연하는 <해넘이 행사>, 2025년새해 첫 일출을 기념하며 1천500대의 드론이 연출하는 <드론라이트쇼>, <축하불꽃놀이>, <새해 떡국 나눔>이 있으며, 새해 첫 일출을만나기 위해 간절곶을 방문한다면 한반도 첫 일출과 함께 다채로운 행사를 만날 수 있다.","행사내용":"1\\. 공연 프로그램  \\- 해넘이 기념 음악 콘서트  \\- 1천500대 드론라이트쇼, 축하불꽃놀이    2\\. 행사 프로그램  \\- 새해 떡국 나눔    3\\. 전시 프로그램  \\- 야간경관전시  \\- 울주공공미술 프로젝트 <간절곶:비밀의 정원>    4\\. 홍보 프로그램  \\- 커피맛지도 <커피와 함께 즐기는 간절곶>  \\- 실시간 교통안내"},"statistics":{"visitedResult":[{"period":"2025-08","visit_count":10},{"period":"2025-07","visit_count":2},{"period":"2024-07","visit_count":2},{"period":"2025-01","visit_count":1},{"period":"2024-12","visit_count":1},{"period":"2025-02","visit_count":1},{"period":"2024-03","visit_count":3},{"period":"2024-11","visit_count":1},{"period":"total","visit_count":21}],"interResult":[{"inter_count":1}],"userStatisticResult":[{"age_group":"20-29","user_sex":"male","visit_count":8},{"age_group":"20-29","user_sex":"female","visit_count":5},{"age_group":"30-39","user_sex":"male","visit_count":4},{"age_group":"30-39","user_sex":"female","visit_count":1},{"age_group":"40-49","user_sex":"male","visit_count":3}]}}};
    return res.data;
}

switch (tourType) {
    case 'tour-data':
        document.querySelector('.star').style.display = 'none';
        let tourId = query.get('id');
        data = (await getTourDetail(tourId));
        // 주요 정보 로드
        document.querySelector("#container > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)").click();
        console.log(data);
        
        document.querySelector('.tourList').dataset.id = tourId;
        document.querySelector('.title').innerText = data.tourInfo[0].title;
        document.querySelector('.addr').innerText = data.tourInfo[0].addr1;
        document.querySelector('.tour-img').src = data.tourInfo[0].firstimage;

        document.querySelector("#container > div.tourList > div:nth-child(1) > div > b").textContent = "유저 평균 평점(" +data.tourInfo[0]?.avg_rating + ")";
        document.querySelector('.rating').style.setProperty("--rating", data.tourInfo[0]?.avg_rating);
        
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
            try {
                let res = await fetch(url+'/tour/getInterTour', {
                    "method": "GET",
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization":"Bearer "+jwt
                    }
                });
                res = await res.json();
                return res.tours;
            } catch (err) {
                console.log(err);
                return [
                    {
                        "tour_id": "141375",
                        "title": "울주 간절곶 해맞이 축제",
                        "address": "울산광역시 울주군 서생면 간절곶해안길 189",
                        "tourtype": "EV",
                        "tourimage": "http://tong.visitkorea.or.kr/cms/resource/87/3057487_image2_1.JPG"
                    }
                ];
            }
        }


const req2 = {
    "method": "GET",
    "headers": {
        "Content-Type":"application/json",
    }
}

let reviews = await fetch(`${url}/review/get?requestType=tour&tour_id=${tourId}`, req2);
reviews = await reviews.json();
console.log(reviews);

// 전체 컨테이너
const container = document.createElement("div");
// container.style.width = "600px";
// container.style.padding = "20px";
container.style.margin = "20px 20px auto";
container.style.fontFamily = "sans-serif";

// 제목
const title2 = document.createElement("h3");
title2.textContent = data.tourInfo[0].title + " 후기";
title2.style.marginBottom = "16px";
container.appendChild(title2);

// 후기 카드 생성 함수
function createReviewCard(review) {
  const card = document.createElement("div");
  card.style.display = "flex";
  card.style.border = "1px solid #ddd";
  card.style.borderRadius = "10px";
  card.style.padding = "14px";
  card.style.marginBottom = "10px";
  card.style.background = "#f9f9f9";
  card.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";

  // 상단 영역 (별점 + 프로필)
  const top = document.createElement("div");
  top.style.display = "flex";
  top.style.flexDirection = "column";
  top.style.alignItems = "start";
  top.style.justifyContent = "start";
  top.style.marginBottom = "8px";

  // 별점
  const stars = document.createElement("div");
  const full = "★".repeat(review.rating);
  const empty = "☆".repeat(5 - review.rating);
  stars.textContent = full + empty;
  stars.style.color = "#f26b38";
  stars.style.fontSize = "18px";
  stars.style.letterSpacing = "2px";
  stars.style.marginLeft = "5px";
  top.appendChild(stars);

  // 프로필 원
  const profile = document.createElement("div");
  profile.textContent = review.user_name[0];
  profile.style.width = "36px";
  profile.style.height = "36px";
  profile.style.borderRadius = "50%";
  profile.style.background = "#4a90e2";
  profile.style.color = "#fff";
  profile.style.display = "flex";
  profile.style.alignItems = "center";
  profile.style.justifyContent = "center";
  profile.style.fontWeight = "bold";
  profile.style.fontSize = "14px";
  profile.title = review.user_name;
  profile.style.marginRight = "8px";

  const userContainer = document.createElement('div');
  userContainer.style.display = "flex";
  userContainer.style.whiteSpace = "nowrap";
  userContainer.style.padding = "10px 5px";
  // 사용자 이름
  const user = document.createElement("div");
  user.innerHTML = `${review.user_name} 님<br>@${review.user_id}`;
  user.style.fontSize = "13px";
  user.style.color = "#444";
  user.style.marginBottom = "6px";
  userContainer.append(profile, user);
  top.appendChild(userContainer);
  card.appendChild(top);

  // 후기 내용
  const text = document.createElement("p");
  text.textContent = review.content;
  text.style.fontSize = "14px";
  text.style.lineHeight = "1.5";
  text.style.marginBottom = "10px";
  text.style.whiteSpace = "pre-line";
  text.style.flexGrow = 1;
  card.appendChild(text);

  // 좋아요/댓글
  const bottom = document.createElement("div");
  bottom.style.display = "flex";
  bottom.style.alignItems = "end";
  bottom.style.gap = "14px";
  bottom.style.color = "#666";
  bottom.style.fontSize = "13px";

  async function getLikes() {
      if (sessionStorage.getItem('jwt')) {
          const req = {
              "method": "GET",
              "headers": {
                  "Content-Type":"application/json",
              }
          }
          let res = await fetch(`${url}/likes/get?review_id=${review.review_id}`, req);
          res = await res.json();
          console.log(res);
          return res[0];
      }
  }
    

  const thumbsUp = document.createElement("div");
  thumbsUp.style.display = "flex";
  thumbsUp.style.alignItems = "center";
  const img = document.createElement('div');
  img.style.width = "15px";
  img.style.height = "15px";
  img.style.backgroundImage = "url(./imgs/Thumbs_up.png)";
  img.style.backgroundSize = "15px 15px";
  const count = document.createElement("span");
  count.innerText = review.likes;
  count.style.textAlign = "center";
  count.style.marginLeft = "5px";
  count.style.color = "#FF4343 ";
  thumbsUp.append(img, count);
  thumbsUp.addEventListener("click", async () => {
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
            return;
        }
        const req = {
            "method": "POST",
            "headers":{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+sessionStorage.getItem('jwt')
            },
            "body": JSON.stringify({
                "review_id" : review.review_id
            })
        }

        let res = await fetch(`${url}/likes/like`, req);
        res = await res.json();
        console.log(res);
        count.innerText = (await getLikes()).likes;
  });
  
  const thumbsDown = document.createElement("div");
  thumbsDown.style.display = "flex";
  thumbsDown.style.alignItems = "center";
  const img2 = document.createElement('div');
  img2.style.width = "15px";
  img2.style.height = "15px";
  img2.style.backgroundImage = "url(./imgs/Thumbs_down.png)";
  img2.style.backgroundSize = "15px 15px";
  const count2 = document.createElement("span");
  count2.innerText = review.dislikes;
  count2.style.textAlign = "center";
  count2.style.marginLeft = "5px";
  count2.style.color = "#4385FF";
  thumbsDown.append(img2, count2);
    thumbsDown.addEventListener("click", async () => {
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
            return;
        }
        const req = {
            "method": "POST",
            "headers":{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+sessionStorage.getItem('jwt')
            },
            "body": JSON.stringify({
                "review_id" : review.review_id
            })
        }

        let res = await fetch(`${url}/likes/dislike`, req);
        res = await res.json();
        console.log(res);
        count2.innerText = (await getLikes()).dislikes;
  });
  

  bottom.appendChild(thumbsUp);
  bottom.appendChild(thumbsDown);
  card.appendChild(bottom);
  card.classList.add("review");
  return card;
}

// 후기들 추가
reviews.forEach(r => container.appendChild(createReviewCard(r)));

// body에 삽입
document.querySelector('#container').appendChild(container);



        











// 후기 입력창 컨테이너
const reviewInputBox = document.createElement("div");
reviewInputBox.style.display = "flex";
reviewInputBox.style.alignItems = "center";
reviewInputBox.style.gap = "12px";
reviewInputBox.style.padding = "12px";
reviewInputBox.style.borderRadius = "10px";
reviewInputBox.style.background = "#f9f9f9";
reviewInputBox.style.border = "1px solid rgb(221, 221, 221)";
reviewInputBox.style.margin = "40px 20px auto";
reviewInputBox.style.marginBottom = "10px";
reviewInputBox.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";

// =====================
// 왼쪽 프로필/별점 영역
// =====================
const leftArea = document.createElement("div");
leftArea.style.display = "flex";
leftArea.style.flexDirection = "column";
leftArea.style.alignItems = "center";
leftArea.style.gap = "8px";
leftArea.style.width = "100px";

// 별점 표시 (5점 만점)
const stars = document.createElement("div");
stars.style.color = "#f26b38";
stars.style.fontSize = "18px";
stars.style.cursor = "pointer";
let rating = 0;

// 별 5개 생성
for (let i = 1; i <= 5; i++) {
  const star = document.createElement("span");
  star.textContent = "☆";
  star.dataset.value = i;
  star.addEventListener("click", () => {
    rating = i;
    [...stars.children].forEach((s, idx) => {
      s.textContent = idx < i ? "★" : "☆";
    });
  });
  stars.appendChild(star);
}
leftArea.appendChild(stars);

// 프로필 영역
const profileWrap = document.createElement("div");
profileWrap.style.display = "flex";
profileWrap.style.alignItems = "center";
profileWrap.style.gap = "4px";

// 프로필 이미지
const profileImg = document.createElement("div");
profileImg.style.width = "36px";
profileImg.style.height = "36px";
profileImg.style.borderRadius = "50%";
profileImg.style.background = "gray";
profileImg.style.display = "flex";
profileImg.style.alignItems = "center";
profileImg.style.justifyContent = "center";
profileImg.style.color = "#fff";
profileImg.textContent = "M"; // 성별 아이콘처럼 표시
profileWrap.appendChild(profileImg);

// 이름/ID
const userInfo = document.createElement("div");
userInfo.style.textAlign = "center";
userInfo.style.fontSize = "12px";
userInfo.style.color = "#333";
userInfo.style.whiteSpace = "nowrap";
userInfo.innerHTML = `${sessionStorage.getItem('name')} 님<br><span style="color:#888;">@${sessionStorage.getItem('id')}</span>`;
profileWrap.appendChild(userInfo);

leftArea.appendChild(profileWrap);
reviewInputBox.appendChild(leftArea);

// =====================
// 중앙 입력 영역
// =====================
const textArea = document.createElement("textarea");
textArea.placeholder = "후기 작성하기!";
textArea.style.flex = "1";
textArea.style.resize = "none";
textArea.style.height = "50px";
textArea.style.border = "1px solid #ddd";
textArea.style.borderRadius = "8px";
textArea.style.padding = "10px";
textArea.style.fontSize = "14px";
textArea.style.outline = "none";
textArea.style.transition = "0.2s";
textArea.addEventListener("focus", () => {
  textArea.style.borderColor = "#4a90e2";
});
textArea.addEventListener("blur", () => {
  textArea.style.borderColor = "#ddd";
});
reviewInputBox.appendChild(textArea);

// =====================
// 오른쪽 버튼 영역
// =====================
const btnContainer = document.createElement('div');
const submitBtn = document.createElement("button");
submitBtn.textContent = "작성하기";
submitBtn.style.background = "#1a57e2";
submitBtn.style.color = "#fff";
submitBtn.style.border = "none";
submitBtn.style.borderRadius = "8px";
submitBtn.style.padding = "12px 18px";
submitBtn.style.fontSize = "14px";
submitBtn.style.cursor = "pointer";
submitBtn.style.transition = "0.2s";

submitBtn.addEventListener("mouseenter", () => {
  submitBtn.style.background = "#0039a6";
});
submitBtn.addEventListener("mouseleave", () => {
  submitBtn.style.background = "#1a57e2";
});

// 작성 이벤트
submitBtn.addEventListener("click", async () => {
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
        return;
    }
    const text = textArea.value.trim();
    if (!rating) return alert("별점을 선택하세요!");
    if (!text) return alert("후기를 입력하세요!");
    console.log(`별점: ${rating}점`);
    console.log(rating, typeof rating);
    
    console.log(`후기 내용: ${text}`);
    const req = {
        "method": "POST",
        "headers": {
            "Content-Type":"application/json",
            "Authorization":"Bearer "+sessionStorage.getItem('jwt')
        },
        "body": JSON.stringify({
            "tour_id": tourId,
            "content": text,
            "rating": rating,
        })
    }
    let res = await fetch(url+'/review/write', req);
    res = await res.json();
    console.log(res);
    if (res.message == '토큰 에러') {
        alert("토큰이 만료되었습니다! 재로그인이 필요합니다.");
    } else {
        alert("후기가 등록되었습니다!");
        location.reload();
    }
    textArea.value = "";
    rating = 0;
    [...stars.children].forEach(s => (s.textContent = "☆"));
});
btnContainer.appendChild(submitBtn);
reviewInputBox.appendChild(btnContainer);

// =====================
// Body에 삽입
// =====================
document.querySelector('#container').appendChild(reviewInputBox);

const myReview = reviews.filter((e) => e.user_id == Number(sessionStorage.getItem('id')));

  if (myReview.length > 0) {
    textArea.value = myReview[0].content;
    rating = myReview[0].rating;
    [...stars.children].forEach((s, idx) => {
    s.textContent = idx < rating ? "★" : "☆";
    });
    document.querySelector("#container > div:nth-child(4) > div > button").innerText = "수정하기";

    const remove = document.createElement('div');
remove.textContent = "삭제하기";
remove.style.background = "#1a57e2";
remove.style.color = "#fff";
remove.style.border = "none";
remove.style.borderRadius = "8px";
remove.style.padding = "12px 18px";
remove.style.fontSize = "14px";
remove.style.cursor = "pointer";
remove.style.transition = "0.2s";
remove.style.marginTop = "5px";

remove.addEventListener("mouseenter", () => {
  remove.style.background = "#0039a6";
});
remove.addEventListener("mouseleave", () => {
  remove.style.background = "#1a57e2";
});
    remove.addEventListener("click", async () => {
        
        const text = textArea.value.trim();
        const req = {
            "method": "POST",
            "headers": {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+sessionStorage.getItem('jwt')
            },
            "body": JSON.stringify({
                "review_id": myReview[0].review_id
            })
        }
        let res = await fetch(url+'/review/delete', req);
        res = await res.json();
        console.log(res);
        if (res.message == '토큰 에러') {
            alert("토큰이 만료되었습니다! 재로그인이 필요합니다.");
        } else {
            alert("후기가 삭제되었습니다!");
            location.reload();
        }
    });
    document.querySelector("#container > div:nth-child(4) > div:nth-child(3)").appendChild(remove);
  }







        // 처음 로드될 때 관심 관광지인지 확인할 것
        const interTour = await getInterTour();
        
        if (interTour.some((e)=>e["tour_id"] == tourId)) {
            document.getElementById('addTourList').classList.add('open');
            document.getElementById('addTourList').children[0].textContent = "관심 관광지에서 제거";
        }
        break;
    case 'recommend-data':
        document.getElementById('addTourList').style.display = 'none';
        data = (await getTourDetail("tour-data"));
        document.querySelector("#container > div.tourList > div:nth-child(1) > div > b").textContent = "유저 평균 평점(" +data.tourInfo[0]?.avg_rating + ")";
        document.querySelector('.rating').style.setProperty("--rating", data.tourInfo[0]?.avg_rating);

        document.querySelector('#container').children[1].style.display = "none";

        const notice = document.getElementById('notice');
        notice.style.display = 'block';
        overlay.style.display = 'block';
        notice.children[1].innerText = '1분 이상 소요될 수 있습니다.';
        document.querySelector('#notice > *:last-child > div').onclick = () => {
            notice.style.display = '';
            overlay.style.display = '';
        };
        const body = {};
        body["location"] = tourLocation;
        body["numofPeople"] = localStorage.getItem("numofPeople");
        const req = {
            "method": "POST",
            "headers": {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+sessionStorage.getItem('jwt')
            },
            "body": JSON.stringify(body)
        }
        let res = await fetch(url+'/recommend/getRecommendTour', req);
        res = await res.json();
        // const res = ({"message":"추천결과","result":{"elapsed_time":43.76996159553528,"data":[{"addr1":"서울특별시 종로구 창의문로11가길 4 (부암동)","addr2":"","areacode":"1","cat1":"A02","cat2":"A0206","cat3":"A02060100","contentid":"2554142","contenttypeid":"14","createdtime":"20180718185120","firstimage":"http://tong.visitkorea.or.kr/cms/resource/81/3384781_image2_1.JPG","firstimage2":"http://tong.visitkorea.or.kr/cms/resource/81/3384781_image3_1.JPG","cpyrhtDivCd":"Type3","mapx":"126.9626772472","mapy":"37.5937674640","mlevel":"6","modifiedtime":"20250317110026","sigungucode":"23","tel":"","title":"유금와당박물관","zipcode":"03022","lDongRegnCd":"11","lDongSignguCd":"110","lclsSystm1":"VE","lclsSystm2":"VE07","lclsSystm3":"VE070100"},{"addr1":"서울특별시 종로구 대학로 104","addr2":"","areacode":"1","cat1":"A02","cat2":"A0202","cat3":"A02020700","contentid":"126487","contenttypeid":"12","createdtime":"20031106090000","firstimage":"http://tong.visitkorea.or.kr/cms/resource/35/3506735_image2_1.jpg","firstimage2":"http://tong.visitkorea.or.kr/cms/resource/35/3506735_image3_1.jpg","cpyrhtDivCd":"Type1","mapx":"127.0027239807","mapy":"37.5802419773","mlevel":"6","modifiedtime":"20250718090000","sigungucode":"23","tel":"","title":"마로니에공원","zipcode":"03087","lDongRegnCd":"11","lDongSignguCd":"110","lclsSystm1":"VE","lclsSystm2":"VE03","lclsSystm3":"VE030100"},{"addr1":"서울특별시 종로구 율곡로1길 40 (사간동)","addr2":"","areacode":"1","cat1":"A02","cat2":"A0206","cat3":"A02060500","contentid":"3056315","contenttypeid":"14","createdtime":"20231204105201","firstimage":"http://tong.visitkorea.or.kr/cms/resource/00/3056300_image2_1.jpg","firstimage2":"http://tong.visitkorea.or.kr/cms/resource/00/3056300_image3_1.jpg","cpyrhtDivCd":"Type3","mapx":"126.9807316132","mapy":"37.5776613265","mlevel":"6","modifiedtime":"20250718090000","sigungucode":"23","tel":"","title":"갤러리미르","zipcode":"03062","lDongRegnCd":"11","lDongSignguCd":"110","lclsSystm1":"VE","lclsSystm2":"VE07","lclsSystm3":"VE070600"},{"addr1":"서울특별시 종로구 이화동","addr2":"","areacode":"1","cat1":"A02","cat2":"A0206","cat3":"A02060600","contentid":"3013252","contenttypeid":"14","createdtime":"20230920144035","firstimage":"http://tong.visitkorea.or.kr/cms/resource/66/3012966_image2_1.jpg","firstimage2":"http://tong.visitkorea.or.kr/cms/resource/66/3012966_image3_1.jpg","cpyrhtDivCd":"Type3","mapx":"127.0039461920","mapy":"37.5766979666","mlevel":"6","modifiedtime":"20241015145536","sigungucode":"23","tel":"","title":"JTN아트홀","zipcode":"03100","lDongRegnCd":"11","lDongSignguCd":"110","lclsSystm1":"VE","lclsSystm2":"VE06","lclsSystm3":"VE060100"},{"addr1":"서울특별시 종로구 북촌로11다길 22-3 (삼청동)","addr2":"","areacode":"1","cat1":"A02","cat2":"A0205","cat3":"A02050600","contentid":"3056278","contenttypeid":"12","createdtime":"20231204104534","firstimage":"http://tong.visitkorea.or.kr/cms/resource/39/3056239_image2_1.jpg","firstimage2":"http://tong.visitkorea.or.kr/cms/resource/39/3056239_image3_1.jpg","cpyrhtDivCd":"Type3","mapx":"126.9828007145","mapy":"37.5831329500","mlevel":"6","modifiedtime":"20250718090000","sigungucode":"23","tel":"","title":"북촌전망대","zipcode":"03052","lDongRegnCd":"11","lDongSignguCd":"110","lclsSystm1":"VE","lclsSystm2":"VE01","lclsSystm3":"VE010200"}],"length":438,"server data":{"success":{"count":0,"inputTourcontentid":[]},"alreadyExists":{"count":5,"alreadyExistscontentid":["2554142","126487","3056315","3013252","3056278"]},"fail":{"count":0,"error":[]}}}});
        console.log(res);
        
        const recommendData = res.result.data;
        const tourList = document.querySelector('.tourList');
        tourList.dataset.id = recommendData[0].contentid;
        tourList.querySelector('.title').innerText = recommendData[0].title;
        tourList.querySelector('.addr').innerText = recommendData[0].addr1;
        tourList.querySelector('.tour-img').src = recommendData[0].firstimage;

        const otherTourList = document.createElement('div');
        otherTourList.id = 'otherTourList';

        const title = document.createElement('div');
        title.classList.add('title');
        const div = document.createElement('div');
        div.innerText = '후순위 관광지';
        title.appendChild(div);

        const otherContainer = document.createElement('div');

        recommendData.slice(1, recommendData.length).forEach((e, i) => {
            const tourList = document.createElement('div');
            tourList.dataset.id = e.contentid;
            tourList.style.position = 'relative';
            tourList.classList.add('tourList');
            
            const rank = document.createElement('div');
            rank.classList.add('rank');
            rank.innerText = i+2+"순위";

            const div = document.createElement('div');
            div.classList.add('tour-img');

            const img = document.createElement('img');
            img.src = e.firstimage;
            div.appendChild(img);

            const data = document.createElement('div');
            data.classList.add('tour-data');

            const title = document.createElement('div');
            title.classList.add('title');
            title.innerText = e.title;
            const addr = document.createElement('div');
            addr.classList.add('addr');
            addr.innerText = e.addr1;

            data.append(title, addr);

            const star = document.createElement('div');
            star.classList.add('star');
            star.onclick = () => window.star(tourList);
            
            tourList.append(rank, div, data, star);
            
            otherContainer.appendChild(tourList);
        });
        const div2 = document.createElement('div');
        div2.id = 'schedule';
        const btn = document.createElement('div');
        btn.innerHTML = '여행 계획 전체를 추천받고 싶다면? <a href="#" onclick="window.travelReommend();">클릭</a>';
        div2.appendChild(btn);
        

        otherTourList.append(title, otherContainer, div2);
        document.getElementById('container').appendChild(otherTourList);
        break;
    default:
        break;
}