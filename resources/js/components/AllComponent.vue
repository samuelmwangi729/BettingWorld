<template>
<div class="row">
   <div class="col-sm-8 table-responsive">
       <h2>Predicted Games</h2>
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
   <div class="col-sm-4">
       <h2 class="text-center">  Leagues</h2>
        <table  class="table table-hover table-condensed table-bordered">
            <thead>
                <tr>
                    <th>Flag</th>
                    <th>Country</th>
                    <th>LeagueName</th>
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
            games:{},
            leagues:{}
        }
    },
    methods:{
        loadLeagues(){
            axios.get('/All/Leagues').then((data)=>{
                this.leagues=data.data.data
                console.log('Done')
                //if the fetch is successful
            })
        },
        loadGames(){
            axios.get('/Predicted/Games/All').then((response)=>{
                this.games=response.data
                // console.log(response.data)
            }).catch((err)=>{
                console.log(err)
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