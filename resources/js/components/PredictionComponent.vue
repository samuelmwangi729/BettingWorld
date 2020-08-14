<template>
    <div class="row" style="margin-top:70px">
        <div class="col-sm-10">
         Games Not Predicted
         <table class="table table-hover table-condensed table-bordered">
             <thead>
                 <tr>
                     <td>Flag</td>
                     <td>League</td>
                     <td>Game</td>
                     <td>Action</td>
                 </tr>
             </thead>
             <tbody>
                 <tr v-for="game in games" :key="game.id">
                     <td>
                         <img :src="game.flag" width="20px">
                     </td>
                     <td>
                         {{ game.league }}
                     </td>
                     <td>
                       <img :src="game.homeFlag" width="20px">&nbsp; {{ game.home }}  V.s   <img :src="game.awayFlag" width="20px">&nbsp; {{ game.away }}
                     </td>
                     <td>
                       <span v-if="game.Status==1">
                           <div class="btn btn-warning">
                               Prediction Exists
                           </div>
                       </span>
                       <span v-else>
                             <button class="btn btn-success" @click="loadPrediction(game.fixture_id)">Get Predictions</button>
                       </span>
                     </td>
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
            predictions:{},
            games:[],
            token:'',
            fixture_id:''
        }
    },
    methods:{
        loadGames(){
             axios.get('/Todays/Games').then((data)=>{
               this.games=data.data;
             })
        },
        loadPrediction(id){
            //first load the games from the dataase 
                             axios.get('https://api-football-v1.p.rapidapi.com/v2/predictions/'+id,{
                        headers: {
                        //send headers
                        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                        "x-rapidapi-key": "ba38e4e931msh8cbd07b515ed9a0p15c2c5jsn87707fbad3c8",
                        "useQueryString": true
                    }
                    }).then((data)=>{
                        //this is the prediction object
                        data.data.api.predictions.forEach(element => {
                            let token=this.token;
                            let fixture=id;
                            let advice=element.advice;
                            let win=element.winning_percent;
                            let teams=element.teams;
                            let h2h=element.h2h;
                            axios.post('/predictions',{
                              _token:token,
                            fixture_id:fixture,
                            advice:advice,
                            win_percent:win,
                            teams:teams,
                            h2h:h2h,
                          }).then((data)=>{
                              //after the data is posted, then update the fixture in the fixtures table 
                              //send a get request 
                            axios.get('/predict/game/'+id).then((response)=>{
                               this.loadGames()
                               console.log(response)
                            }).catch((response)=>{
                                console.log(response.data)
                            })
                          })
                          
                        });
                    }).catch((error)=>{
                        //in case of any error 
                        console.log(error)
                    })
           
        }
    },
    created(){
          this.token= $('meta[name="csrf-token"]').attr('content'),
          this.loadGames()
    }
}
</script>