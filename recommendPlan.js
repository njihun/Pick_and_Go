import { getFilterList } from "./parser.js";
const url = 'https://d0g0h1.world';
const jwt = sessionStorage.getItem('jwt');
const data = JSON.parse(sessionStorage.getItem('plan')).result;
async function getInterTour() {
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

const container = document.getElementById('container');
function recount() {
    document.querySelector('.count').innerText = `${data.schedule.length-1}박 ${data.schedule.length}일`;
}

document.querySelector('.sub-header .menu-bar>.menu-item .list > :last-child > div:nth-of-type(1)').addEventListener('click', () => {
    document.querySelector('.sub-header .menu-bar>.menu-item .list').style.display = '';
});
document.querySelector('.sub-header .menu-bar>.menu-item .list > :last-child > div:nth-of-type(2)').addEventListener('click', () => {
    const select = Array.from(list.children[1].children).filter((e) => e.style.backgroundColor);
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
            if (menuBar.children.length == 1) {
                Array.from(document.querySelectorAll('.tour')).forEach((e) => {
                    e.style.display = '';
                });
            } else {
                Array.from(document.querySelectorAll('.tour')).filter((e2) => e2.querySelector('.Nm').innerText == div.innerText).forEach((e2) => {
                    e2.style.display = 'none';
                });
            }
            recount();
        });
        div.append(span, close);
        menuBar.appendChild(div);
    });
    document.querySelector('.sub-header .menu-bar>.menu-item .list').style.display = '';

    Array.from(document.querySelectorAll('.tour')).forEach((e) => {
        if (select.map((e2) => e2.innerText).some((e2) => e2 == e.querySelector('.Nm').innerText)) {
            e.style.display = '';
        } else {
            e.style.display = 'none';
        }
        if (select.length == 0) {
            Array.from(document.querySelectorAll('.tour')).forEach((e) => {
                e.style.display = '';
            });
        }
    });
    recount();
});

if (!jwt) {
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

    try {
        const tourList = await getTour((await getInterTour()).map((e)=>e["tour_id"]));
        console.log(tourList);
        const filterList = await getFilterList();
        console.log(filterList);
        
        container.innerHTML = '';
        function loadCard(tourList) {
            tourList.forEach((e, i) => {
                console.log(e);
                
                const div = document.createElement('div');
                div.classList.add('tour');
                div.style.position = "relative";
                const img = document.createElement('div');
                img.classList.add('tour-img');
                const imgElement = document.createElement('img');
                imgElement.src = e[0].firstimage;
                img.appendChild(imgElement);
                const data = document.createElement('div');

                const div2 = document.createElement('div');
                const tourName = document.createElement('div');
                tourName.innerText = e[0].title;
                tourName.style.cursor = 'pointer';
                tourName.style.fontSize = '20px';
                tourName.addEventListener('click', () => {
                    const url = new URL(location.href);
                    url.searchParams.set('type', 'tour-data');
                    url.searchParams.set('id', e[0].contentid);
                    location.href = url.href;
                });
                const removeInterTour = document.createElement('div');
                removeInterTour.innerText = '삭제하기';
                removeInterTour.style.cursor = 'pointer';
                removeInterTour.style.color = 'red';
                removeInterTour.style.whiteSpace = "nowrap";
                removeInterTour.addEventListener('click', async () => {
                    const req = {
                        "method": "POST",
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer "+jwt
                        },
                        "body": JSON.stringify({
                            "attribute": "DELETE",
                            "contendidList": [
                                e[0].contentid
                            ]
                        })
                    }
                    let res = await fetch(url+'/tour/setInterTour', req);
                    res = await res.json();
                    console.log(res.message);
                    container.removeChild(div);
                    recount();
                    
                    // 기존 목록에서 이 관광지 빠지게 해야 함.
                });
                div2.append(tourName, removeInterTour);

                const tourData = document.createElement('div');
                const p = document.createElement('p');
                p.innerText = e[0].addr1;
                const p2 = document.createElement('p');
                p2.innerText = filterList.filter((e2) => e2.Cd == e[0].lclsSystm1)[0].Nm;
                p2.classList.add('Nm');
                tourData.append(p, p2);

                data.append(div2, tourData);
                div.append(img, data);
                
                const memo = document.createElement('div');
                memo.innerText = `${e[1].match(/\d(?=(food|tour))/)[0]}일차 ${e[1].indexOf('food')!=-1 ? "음식" : "관광지"}`;
                memo.style.position = 'absolute';
                memo.style.bottom = '0';
                memo.style.right = '0';
                memo.style.padding = '5px';
                memo.style.paddingLeft = "30px";
                memo.style.paddingRight = "30px";
                memo.style.borderRadius = "10px";
                memo.style.backgroundColor = "#"+(e[1].indexOf('food')!=-1 ? "FAE7E7" : "D0F0DA");
                div.appendChild(memo);

                container.appendChild(div);
                // 관광지 이름 라인에 삭제하기 버튼 포함해서 2개
                
            });
            recount();
        }
        data.schedule.forEach((e, i) => {
            const subContainer = document.createElement('div');
            subContainer.style.display = 'flex';
            subContainer.style.alignItems = "center";
            subContainer.style.justifyContent = "center";
            subContainer.style.margin = "18px";
            const leftLine = document.createElement('div');
            leftLine.style.flexGrow = '1';
            leftLine.style.height = '1px';
            leftLine.style.backgroundColor = "#000";
            const rightLine = document.createElement('div');
            rightLine.style.flexGrow = '1';
            rightLine.style.height = '1px';
            rightLine.style.backgroundColor = "#000";

            const dateCount = document.createElement("div");
            dateCount.innerText = (i+1) + "일차";
            dateCount.style.margin = "0px 20px";
            subContainer.append(leftLine, dateCount, rightLine);
            container.appendChild(subContainer);
            let queue = [];
            for (let i2 = 0; i2 < Math.max(e.food.length, e.tour_list.length); i2++) {
                if (e.tour_list.length > i2) queue.push([e.tour_list[i2], (i + 1) + 'tour']);
                if (e.food.length > i2) queue.push([e.food[i2], (i + 1) + 'food']);
            }
            console.log(queue);
            
            
            loadCard(queue);
        })

        document.getElementById('criteria').addEventListener('change', () => {
            const criteria = document.getElementById('criteria').value;
            console.log(criteria);
            
            if (criteria == 'oldest') {
                document.querySelector('#container').style.flexDirection = 'column-reverse';
            } else {
                document.querySelector('#container').style.flexDirection = '';
            }
            
        })
    } catch(err) {
        console.log(err);
        
    };
}