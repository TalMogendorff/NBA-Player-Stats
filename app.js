const $playerinput = document.getElementById('playerInput');
const $playerDisplay = document.getElementById('playerDisplay');
const $playerFullName = document.getElementById('playerFullName');
const $button = document.getElementById('button');
const $err = document.getElementById('error');
const mapping = {
    "Los Angeles Lakers": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg",
    "Miami Heat": "https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Miami_Heat_logo.svg/1200px-Miami_Heat_logo.svg.png",
    "Atlanta Hawks": "https://images.vexels.com/media/users/3/129260/isolated/preview/8cc957ea29f8a0f2f48cbba08afcb901-atlanta-hawks-logo-by-vexels.png",
    "Boston Celtics": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRydXcw5ZhTEClj4WLiRX5yDXajvZjll-l4IQ&usqp=CAU",
    "Brooklyn Nets": "https://i.pinimg.com/originals/9f/66/d0/9f66d02922e70e996467a44c5700900d.png",
    "Charlotte Hornets": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0gW8iY_6lfa3brZCd_qBcLU4W2qDT-X2GJA&usqp=CAU",
    "Chicago Bulls": "https://cdn.freebiesupply.com/images/large/2x/chicago-bulls-logo-transparent.png",
    "Cleveland Cavaliers": "https://lh3.googleusercontent.com/proxy/XXMaE-0saiZ2gFES-4d2-q-VoosbzQf86FG9sQ02CNPW1voPx42ezn3D2WKOPLYCBHHNO8ZWlCAFJCXCatlyIdDXMh8dUa3w_QXuVcK_HWe5GWNqetzyR6IssInCiPYJk94",
    "Dallas Mavericks": "https://cdn.freelogovectors.net/wp-content/uploads/2018/03/dallas_mavericks_logo.png",
    "Denver Nuggets": "https://logos-world.net/wp-content/uploads/2020/05/Denver-Nuggets-Logo-2019-Present.png",
    "Detroit Pistons": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Pistons_logo17.svg/1200px-Pistons_logo17.svg.png",
    "Golden State Warriors": "https://upload.wikimedia.org/wikipedia/sco/thumb/0/01/Golden_State_Warriors_logo.svg/1200px-Golden_State_Warriors_logo.svg.png",
    "Houston Rockets": "https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Houston_Rockets.svg/1200px-Houston_Rockets.svg.png",
    "Indiana Pacers": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Indiana_Pacers_logo.svg/1024px-Indiana_Pacers_logo.svg.png",
    "LA Clippers": "https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Los_Angeles_Clippers_%282015%29.svg/1200px-Los_Angeles_Clippers_%282015%29.svg.png",
    "Memphis Grizzlies": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Memphis_Grizzlies.svg/1200px-Memphis_Grizzlies.svg.png",
    "Milwaukee Bucks": "https://cdn.freelogovectors.net/wp-content/uploads/2020/03/milwaukee-bucks-logo.png",
    "Minnesota Timberwolves": "https://upload.wikimedia.org/wikipedia/he/d/d2/Minnesota_Timberwolves_logo.png",
    "New Orleans Pelicans": "https://logos-world.net/wp-content/uploads/2020/05/New-Orleans-Pelicans-Logo.png",
    "New York Knicks": "https://logos-world.net/wp-content/uploads/2020/05/New-York-Knicks-subway-logo.png",
    "Oklahoma City Thunder": "https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Oklahoma_City_Thunder.svg/1200px-Oklahoma_City_Thunder.svg.png",
    "Orlando Magic": "https://upload.wikimedia.org/wikipedia/en/thumb/1/10/Orlando_Magic_logo.svg/1200px-Orlando_Magic_logo.svg.png",
    "Philadelphia 76ers": "https://upload.wikimedia.org/wikipedia/he/b/ba/Philadelphia_76ers_Logo.png",
    "Phoenix Suns": "https://upload.wikimedia.org/wikipedia/he/e/e7/Phoenix_Suns_2013_LOGO.png",
    "Portland Trail Blazers": "https://cdn.freebiesupply.com/images/large/2x/portland-trail-blazers-logo-transparent.png",
    "Sacramento Kings": "https://logos-world.net/wp-content/uploads/2020/05/Sacramento-Kings-logo.png",
    "San Antonio Spurs": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/San_Antonio_Spurs.svg/1200px-San_Antonio_Spurs.svg.png",
    "Toronto Raptors": "https://logos-world.net/wp-content/uploads/2020/05/Toronto-Raptors-Emblem.png",
    "Utah Jazz": "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utah_Jazz_logo_%282016%29.svg/1200px-Utah_Jazz_logo_%282016%29.svg.png",
    "Washington Wizards": "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Washington_Wizards_logo.svg/1200px-Washington_Wizards_logo.svg.png",
}

