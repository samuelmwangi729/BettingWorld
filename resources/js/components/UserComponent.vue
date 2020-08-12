<template>
    <div class="row">
        <div class="col-sm-8">
            <h2 class="text-center">Today Free Games</h2>
            <table class="table table-condensed table-hover table-bordered" style="font-size:10px">
                <thead>
                    <tr>
                        <th>League</th>
                        <th>Kick Off</th>
                        <th>Home Team</th>
                        <th>Away Team</th>
                        <th>Pick</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="game in games" :key="game.id">
                        <td>{{game.League}}</td>
                        <td>{{game.KickOff}}</td>
                        <td>{{game.HomeTeam}}</td>
                        <td>{{game.AwayTeam}}</td>
                        <td>{{game.Pick}}</td>
                    </tr>
                </tbody>
            </table>
            <!--Second Table-->
            <!--Check if the user is Subscribed-->
            <div v-if="isSub==false">
                <!--if the user is not subscribed-->
                <div class="alert alert-danger">
                    <a href="#" class="close" data-dismiss="alert">&times;</a>
                    {{ message }}
                </div>
            </div>
            <div v-else>
             <h2> Finally Premium Games Here</h2>
              <table class="table">
                       <thead>
                           <tr>
                            <th>League</th>
                            <th>Time</th>
                            <th>Time</th>
                            <th>Pick</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr v-for="game in premium" :key="game.id">
                                <td>{{game.League}}</td>
                                <td>{{game.HomeTeam}}</td>
                                <td>{{game.AwayTeam}}</td>
                                <td>{{game.Pick}}</td>
                           </tr>
                       </tbody>
                   </table>
            </div>
        </div>         
        <!--Start col-sm-4-->   
        <div class="col-sm-4">
            <div class="row-fluid">
                <h2 class="text-center">Leagues</h2>
                <ul class="list-group" v-for="league in leagues" :key="league.id">
                      <li class="list-group-item">
                          <img :src="league.logo" width="30px"><span class="pull-right"> {{ league.name }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            games:[],
            leagues:[],
            isSub:'',
            message:'',
            premium:[]
        }
    },
    methods:{
         loadPremium(){
                axios.get('Premium/Games').then(({data})=>(
                    this.premium=data,
                    console.log(data)
                    ))
            },
        loadFree(){
            axios.get('/Frees/Games').then((data)=>{
                this.games=data.data;
                // console.log(data.data)
            }).catch((error)=>{
                console.log(error)
            })
        },
        loadLeague(){
            axios.get('/Some/Leagues').then((data)=>{
                this.leagues=data.data.data
            })
        },
        checkSub(){
            axios.get('/isSub').then((data)=>{
                if(data.data[0]=='message'){
                    this.message=data.data[1],
                    console.log(data.data[1])
                    this.isSub=false
                }else{
                     this.isSub=true
                }
               
            })
        }
    },
    created(){
        this.loadFree()
        this.loadLeague()
        this.checkSub()
        this.loadPremium()
    }
}
</script>