const container = document.querySelector('#hotplace .container');
async function getHotplace(criteria = 'total_visited_count') {
    const url = 'https://d0g0h1.world/tour/getHotplace/';
    let hotplaceList = [{"tour_id":"141375","title":"울주 간절곶 해맞이 축제","region1":"31","region2":"710","tourtype":"EV","tourimage":"http://tong.visitkorea.or.kr/cms/resource/87/3057487_image2_1.JPG","total_visited_count":21,"month_visited_count":"11"},{"tour_id":"1392557","title":"양산삽량문화축전","region1":"48","region2":"330","tourtype":"EV","tourimage":"http://tong.visitkorea.or.kr/cms/resource/12/3468912_image2_1.JPG","total_visited_count":17,"month_visited_count":"8"},{"tour_id":"2589349","title":"서울식물원","region1":"11","region2":"500","tourtype":"NA","tourimage":"http://tong.visitkorea.or.kr/cms/resource/60/2658460_image2_1.jpg","total_visited_count":15,"month_visited_count":"7"},{"tour_id":"2768069","title":"만우 정육점 식당","region1":"41","region2":"670","tourtype":"FD","tourimage":"http://tong.visitkorea.or.kr/cms/resource/42/2768342_image2_1.jpg","total_visited_count":13,"month_visited_count":"0"},{"tour_id":"2738760","title":"계룡산동학사자동차야영장","region1":"44","region2":"150","tourtype":"AC","tourimage":"http://tong.visitkorea.or.kr/cms/resource/98/2738998_image2_1.JPG","total_visited_count":13,"month_visited_count":"1"},{"tour_id":"1269517","title":"구례 산수유마을","region1":"46","region2":"730","tourtype":"EX","tourimage":"http://tong.visitkorea.or.kr/cms/resource/20/3371320_image2_1.jpg","total_visited_count":12,"month_visited_count":"3"},{"tour_id":"2654175","title":"폴인팬케이크 대학로","region1":"11","region2":"110","tourtype":"FD","tourimage":"http://tong.visitkorea.or.kr/cms/resource/99/2655199_image2_1.jpg","total_visited_count":11,"month_visited_count":"0"},{"tour_id":"3305445","title":"톰보이","region1":"11","region2":"545","tourtype":"SH","tourimage":"http://tong.visitkorea.or.kr/cms/resource/74/3312874_image2_1.jpeg","total_visited_count":11,"month_visited_count":"1"},{"tour_id":"2911850","title":"마시기통차 유성본점","region1":"30","region2":"200","tourtype":"FD","tourimage":"http://tong.visitkorea.or.kr/cms/resource/33/2911833_image2_1.jpg","total_visited_count":11,"month_visited_count":"0"},{"tour_id":"2867294","title":"명인등심 압구정 본점","region1":"11","region2":"680","tourtype":"FD","tourimage":"http://tong.visitkorea.or.kr/cms/resource/83/2867283_image2_1.jpg","total_visited_count":11,"month_visited_count":"0"},{"tour_id":"2682988","title":"아미산(당진)","region1":"44","region2":"270","tourtype":"NA","tourimage":"http://tong.visitkorea.or.kr/cms/resource/88/2901588_image2_1.jpg","total_visited_count":11,"month_visited_count":"1"},{"tour_id":"2853156","title":"해물왕창칼국수","region1":"26","region2":"530","tourtype":"FD","tourimage":"http://tong.visitkorea.or.kr/cms/resource/43/2853143_image2_1.jpg","total_visited_count":10,"month_visited_count":"2"},{"tour_id":"2874764","title":"능원숯불갈비","region1":"41","region2":"281","tourtype":"FD","tourimage":"http://tong.visitkorea.or.kr/cms/resource/17/2874717_image2_1.jpg","total_visited_count":10,"month_visited_count":"0"},{"tour_id":"3305671","title":"베네피아 향수","region1":"11","region2":"530","tourtype":"SH","tourimage":"http://tong.visitkorea.or.kr/cms/resource/65/3313065_image2_1.jpeg","total_visited_count":10,"month_visited_count":"0"},{"tour_id":"131359","title":"장포리 바다낚시","region1":"48","region2":"840","tourtype":"LS","tourimage":"http://tong.visitkorea.or.kr/cms/resource/00/3476200_image2_1.jpg","total_visited_count":10,"month_visited_count":"5"},{"tour_id":"132104","title":"군위장 (3, 8일)","region1":"27","region2":"720","tourtype":"SH","tourimage":"http://tong.visitkorea.or.kr/cms/resource/84/1979284_image2_1.jpg","total_visited_count":9,"month_visited_count":"0"},{"tour_id":"2764968","title":"퇴골계곡","region1":"41","region2":"480","tourtype":"NA","tourimage":"http://tong.visitkorea.or.kr/cms/resource/29/2765029_image2_1.jpg","total_visited_count":9,"month_visited_count":"0"},{"tour_id":"2865913","title":"비피터","region1":"41","region2":"590","tourtype":"FD","tourimage":"http://tong.visitkorea.or.kr/cms/resource/99/2865899_image2_1.jpg","total_visited_count":9,"month_visited_count":"0"},{"tour_id":"3305447","title":"홈플러스 순천","region1":"46","region2":"150","tourtype":"SH","tourimage":"http://tong.visitkorea.or.kr/cms/resource/77/3312877_image2_1.jpg","total_visited_count":9,"month_visited_count":"2"},{"tour_id":"3307461","title":"크로커다일레이디","region1":"11","region2":"545","tourtype":"SH","tourimage":"http://tong.visitkorea.or.kr/cms/resource/22/3314322_image2_1.jpg","total_visited_count":9,"month_visited_count":"1"},{"tour_id":"2913734","title":"동죽이네","region1":"30","region2":"200","tourtype":"FD","tourimage":"http://tong.visitkorea.or.kr/cms/resource/24/2913724_image2_1.jpg","total_visited_count":9,"month_visited_count":"1"},{"tour_id":"2469437","title":"주암댐 물 문화관","region1":"46","region2":"150","tourtype":"EX","tourimage":"http://tong.visitkorea.or.kr/cms/resource/26/3370726_image2_1.JPG","total_visited_count":9,"month_visited_count":"0"},{"tour_id":"2930099","title":"카페배양장","region1":"48","region2":"220","tourtype":"FD","tourimage":"http://tong.visitkorea.or.kr/cms/resource/82/2930082_image2_1.jpg","total_visited_count":9,"month_visited_count":"2"},{"tour_id":"3307460","title":"벨리걸","region1":"11","region2":"740","tourtype":"SH","tourimage":"http://tong.visitkorea.or.kr/cms/resource/20/3314320_image2_1.jpg","total_visited_count":9,"month_visited_count":"0"},{"tour_id":"3007126","title":"뜰안에 블루베리 농원","region1":"41","region2":"220","tourtype":"EX","tourimage":"http://tong.visitkorea.or.kr/cms/resource/78/3003578_image2_1.jpg","total_visited_count":9,"month_visited_count":"0"},{"tour_id":"2876409","title":"대게장순두부 금성관","region1":"47","region2":"130","tourtype":"FD","tourimage":"http://tong.visitkorea.or.kr/cms/resource/75/2876375_image2_1.jpg","total_visited_count":8,"month_visited_count":"0"},{"tour_id":"2732334","title":"지곡저수지","region1":"41","region2":"463","tourtype":"NA","tourimage":"http://tong.visitkorea.or.kr/cms/resource/94/2774194_image2_1.jpg","total_visited_count":8,"month_visited_count":"0"},{"tour_id":"2730051","title":"캠프운악","region1":"41","region2":"650","tourtype":"AC","tourimage":"http://tong.visitkorea.or.kr/cms/resource/89/2730389_image2_1.jpg","total_visited_count":8,"month_visited_count":"0"},{"tour_id":"2910717","title":"오리하우스","region1":"48","region2":"127","tourtype":"FD","tourimage":"http://tong.visitkorea.or.kr/cms/resource/97/2910697_image2_1.jpg","total_visited_count":8,"month_visited_count":"0"},{"tour_id":"2788028","title":"성삼재","region1":"46","region2":"730","tourtype":"LS","tourimage":"http://tong.visitkorea.or.kr/cms/resource/17/2791117_image2_1.jpg","total_visited_count":8,"month_visited_count":"1"}];
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