const params = new URLSearchParams(location.search);
const code = params.get('code');

const url = 'https://d0g0h1.world/kakao/code';
fetch(`${url}?code=${code}`).then((res) => {
    return res.text();
}).then((data)=>{
    window.opener.postMessage({ data }, window.location.origin);
    window.close();
}).catch((err)=>{
    document.body.innerHTML = 'Failed to Redirect.';
    console.log(err);
});