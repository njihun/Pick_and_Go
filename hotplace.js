const container = document.querySelector('#hotplace .container');
async function getHotplace(criteria = 'total_visited_count') {
    const url = 'https://d0g0h1.world/tour/getHotplace/';
    let hotplaceList = [{"tour_id":"141375","title":"울주 간절곶 해맞이 축제","region1":"31","region2":"710","tourtype":"EV","tourimage":"http://tong.visitkorea.or.kr/cms/resource/87/3057487_image2_1.JPG","total_visited_count":21,"month_visited_count":"11"},{"tour_id":"1392557","title":"양산삽량문화축전","region1":"48","region2":"330","tourtype":"EV","tourimage":"http://tong.visitkorea.or.kr/cms/resource/12/3468912_image2_1.JPG","total_visited_count":17,"month_visited_count":"8"},{"tour_id":"2589349","title":"서울식물원","region1":"11","region2":"500","tourtype":"NA","tourimage":"http://tong.visitkorea.or.kr/cms/resource/60/2658460_image2_1.jpg","total_visited_count":15,"month_visited_count":"7"}];
    try {
        hotplaceList = await fetch(url+criteria);
        hotplaceList = await hotplaceList.json();
    } catch(ignore){}
    container.innerHTML = '';
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    hotplaceList.forEach((e, i) => {
        const attraction = document.createElement('div');
        attraction.classList.add('attraction');
        const img = document.createElement('div');
        img.style.backgroundImage = `url(${e.tourimage})`;
        const p = document.createElement('p');
        const title = document.createElement('h3');
        title.innerText = i+1+'. '+e.title;
        p.append(title);
        attraction.append(img, p);
        attraction.addEventListener('click', () => {
            const url = new URL(location.href);
            url.searchParams.set('id', hotplaceList[i].tour_id);
            location.href = url.href;
        });
        if (i==0 || i==1) {
            div.appendChild(attraction);
            if (i==1) {
                container.appendChild(div);
            }
            return;
        }
        div2.appendChild(attraction);
        if (i==hotplaceList.length-1) {
            container.appendChild(div2);
        }
    });
}
await getHotplace();

function resize() {
    const margin = 20;
    const count = Math.trunc(container.getBoundingClientRect().width/(container.children[1].children[0].getBoundingClientRect().width + margin));
    container.children[1].style.gridTemplateColumns = `repeat(${count}, 1fr)`;
    if (count <= 2) {
        Array.from(container.children[0].children).forEach((e) => {
            e.classList.remove('auto');
        });
        document.querySelector('#hotplace > .container > div:nth-of-type(1)').style.gridTemplateColumns = '1fr 1fr';
        if (count <= 1) {
            document.querySelector('#hotplace > .container > div:nth-of-type(1)').style.gridTemplateColumns = '1fr';
        }
    } else {
        Array.from(container.children[0].children).forEach((e) => {
            e.classList.add('auto');
        });
    }
}
resize();
window.addEventListener('resize', resize);