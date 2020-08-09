<template>
<div class="container-fluid" style="margin-top:70px">
    <form method="post" action="/Matches/Fixtures">
        <input type="hidden" name="_token" v-model="token">
        <input type="hidden" class="form-control" v-model="live">
        <button type="submit" class="btn btn-success">Post Games</button>
    </form>
    <table class="table">
        <thead>
            <tr>
                <th>Date</th>
                <th>Stadium</th>
                <th>City</th>
                <th>League</th>
                <th>Country</th>
                <th>Flag</th>
                <th>HomeTeam</th>
                <th>HomeFlag</th>
                <th>AwayTeam</th>
                <th>AwayFlag</th>
                <th>Post</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="game in live" :key="game.id">
                <td>{{ game.fixture.date }}</td>
                <td>{{ game.fixture.venue.name }}</td>
                <td>{{ game.fixture.venue.city }}</td>
                <td>{{ game.league.name }}</td>
                <td>{{ game.league.country }}</td>
                <td>{{ game.league.flag }}</td>
                <td>{{ game.teams.home.name }}</td>
                <td>{{ game.teams.home.logo }}</td>
                <td>{{ game.teams.away.name }}</td>
                <td>{{ game.teams.home.logo }}</td>
                <form>
                    <input type="text" name="data"  v-bind="live">        
                    <button>Done form</button>          
                </form>
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
        }
    },
    methods: {
        loadLive(){
               axios.get('https://api-football-beta.p.rapidapi.com/fixtures?date=2020-08-09', {
                headers: {
                    "x-rapidapi-host": "api-football-beta.p.rapidapi.com",
                    "x-rapidapi-key": "c13040f058msha0bc089bf3931f5p116ea2jsn7c9c8b77577d"
                }
                }).then(({data})=>(
                    this.live=data.response,
                    console.log(data.response)
                    //post the results to a controller for the data to be saved 
                    // axios.post('/Matches/Fixtures', data.response)
                ));
        }
    },
    create(){
        this.loadLive()
    },
    mounted(){
           this.token= $('meta[name="csrf-token"]').attr('content'),
         this.loadLive()
    }
}
</script>