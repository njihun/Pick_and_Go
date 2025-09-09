export async function mypage() {
    document.querySelector('.burger-bar').click(); // 열려있는 버거바 닫음
    document.title = 'PIGO - 내 정보';
    const container = document.querySelector('.container');
    container.innerHTML = '';
    if (document.getElementById('recommend')) document.body.removeChild(document.getElementById('recommend'));
    const temp = await fetch('./mypage.html');
    temp.text().then((e) => {
        container.innerHTML += e;
        import(`./mypage.js?ts=${Date.now()}`);
    });
}

export async function favoriteAttractions() {
    document.querySelector('.burger-bar').click(); // 열려있는 버거바 닫음
    document.title = 'PIGO - 관심 관광지';
    const container = document.querySelector('.container');
    container.innerHTML = '';
    if(document.getElementById('recommend')) document.body.removeChild(document.getElementById('recommend'));
    const temp = await fetch('./favoriteAttractions.html');
    temp.text().then((e)=>{
        container.innerHTML += e;
        import(`./favoriteAttractions.js?ts=${Date.now()}`);
    });
}