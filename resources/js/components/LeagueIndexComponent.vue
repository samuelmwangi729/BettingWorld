<template>
<div class="container-fluid table-responsive">
        <div class="row" style="margin-top:100px;color:white;background:linear-gradient(90deg, #a8c0ff 0%,#3f2b96 100% );">
        <div class="col-sm-5 table-responsive">
          <h2 class="text-center" style="color:white !important">  Leagues</h2>
            <table  class="table table-hover table-condensed table-bordered">
                <thead>
                    <tr>
                        <th style="color:white !important">Flag</th>
                        <th style="color:white !important">Country</th>
                        <th style="color:white !important">LeagueName</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="league in leagues" :key="league.id">
                        <td style="color:white !important"><img :src="league.logo" width="30px"></td>
                        <td style="color:white !important">{{league.country}}</td>
                        <td style="color:white !important">{{league.name}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-sm-7 table-responsive">
         <h2 class="text-center"> Top GamesToday</h2>
         <table  class="table table-hover table-condensed table-bordered">
                <thead>
                    <tr>
                        <th style="color:white !important">Flag</th>
                        <th style="color:white !important">Teams</th>
                        <th style="color:white !important">League</th>
                        <th style="color:white !important">Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="game in games" :key="game.id">
                        <td><img :src="game.flag" width="30px"></td>
                        <td style="font-size:10px;color:white !important">{{game.home}} <b style="color:white">Vs</b> {{game.away}}</td>
                        <td style="font-size:10px;color:white !important">{{game.league}}</td>
                        <td style="font-size:10px;color:white !important">{{game.date}}</td>
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
            leagues:{},
            games:{}
        }
    },
    methods:{
       loadLeagues(){
         axios.get('/All/Leagues').then((data)=>{
             this.leagues=data.data.data
             
             //if the fetch is successful
         })
       },
        loadHot(){
         axios.get('/Top/Games').then((data)=>{
             this.games=data.data
            //  console.log(data.data)
             //if the fetch is successful
         })
       }

    },
    created(){
        this.loadHot()
        this.loadLeagues()
    }
}
</script>