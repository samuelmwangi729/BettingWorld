<template>
<div class="container-fluid table-responsive">
        <div class="row" style="margin-top:100px;color:white;background:linear-gradient(90deg, #a8c0ff 0%,#3f2b96 100% );">
        <div class="col-sm-5 table-responsive">
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
        <div class="col-sm-7 table-responsive">
         <h2 class="text-center"> Top GamesToday</h2>
         <table  class="table table-hover table-condensed table-bordered">
                <thead>
                    <tr>
                        <th>Flag</th>
                        <th>Teams</th>
                        <th>League</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="game in games" :key="game.id">
                        <td><img :src="game.flag" width="30px"></td>
                        <td style="font-size:10px">{{game.home}} <b>Vs</b> {{game.away}}</td>
                        <td style="font-size:10px">{{game.league}}</td>
                        <td style="font-size:10px">{{game.date}}</td>
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