async function playerIdApi(searchName) {
    const response = await fetch(`https://www.balldontlie.io/api/v1/players?search=${searchName}`);
    const data = await response.json();
    if (!data.data.length) {
        return
    }
    return data.data[0].id;
}

/* async function TeamIdApi(teamId) {
    const response = await fetch(`https://www.balldontlie.io/api/v1/teams/${teamId}`);
    const data = await response.json();
    return data.name;
} */

let dateOfGame;

async function playerStatsById(playerId) {
    const statsUrl = await fetch(`https://www.balldontlie.io/api/v1/stats?seasons[]=2019&seasons[]=2020&per_page=100&player_ids[]=${playerId}`);
    const dataStats = await statsUrl.json();
    const dataInfo = dataStats.data;
    if ($playerinput.value.indexOf(' ') == -1) {
        $playerDisplay.innerHTML = '';
        $err.innerHTML = `<h1>Please enter full name of the NBA player</h1>`
        $playerinput.focus();
    } else if (!dataStats.data.length) {
        $playerDisplay.innerHTML = '';
        $err.innerHTML = `<h2>There is no such a player name <br>check your spelling please</h2>`
        $playerinput.focus();
    } else {
        $err.innerHTML = ' '
        dataInfo.sort((a, b) => {
            return new Date(b.game.date) - new Date(a.game.date);
        })

        dataInfo.forEach(({
            pts,
            reb,
            ast,
            blk,
            game: {
                date,
                home_team_id,
                visitor_team_id
            },
            team: {
                full_name
            },
            player: {
                first_name,
                last_name
            }
        }) => {
            /* let homeTeam = await TeamIdApi(home_team_id);
            let visitorTeam = await TeamIdApi(visitor_team_id); */
            dateOfGame = new Date(date);
            let dateString = dateOfGame.toDateString();
            $playerFullName.innerHTML = `<h1> ${first_name} - ${last_name} <img width="100" height="100" src=${mapping[full_name]}></h1>
            <hr>`
            $playerDisplay.innerHTML += `<div style="border:1px solid white;background-color: rgba(219, 216, 216, 0.7)">${pts}</div>
                <div style="border:1px solid white;background-color: rgba(219, 216, 216, 0.7)">${reb}</div>
                <div style="border:1px solid white;background-color: rgba(219, 216, 216, 0.7)">${ast}</div>
                <div style="border:1px solid white;background-color: rgba(219, 216, 216, 0.7)">${blk}</div>
                <div style="border:1px solid white;background-color: rgba(219, 216, 216, 0.7)">${dateString}</div>`
            /* <div>${homeTeam} - ${visitorTeam}</div> */

        })
    }
    return dataStats;
}

async function playerStatsMerge(pId) {
    let y = await playerIdApi(pId);
    let x = playerStatsById(y);
}



$button.addEventListener('click', (() => {
    $playerFullName.innerHTML = ' ';
    $playerDisplay.innerHTML = `<div style="border:2px solid white;background-color: rgba(219, 216, 216, 1)">Points</div> 
        <div style="border:2px solid white;background-color: rgba(219, 216, 216, 1)">Rebound</div> 
        <div style="border:2px solid white;background-color: rgba(219, 216, 216, 1)">Assists</div>
        <div style="border:2px solid white;background-color: rgba(219, 216, 216, 1)">Block</div>
        <div style="border:2px solid white;background-color: rgba(219, 216, 216, 1)">Date</div>`
    /*  <div>Teams</div>; */
    playerStatsMerge($playerinput.value)
}));