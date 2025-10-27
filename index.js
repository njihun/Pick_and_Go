import { getRegion } from "./parser.js";
import { mypage, favoriteAttractions, tourData, randomTourRecommned } from "./pageLoad.js";

let type = new URL(location.href);
type = type.searchParams.get('type');
if (type) {
    tourData();
} else {
    try {
        await import('./hotplace.js');
    } catch(ignore) {}
}

const url = 'https://d0g0h1.world';
window.mypage = mypage;
window.favoriteAttractions = favoriteAttractions;
const region = await getRegion();
const regionElement = document.querySelector('#recommend > *:nth-child(2) > div:nth-of-type(1) > div:nth-of-type(1)');
const regionDropDown = document.getElementById('cities');
const overlay = document.getElementById('overlay');
const burgerBar = document.querySelector('.burger-bar');
export let tourLocation = [];

burgerBar.addEventListener('click', () => {
    const menuItems = document.querySelector('.menu-bar > :first-child:not(.menu-item)');
    const sticks = Array.from(burgerBar.children[0].children);
    if (menuItems.style.transform) {
        sticks.forEach((e) => {
            e.classList.remove('open');
        });
        menuItems.style.transition = '';
        menuItems.style.transform = '';
        sticks[1].style.height = '';
        sticks[0].style.transform = '';
        sticks[2].style.transform = '';
    } else {
        sticks.forEach((e) => {
            e.classList.add('open');
        });
        menuItems.style.transition = 'all 0.3s ease';
        menuItems.style.transform = 'translateX(0)';
        sticks[1].style.height = '0px';
        sticks[0].style.transform = 'translate(-50%, -50%) rotate(45deg)';
        sticks[2].style.transform = 'translate(-50%, -50%) rotate(-45deg)';
    }
});

document.querySelector('.social > div > div:nth-of-type(1)').addEventListener('click', () => {
    const url = 'https://kauth.kakao.com/oauth/authorize?client_id=e8af967f22a2e98d8aa94bcfc421bcfa&redirect_uri=https://njihun.github.io/Pick_and_Go/login/kakao.html&response_type=code';
    const windowFeatures = "left=100,top=100,width=420,height=640";
    window.open(url, '카카오 로그인', windowFeatures);
});

function login(user) {
    console.log('로그인 성공: '+user);
    // data.PIGO_token이 없는 경우를 대비한 null 체크
    if (data && data.PIGO_token) {
        sessionStorage.setItem('jwt', data.PIGO_token);
    } else if (sessionStorage.getItem('jwt')) {
        // 이미 sessionStorage에 토큰이 있는 경우
        console.log('기존 토큰 사용');
    }
    sessionStorage.setItem('name', user.name);
    sessionStorage.setItem('email', user.email);
    sessionStorage.setItem('sex', user.sex);
    sessionStorage.setItem('age', user.age);
    sessionStorage.setItem('id', user.ID);

    // 로그아웃 처리
    setLogout();
    location.reload();
}

function setLogout() {
    document.getElementById('log').style.backgroundColor = '#FF5151';
    document.getElementById('log').innerText = 'LogOut';
    document.getElementById('log').onclick = () => {
        Object.keys(sessionStorage).forEach((e) => {
            sessionStorage.removeItem(e);
        });
        location.reload();
    };
}

let data = null;
window.addEventListener("message", async (event) => {
    // 보안상 origin 체크 필수
    console.log('메시지 받음', event.origin, window.location.origin);
    
    if (event.origin !== window.location.origin) return;
    data = JSON.parse(event.data.data);
    console.log("카카오 토큰 받음:", data);
    const req = {
        "method": "GET",
        "headers":{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+data.PIGO_token
        }
    }
    let res = await fetch(url+'/user/getUserInfo', req);
    res = await res.json();
    if (res.sex) {
        login(res);
        close();
        return;
    }
    
    document.getElementById('name').value = data.user.kakao_account.profile.nickname;
    document.getElementById('email').value = data.user.kakao_account.email.split('@')[0];
    const domain = Array.from(document.getElementById('domain').children).slice(1, document.getElementById('domain').children.length - 1).some((e)=>{
        return e.value==data.user.kakao_account.email.split('@')[1];
    });
    if (domain) {
        Array.from(document.getElementById('domain').children).slice(1, document.getElementById('domain').children.length - 1).filter((e)=>{
            return e.value==data.user.kakao_account.email.split('@')[1];
        })[0].selected = true;
    } else {
        document.getElementById('domain').children[document.getElementById('domain').children.length - 1].selected = true;
        document.getElementById('email-domain').style.display = 'block';
        document.getElementById('email-domain').value = data.user.kakao_account.email.split('@')[1];
    }
    
    close();
    document.body.style.overflow = 'hidden';
    const userData = document.getElementById('user-data');
    overlay.style.display = 'block';
    userData.style.display = 'block';
});

document.querySelectorAll('footer > *:last-child > div > *').forEach((e) => {
    e.style.backgroundImage = `url(./imgs/${e.dataset.social}.png)`;
});

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
    if (document.getElementById('spin').style.display) return;
    close();
});

