        const apiEndPointUrl = 'https://sheetdb.io/api/v1/wprvb0lsfhyk1';

        function getParameterByName(name, url = window.location.href) {
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }

        function main() {
            const action = getParameterByName('action');
            const source = getParameterByName('source');
            const platform = getParameterByName('platform');
            const output = document.getElementById('output');
            
            let userIp = localStorage.getItem('userIp');
            if (action === 'write' || !userIp) {
                let cb = (ip) => {
                    console.log('post new ip');
                    localStorage.setItem('userIp', ip);
                    checkAndPostOrUpdate(ip, source);
                };
                getIP(cb);
            } 
            else if (action === 'read') {

            } 
            else {
                output.textContent = 'Invalid action or source parameter.';
            }
        }

        function getIP(cb){
            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => { 
                    console.log('IP Address:', data.ip);
                    cb(data.ip);
                })
                .catch(error => console.error('Error fetching IP:', error));
        }

        function checkAndPostOrUpdate(id, source) {

            const now = new Date();
            const options = { timeZone: 'Asia/Bangkok', timeZoneName: 'short' };
            const localDate = now.toLocaleString('en-US', options);

            const platform = navigator.platform;

            fetch(apiEndPointUrl + `/search?id=${id}`)
                .then(response => response.json())
                .then(data => {
                //writeUserDataCompleted = true;
                // let download = getParameterByName('download');
                // let platform = getParameterByName('platform');
                // if(download === 'true'){
                //     if(platform === 'ios') openAppOnAppleStore();
                //     else if(platform === 'android') openAppOnGooglePlay();
                // }
                if (data.length > 0) {
                    // Nếu có dữ liệu tồn tại, thực hiện cập nhật
                    console.log('update row');
                    updateRow(id, source, localDate, platform);
                } else {
                    // Nếu không tồn tại, thực hiện thêm mới
                    console.log('post new row');
                    postNewRow(id, source, localDate, platform);
                }
                
                })
                .catch(error => console.error('Error:', error));
        }
        
        function updateRow(id, source, time, platform) {

            fetch(apiEndPointUrl + `/id/${id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: { 'source': source, 'time': time , 'platform' : platform} })
            })
            .then(response => response.json())
            .then(data => console.log('Updated Successfully:', data))
            .catch(error => console.error('Update Error:', error));
        }

        function postNewRow(id, source, time, platform) {
            fetch(apiEndPointUrl, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: { 'id': id, 'source': source, 'time': time, 'platform' : platform } })
            })
            .then(response => response.json())
            .then(data => console.log('Posted Successfully:', data))
            .catch(error => console.error('Post Error:', error));
        }