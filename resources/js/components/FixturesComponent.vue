<template>
    <div class="row" style="margin-top:70px">
        <ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6177716716878978"
     data-ad-slot="2161762392"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<div class="col-sm-9">
            <div class="table-responsive datagrid">
          <h2 class="text-center">  Todays Games</h2>
                                <table class="table">
                                    <thead>
                                        <tr>
                                                <th style="color:white !important">Flag</th>
                                                <th style="color:white !important">Teams</th>
                                                <th style="color:white !important">League</th>
                                                <th style="color:white !important">Venue</th>
                                                <th style="color:white !important">Country</th>
                                                <th style="color:white !important">KickOff</th>
                                            </tr>
                                    </thead>
                                    <tbody>
                <tr v-for="fixture in fixtures" :key="fixture.id">
                    <!-- <td><img :src="fixture.homeFlag" width="30px"> {{fixture.home}} vs </td> -->
                    <td  @click="Predict(fixture.fixture_id)"> <img :src="fixture.flag" width="30px"> </td>
                    <td  @click="Predict(fixture.fixture_id)">{{fixture.home}} <b style="color:red">VS</b>  {{fixture.away}}</td>
                    <td  @click="Predict(fixture.fixture_id)">{{fixture.league}}</td>
                    <td  @click="Predict(fixture.fixture_id)">{{fixture.venue}}</td>
                    <td   @click="Predict(fixture.fixture_id)">{{fixture.country}}</td>
                    <td  @click="Predict(fixture.fixture_id)">{{fixture.date}}</td>
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
            fixtures:{},
            leagues:{}
        }
    },
    methods:{
        Predict(id){
            axios.get('predictions/'+id).then((data)=>{
                console.log(data)
            }).catch((error)=>{
                console.log(error)
            })
        },
        loadFixtures(){
            axios.get('/Todays/Games').then((data)=>{
                this.fixtures=data.data
                console.log(data)
            }).catch();
        },
         loadLeagues(){
         axios.get('/All/Leagues').then((data)=>{
             this.leagues=data.data.data

             //if the fetch is successful
         })
       },
    },
    created(){
        this.loadFixtures()
        this.loadLeagues()
    }
}
</script>