document.querySelectorAll('.close').forEach((e)=> {
    e.addEventListener('click', () => {
        close();
    });
});

document.getElementById('log').onclick = () => {
    document.body.style.overflow = 'hidden';
    const login = document.getElementById('login');
    overlay.style.display = 'block';
    login.style.display = 'block';
};

if (sessionStorage.getItem('jwt')) {
    setLogout();
}

function numberTypeLength(e) {
    e.value = e.value.slice(0, e.dataset.max);
    if (e.value.length < e.dataset.max) return;
    if (e.dataset.max == 4) {
        e.parentElement.children[1].focus();
    } else {
        e.parentElement.children[2].focus();
    }
}
window.numberTypeLength = numberTypeLength;

document.getElementById('domain').addEventListener('change', (e) => {
    if (e.target.value == 'write') {
        document.getElementById('email-domain').style.display = 'block';
        document.getElementById('email-domain').focus();
    } else {
        document.getElementById('email-domain').style.display = '';
    }
});

let editing = false;
async function editUserData() {
    if (editing) return;
    let domain = document.querySelector('#domain').value;
    if (domain == 'write') {
        domain = document.getElementById('email-domain').value;
        if (!domain) {
            alert('이메일을 입력해 주세요.');
            return;
        }
    } else if (domain == 'select') {
        // 선택 안 한 경우
        alert('이메일을 입력해 주세요.');
        return
    }
    const userData = Array.from(document.querySelectorAll('#user-data > *:nth-child(2) input')).filter((e) => {
        return e.id != 'email-domain'
    }).map((e) => e.value);
    if (userData.some((e)=>!Boolean(e)) || document.getElementById('gender').value == 'select') {
        alert('모든 입력란을 채워주세요.');
        return;
    }
    if (userData[2] > new Date().getFullYear() || Number(userData[3]) < 1 || Number(userData[3]) > 12 || userData[4] < 1 || userData[4] > 31) {
        alert("유효한 날짜를 입력해 주세요.");
        return;
    }
    if (userData[2] == new Date().getFullYear()) {
        if (userData[3] > new Date().getMonth + 1) {
            alert("유효한 날짜를 입력해 주세요.");
            return;
        } else if (userData[3] == new Date().getMonth + 1 && userData[4] > new Date().getDate()) {
            alert("유효한 날짜를 입력해 주세요.");
            return;
        }
    }
    editing = true;
    const req = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+sessionStorage.getItem('jwt')
        },
        "body": JSON.stringify({
            "newName": userData[0],
            "newEmail": `${userData[1]}@${domain}`,
            "newSex": document.getElementById('gender').value,
            "newAge": `${userData[2]}${userData[3]}${userData[4]}`,
        })
    };
    let res = await fetch(url + '/user/setUserInfo', req);
    if (res.status == 200) {
        res = await fetch(url+'/user/getUserInfo', {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+sessionStorage.getItem('jwt')
            }
        });
        res = await res.json();
        // 사용자 정보 업데이트 (data 변수가 없어도 동작하도록)
        sessionStorage.setItem('name', res.name);
        sessionStorage.setItem('email', res.email);
        sessionStorage.setItem('sex', res.sex);
        sessionStorage.setItem('age', res.age);
        sessionStorage.setItem('id', res.ID);
        
        document.querySelector('#profile > p > span').innerText = sessionStorage.getItem('name');
        let user = document.querySelectorAll('#user > div:nth-of-type(2) > div');
        user[0].innerText = sessionStorage.getItem('email');
        const sex = sessionStorage.getItem('sex');
        user[1].innerText = sex=='male'?'남':sex=='female'?'여':'알 수 없음.';
        const age = sessionStorage.getItem('age').slice(0, 4);
        user[2].innerText = (new Date().getFullYear()+1-Number(age))+'세';
        close();
        editing = false;
    }
}
window.editUserData = editUserData;

function randomTour() {
    if (tourLocation.length > 0) {
        if (sessionStorage.getItem('jwt')) {
            localStorage.setItem('tourLocation', JSON.stringify(tourLocation));
            randomTourRecommned();
        } else {
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
        }
    } else {
        const notice = document.getElementById('notice');
        notice.style.display = 'block';
        overlay.style.display = 'block';
        notice.children[1].innerText = '장소 선택은 필수입니다!';
        document.querySelector('#notice > *:last-child > div').onclick = () => {
            notice.style.display = '';
            overlay.style.display = '';
        };
    }
        //여기서 장소가 존재하는지 확인하고 넘기셈
}
window.randomTour = randomTour;

