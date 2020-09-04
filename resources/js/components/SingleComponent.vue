<template>
    <div class="row">
        <ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6177716716878978"
     data-ad-slot="2161762392"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
        <div class="col-sm-8">
            <h2 class="text-center">Match Analytics</h2>
            <div v-for="detail in details" :key="detail.id" style="background-color:whitesmoke">
              <div class="row">
                  <div class="col-sm-6 text-center">
                        <img :src="detail.h2h[0].league.flag" width="70%">
              <h2>Country: {{ detail.h2h[0].league.country}}</h2>
              <h2>League:   {{ detail.h2h[0].league.name }} </h2>
              <h6>Venue:   {{ detail.h2h[0].venue }} </h6>
                  </div>
                  <div class="col-sm-6">
                   <h2>Home Team</h2>
                  <span>Team Name:    {{ detail.teams.home.team_name }}</span>
                     <div class="container">
                         <h3>Last 5 Matched</h3>
                         <table class="table table-condensed table-hover table-bordered">
                             <thead>
                                 <tr>
                                     <th>Forme</th>
                                     <th>Att</th>
                                     <th>Def</th>
                                     <th>Goals</th>
                                     <th>Avg. Goals</th>
                                     <th>Goals Against</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 <tr>
                                     <td>  {{ detail.teams.home.last_5_matches.forme }}</td>
                                     <td>  {{ detail.teams.home.last_5_matches.att }}</td>
                                     <td>  {{ detail.teams.home.last_5_matches.def }}</td>
                                     <td>  {{ detail.teams.home.last_5_matches.goals }}</td>
                                     <td>  {{ detail.teams.home.last_5_matches.goals_avg }}</td>
                                     <td>  {{ detail.teams.home.last_5_matches.goals_against }}</td>
                                 </tr>
                             </tbody>
                         </table>
                        <h6 class="text-center">Goals Against Average: {{ detail.teams.home.last_5_matches.goals_against_avg }}</h6>
                        <h3 class="text-center" style="color:red">{{detail.teams.home.team_name}} Matches Played</h3>
                        <table class="table table-condensed table-bordered">
                          <thead>
                              <tr>
                                  <th>Home</th>
                                  <th>Away</th>
                                  <th>Total</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>{{ detail.teams.home.all_last_matches.matchs.matchsPlayed.home }}</td>
                                  <td>{{ detail.teams.home.all_last_matches.matchs.matchsPlayed.away }}</td>
                                  <td>{{ detail.teams.home.all_last_matches.matchs.matchsPlayed.total }}</td>
                              </tr>
                          </tbody>
                      </table>
                        <h3 class="text-center" style="color:Red">Matches Won</h3>
                     <table class="table table-condensed table-hover table-bordered">
                         <tr>
                             <th>Home</th>
                             <th>Away</th>
                             <th>Total</th>
                         </tr>
                         <tr>
                             <td>{{detail.teams.home.all_last_matches.matchs.wins.home }}  </td>
                             <td>{{detail.teams.home.all_last_matches.matchs.wins.away }}  </td>
                             <td>{{detail.teams.home.all_last_matches.matchs.wins.total }}  </td>
                         </tr>
                     </table>
                     </div>
                     <!-- {{ detail.teams.home.all_last_matches }} -->
                  </div>
                   <div class="col-sm-6">
                   <h2>Away Team</h2>
                  <span>Team Name:    {{ detail.teams.away.team_name }}</span>
                     <div class="container">
                         <h3>Last 5 Matched</h3>
                         <table class="table table-condensed table-hover table-bordered table-responsive">
                             <thead>
                                 <tr>
                                     <th>Forme</th>
                                     <th>Att</th>
                                     <th>Def</th>
                                     <th>Goals</th>
                                     <th>Avg. Goals</th>
                                     <th>Goals Against</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 <tr>
                                     <td>  {{ detail.teams.away.last_5_matches.forme }}</td>
                                     <td>  {{ detail.teams.away.last_5_matches.att }}</td>
                                     <td>  {{ detail.teams.away.last_5_matches.def }}</td>
                                     <td>  {{ detail.teams.away.last_5_matches.goals }}</td>
                                     <td>  {{ detail.teams.away.last_5_matches.goals_avg }}</td>
                                     <td>  {{ detail.teams.away.last_5_matches.goals_against }}</td>
                                 </tr>
                             </tbody>
                         </table>
                        <h6 class="text-center">Goals Against Average: {{ detail.teams.away.last_5_matches.goals_against_avg }}</h6>
                           <h3 class="text-center" style="color:red">{{detail.teams.away.team_name}} Matches Played</h3>
                        <table class="table">
                          <thead>
                              <tr>
                                  <th>Home</th>
                                  <th>Away</th>
                                  <th>Total</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>{{ detail.teams.away.all_last_matches.matchs.matchsPlayed.home }}</td>
                                  <td>{{ detail.teams.away.all_last_matches.matchs.matchsPlayed.away }}</td>
                                  <td>{{ detail.teams.away.all_last_matches.matchs.matchsPlayed.total }}</td>
                              </tr>
                          </tbody>
                      </table>
                     </div>
                     <h3 class="text-center" style="color:Red">Matches Won</h3>
                     <table class="table table-condensed table-hover table-bordered">
                         <tr>
                             <th>Home</th>
                             <th>Away</th>
                             <th>Total</th>
                         </tr>
                         <tr>
                             <td>{{detail.teams.away.all_last_matches.matchs.wins.home }}  </td>
                             <td>{{detail.teams.away.all_last_matches.matchs.wins.away }}  </td>
                             <td>{{detail.teams.away.all_last_matches.matchs.wins.total }}  </td>
                         </tr>
                     </table>

                     <!-- {{ detail.teams.home.all_last_matches }} -->
                  </div>
                  <div class="col-sm-6">
                   <div class="row">
                         <div class="col-sm-5 text-center">
                          <img :src="detail.h2h[0].homeTeam.logo" width="100px">
                    <h4>  {{ detail.h2h[0].homeTeam.team_name }}</h4>
                     </div>
                     <div class="col-sm-2 text-center">
                         <h1 style="color:red">VS</h1>
                     </div>
                     <div class="col-sm-5 text-center">
                          <img :src="detail.h2h[0].awayTeam.logo" width="100px">
                    <h4>  {{ detail.h2h[0].awayTeam.team_name }}</h4>
                     </div>
                     <h4 class="text-center" style="color:red">Prediction: <u>{{detail.advice}}</u></h4>
                   </div>
                      <!-- {{ detail.h2h[0].awayTeam }} -->

                  </div>
              </div>
            </div>
        </div>
        <div class="col-sm-4">
            <h2>Leagues</h2>
                        <table  class="table table-hover table-condensed table-bordered">
                <thead>
                    <tr>
                        <th>Flag</th>
                        <th>Country</th>
                        <th>League</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="league in leagues" :key="league.id">
                        <td><img :src="league.logo" width="30px"></td>
                        <td>{{league.country}}</td>
                        <td>{{league.name}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            details:[],
             leagues:{},
        }
    },
    methods:{
         loadLeagues(){
         axios.get('/All/Leagues').then((data)=>{
             this.leagues=data.data.data

             //if the fetch is successful
         })
       },
        loadDetails(){
            axios.get('/Latest/Data').then((response)=>{
                this.details=response.data.latest.data;
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    created(){
        this.loadDetails(),
        this.loadLeagues()
    }
}
</script>
