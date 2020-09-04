<template>
<div class="container-fluid" style="margin-top:70px">
    <table class="table">
        <thead>
            <tr>
                <th>Date</th>
                <th>Stadium</th>
                <th>League</th>
                <th>Country</th>
                <th>Flag</th>
                <th>HomeTeam</th>
                <th>HomeFlag</th>
                <th>AwayTeam</th>
                <th>AwayFlag</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="game in live" :key="game.id">
                <td>{{ game.event_date}}</td>
                 <td>{{ game.venue}}</td>
                <td>{{ game.league.name }}</td>
                <td>{{ game.league.country }}</td>
                <td>{{ game.league.flag }}</td>
                <td>{{ game.homeTeam.team_name }}</td>
                <td>{{ game.homeTeam.logo }}</td>
                <td>{{ game.awayTeam.team_name }}</td>
                <td>{{ game.awayTeam.logo }}</td>
            </tr>
        </tbody>

    </table>
</div>
</template>
<script>
export default{
    data(){
        return{
            live:{},
            token:'',
            today:''
        }
    },
    methods: {
        getToday(){
            axios.get('/Get/Today').then((response)=>{
            this.today=response.data
            }).catch((err)=>{
                console.log(err)
            })
        },
        loadLive(){
               axios.get('https://api-football-v1.p.rapidapi.com/v2/fixtures/date/2020-09-04?timezone=Europe/Amsterdam', {
                headers: {
                    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                    "x-rapidapi-key": "ba38e4e931msh8cbd07b515ed9a0p15c2c5jsn87707fbad3c8"
                }
                }).then(({data})=>(
                    this.live=data.api.fixtures,
                    this.PostData(this.live)
                ));
                //try to post data using azion
        },
        PostData(live){
           this.live.forEach(element => {
                        let eventDate=element.event_date;
                        let fixture=element.fixture_id;
                        let venue=element.venue;
                        let league=element.league.name;
                        let country=element.league.country;
                        let flag=element.league.flag;
                        let homeTeam=element.homeTeam.team_name;
                        let homeLogo=element.homeTeam.logo;
                        let awayTeam=element.awayTeam.team_name;
                        let awayLogo=element.awayTeam.logo;
                        axios.post('/Matches/Fixtures',{
                            _token: this.token,
                            date: eventDate,
                            fixture_id:fixture,
                            venue: venue,
                            league: league,
                            country: country,
                            flag: flag,
                            home: homeTeam,
                            homeFlag: homeLogo,
                            away: awayTeam,
                            awayFlag: awayLogo,

                            }
                            )
                        .then((response)=>{
                            console.log('Data Successfully Posted');

                        }).catch((error)=>{
                            console.log(error)
                        })
                        // console.log('Event Date Is '+)
                        // console.log('Event venue Is '+venue)
                        // console.log('Event league Is '+league)
                        // console.log('Event country Is '+country)
                        // console.log('Event flag Is '+flag)
                        // console.log('Event homeTeam Is '+homeTeam)
                        // console.log('Event homeflag Is '+homeLogo)
                        // console.log('Event awayIs '+awayTeam)
                        // console.log('Event away flag Is '+awayLogo)
                    });

        }
    },
    mounted(){
            this.token= $('meta[name="csrf-token"]').attr('content'),
         this.loadLive()
        this.getToday()
    }
}
</script>
