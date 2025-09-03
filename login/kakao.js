const params = new URLSearchParams(location.search);
const code = params.get('code');

const url = 'https://43.201.115.135:8443/kakao/code';
fetch(`${url}?code=${code}`).then((res) => {
    return res.text();
}).then((data)=>{
    console.log(data,  window.location.origin);
    
    window.opener.postMessage({ data }, '*');
    // window.close();
}).catch((err)=>{
    document.body.innerHTML = err;
});