const params = new URLSearchParams(location.search);
const code = params.get('code');

const url = 'https://43.201.115.135:8443/kakao/code';
fetch(`${url}?code=${code}`).then((res) => {
    return res.text()
}).then((data)=>{
    document.body.innerHTML = data;
});