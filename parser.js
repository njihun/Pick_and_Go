export async function getRegion() {
    let parentCities = await fetch("./data/sigungu_sido_202507271439.csv");
    parentCities = (await parentCities.text()).trim().split('\n');
    parentCities.splice(0, 1);
    let childCities = await fetch("./data/sigungu_sigungu_202507271439.csv");
    childCities = (await childCities.text()).trim().split('\n');
    childCities.splice(0, 1);
    childCities = childCities.map((e) => {
        const city = e.split(',');
        const result = {
            name: city[1],
            id: city[0],
            parentId: city[2]
        }
        return result;
    });
    parentCities = parentCities.map((e) => {
        const parentCity = e.split(',');
        const id = parentCity[0];
        const child = childCities.filter((e2) => id == e2.parentId);
        const result = {
            name: parentCity[1],
            id: id,
            child: child
        }
        return result;
    });
    return parentCities;
}

export async function getFilterList() {
    let filterList = await fetch('./data/lclsSystmCode1_202507211653.csv');
    filterList = (await filterList.text()).trim().split('\n');
    filterList.splice(0, 1);
    return filterList.map((e) => {
        const temp = e.split(',');
        return {
            'Cd': temp[0].trim(),
            'Nm': temp[1].trim()
        };
    });
    
}