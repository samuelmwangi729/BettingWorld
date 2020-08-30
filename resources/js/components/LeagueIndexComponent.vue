<template>
<div class="container-fluid table-responsive">
        <div class="row">
        <div class="col-sm-5 table-responsive">
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
        <div class="col-sm-7 table-responsive">
         <div class=" datagrid">
                <h2 class="text-center">Today Top Games</h2>
            <table class="table">
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
                        <td style="font-size:10px!important">{{game.home}}
                         <b>Vs</b> {{game.away}}</td>
                        <td style="font-size:10px!important">{{game.league}}</td>
                        <td style="font-size:10px !important">{{game.date}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
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
