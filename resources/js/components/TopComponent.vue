<template>
    <div class="row" style="background:linear-gradient(90deg, #1a2a6c 0%,#b21f1f 50%,#fdbb2d 100% );color:white">
        <div class="col-sm-9 table-responsive">
          <h2 class="text-center">Top Games Today</h2>
          <table class="table table-condensed table-hover table-bordered">
              <thead>
                  <tr>
                     <th>
                        Flag
                    </th>
                    <th>
                        Teams
                    </th>
                    <th>
                        League
                    </th>
                    <th>
                        Venue
                    </th>
                     <th>
                        Country
                    </th>
                    <th>
                        KickOff
                    </th>
                </tr>
              </thead>
               <tbody>
                <tr v-for="fixture in games" :key="fixture.id">
                    <!-- <td><img :src="fixture.homeFlag" width="30px"> {{fixture.home}} vs </td> -->
                    <td @click="Predict(fixture.fixture_id)"> <img :src="fixture.flag" width="30px"> </td>
                    <td @click="Predict(fixture.fixture_id)">{{fixture.home}} <b style="color:red">VS</b>  {{fixture.away}}</td>
                    <td @click="Predict(fixture.fixture_id)">{{fixture.league}}</td>
                    <td @click="Predict(fixture.fixture_id)">{{fixture.venue}}</td>
                    <td @click="Predict(fixture.fixture_id)">{{fixture.country}}</td>
                    <td @click="Predict(fixture.fixture_id)">{{fixture.date}}</td>
                </tr>
            </tbody>
          </table>
        </div>
        <div class="col-sm-3">
         <h2 class="text-center">Leagues</h2>
    <table  class="table table-hover table-condensed table-bordered">
                <thead>
                    <tr>
                        <th>Flag</th>
                        <th>Country</th>
                        <th>league</th>
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
            games:[],
            leagues:[]
        }
    },
    methods:{
        loadGames(){
            axios.get('/OnlyTop').then((response)=>{
                this.games=response.data
            }).catch((err)=>{
                console.log(err)
            })
        },
        loadLeagues(){
             axios.get('/All/Leagues').then((data)=>{
             this.leagues=data.data.data
             
             //if the fetch is successful
         })
        },
        Predict(id){
           axios.get('/predictions/'+id).then((data)=>{
               let latestData=data.data
               axios.post('/LatestData',{
                   data:latestData
               }).then((response)=>{
                  window.open('/Match/Highlights','_parent');
               }).catch((err)=>{
                   console.log(err)
               })
            }).catch((error)=>{
                console.log(error)
            })
        }
    },
    created(){
        this.loadGames()
      this.loadLeagues()
    }
}
</script>