const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'c34559ca92msh815d4b12649cd36p1fa3a5jsn6de9f4448099',
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
};

const playlistURL = document.getElementById('playlistLink')
const playlistLength = document.getElementById('output')
const loader = document.getElementById('loader')

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
}
const getTitle = async () => {
    const URL = String(playlistURL.value)
    const playlistID = URL.substring(URL.indexOf('=')+1)
    console.log(playlistID)
    const res = await fetch(`https://youtube138.p.rapidapi.com/playlist/details/?id=${playlistID}&hl=en&gl=US`, options)
    const data = await res.json()
    const playlistName = data.title
    return playlistName
}


const getData = async () => {
    loader.style.display = "flex"
    const URL = String(playlistURL.value)
    const playlistID = URL.substring(URL.indexOf('=')+1)
    const res = await fetch(`https://youtube138.p.rapidapi.com/playlist/videos/?id=${playlistID}&hl=en&gl=US`, options)
    const data = await res.json()
    let totalLengthSeconds = 0
    for (const i in data.contents) {
        totalLengthSeconds += data.contents[i].video.lengthSeconds
    }
    const playlistName = await getTitle()
    loader.remove()
    playlistLength.innerText = playlistName + '\n\n' + secondsToHms(totalLengthSeconds)
}
