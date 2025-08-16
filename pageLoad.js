export async function mypage() {
    document.querySelector('.burger-bar').click(); // 열려있는 버거바 닫음
    document.title = 'PIGO - 내 정보';
    document.querySelector('.container').innerHTML = '';
    const temp = await fetch('./mypage.html');
    document.querySelector('.container').innerHTML += await temp.text();
}

export async function favoriteAttractions() {
    document.querySelector('.burger-bar').click(); // 열려있는 버거바 닫음
    document.title = 'PIGO - 관심 관광지';
    document.querySelector('.container').innerHTML = '';
    const temp = await fetch('./favoriteAttractions.html');
    temp.text().then((e)=>{
        document.querySelector('.container').innerHTML += e;
        import("./favoriteAttractions.js");
    });
}