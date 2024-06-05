function getDownLoadAppUrl(){

    let getParamByName = (name, url = window.location.href) => {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    let getUrl = (urlPlatform, cb)=>{
        let sheetApiEndPointUrl = 'https://sheetdb.io/api/v1/k6nlu7ysoto51';
        fetch( sheetApiEndPointUrl + `/search?platform=` + urlPlatform)
        .then(response => response.json())
        .then(data => {
        if (data.length > 0) {
            console.log('Data Found:', data);
            cb(data[0].url);
        }
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    

    getUrl('ios', (returnString) => {
        let downLoadUrl = returnString;
        console.log('download ios app :' + downLoadUrl);
    })

    getUrl('android', (returnString) => {
        const source = getParamByName('source');
        let downLoadUrl = returnString + source;
        console.log('download ios app :' + downLoadUrl);
    })

}