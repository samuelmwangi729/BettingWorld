<template>
    <div class="row">
        <ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6177716716878978"
     data-ad-slot="2161762392"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
        <div class="col-sm-9 table-responsive">
         <div class=" datagrid">
                <h2 class="text-center">Today Highly Analysed Predicted Games Games</h2>
                <marquee style="color:red !important">(click On the Game to view Predictions)</marquee>
            <table class="table">
                <thead>
                    <tr>
                            <th style="color:white !important">Flag</th>
                            <th style="color:white !important">Teams</th>
                            <th style="color:white !important">League</th>
                            <th style="color:white !important">venue</th>
                            <th style="color:white !important">Time</th>
                            <th style="color:white !important">Date</th>
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
        </div>
        <div class="col-sm-3">
                <div class="table-responsive datagrid">
                <h2 class="text-center">Leagues</h2>
            <table class="table">
                <thead>
                    <tr>
                            <th style="color:white !important">Flag</th>
                            <th style="color:white !important">Country</th>
                            <th style="color:white !important">League</th>
                        </tr>
                </thead>
                <tbody>
                <tr v-for="league in leagues" :key="league.id">
                    <td ><img :src="league.logo" width="30px"></td>
                    <td >{{league.country}}</td>
                    <td >{{league.name}}</td>
                </tr>
            </tbody>
            </table>
            </div>
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
