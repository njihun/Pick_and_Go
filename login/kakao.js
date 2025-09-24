const params = new URLSearchParams(location.search);
const code = params.get('code');

const url = 'https://d0g0h1.world/kakao/code';

fetch(`${url}?code=${code}`).then((res) => {
    return res.text();
}).then((data)=>{
    if (window.opener) {
        document.body.innerHTML = window.opener;
        window.opener.postMessage({ data }, window.location.origin);
        setTimeout(() => {
            window.close();
        }, 1000);
    } else {
        document.body.innerHTML = "window.opener 없음."
    }
}).catch((err)=>{
    document.body.innerHTML = 'Failed to Redirect.';
    window.opener.postMessage({ data }, window.location.origin);
});