function recommendTour(params) {
    const personnel = document.querySelector("#recommend > div > div:nth-child(1) > input[type=number]").value;
    if (tourLocation.length == 0) {
        const notice = document.getElementById('notice');
        notice.style.display = 'block';
        overlay.style.display = 'block';
        notice.children[1].innerText = '장소 선택은 필수입니다!';
        document.querySelector('#notice > *:last-child > div').onclick = () => {
            notice.style.display = '';
            overlay.style.display = '';
        };
    } else if (!Boolean(personnel)) {
        const notice = document.getElementById('notice');
        notice.style.display = 'block';
        overlay.style.display = 'block';
        notice.children[1].innerText = '인원 선택은 필수입니다!';
        document.querySelector('#notice > *:last-child > div').onclick = () => {
            notice.style.display = '';
            overlay.style.display = '';
        };
    } else {
        if (sessionStorage.getItem('jwt')) {
            localStorage.setItem('tourLocation', JSON.stringify(tourLocation));
            localStorage.setItem('numofPeople', document.querySelector("#recommend > div > div:nth-child(1) > input[type=number]").value);
            const url2 = new URL(location.href);
            url2.searchParams.set('type', 'recommend-data');
            location.href = url2.href;
            // 추천 관광지 보여주는 페이지로 전환
        } else {
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
        }
    }
    // 장소 입력 + 인원 입력 확인

}
window.recommendTour = recommendTour;

if (regionDropDown) {
    document.querySelector('#cities > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2)').innerHTML = '';
    region.forEach((e, i) => {
        const city = document.createElement('div');
        city.classList.add('city');
        city.dataset.id = e.id;
        city.innerText = e.name;
        city.addEventListener('click', () => {
            Array.from(document.querySelector('#cities > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2)').children).forEach((e2) => {
                e2.style.backgroundColor = '';
            });
            city.style.backgroundColor = '#B4D5FF';
            const allSelect = document.createElement('div');
            allSelect.innerText = '전체 선택';
            allSelect.addEventListener('click', () => { 
                if (Array.from(document.querySelectorAll('#cities > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div:not(:first-child)')).some((e3) => Boolean(e3.style.backgroundColor==''))) {
                    Array.from(document.querySelectorAll('#cities > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div:not(:first-child)')).forEach((e2) => {
                        const city2 = e.child.filter((e3)=>e3.id == e2.dataset.id)[0];
                        const locationData = e.name + ' ' + city2.name;
                        if (tourLocation.indexOf(locationData)==-1) {
                            e2.click();
                        }
                    });
                } else {
                    Array.from(document.querySelectorAll('#cities > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div:not(:first-child)')).forEach((e2) => {
                        const city2 = e.child.filter((e3)=>e3.id == e2.dataset.id)[0];
                        const locationData = e.name + ' ' + city2.name;
                        if (tourLocation.indexOf(locationData)!=-1) {
                            e2.click();
                        }
                    });
                }
            });
            document.querySelector('#cities > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2)').innerHTML = '';
            document.querySelector('#cities > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2)').appendChild(allSelect);
            e.child.forEach((e2) => {
                const city2 = document.createElement('div');
                city2.classList.add('city');
                city2.dataset.id = e2.id;
                city2.innerText = e2.name;
                const locationData = e.name + ' ' + e2.name;
                if (tourLocation.indexOf(locationData)!=-1) {
                    city2.style.backgroundColor = '#B4D5FF';
                }
                city2.addEventListener('click', () => {
                    if (tourLocation.indexOf(locationData)==-1) {
                        tourLocation.push(locationData);
                        console.log(tourLocation);
                        
                        city2.style.backgroundColor = '#B4D5FF';
                    } else {
                        tourLocation.splice(tourLocation.indexOf(locationData), 1);
                        city2.style.backgroundColor = '';
                    }
                    document.querySelector('#cities > div:nth-of-type(2)').innerHTML = '';
                    tourLocation.forEach((e3) => {
                        const div = document.createElement('div');
                        div.innerText = e3;
                        div.addEventListener('click', () => {
                            tourLocation.splice(tourLocation.indexOf(e3), 1);
                            // backgroundColor 변경해 주어야 함.
                            console.log(region);
                            const parentCities = Array.from(document.querySelectorAll('#cities > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > .city'));
                            const parentCity = parentCities.filter((e4) => e4.innerHTML == e3.split(' ')[0])[0];
                            console.log(parentCity.dataset.id);
                            console.log(region.filter((e4) => e4.id == parentCity.dataset.id)[0]);
                            Array.from(document.querySelector('#cities > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2)').children).filter((e4) => e4.style.backgroundColor)[0].click();

                            setTimeout(() => {
                                document.querySelector('#cities > div:nth-of-type(2)').removeChild(div);
                            }, 0);
                        });
                        document.querySelector('#cities > div:nth-of-type(2)').appendChild(div);
                    });
                });
                document.querySelector('#cities > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2)').appendChild(city2);
            });
        });
        document.querySelector('#cities > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2)').appendChild(city);
        if (i==0) city.click();
    });
    
    regionElement.addEventListener('click', (e) => {
        if (document.getElementById('cities').contains(e.target)) return;
        console.log(e.target);
        
        if (regionDropDown.classList.contains('open')) {
            document.querySelector('.dropdown-icon').classList.remove('open');
            regionDropDown.classList.remove('open');
        } else {
            document.querySelector('.dropdown-icon').classList.add('open');
            regionDropDown.classList.add('open');
        }
    });
    
    regionElement.addEventListener('focusout', (e) => {
        document.querySelector('.dropdown-icon').classList.remove('open');
        regionDropDown.classList.remove('open');
    });
}