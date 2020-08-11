<template>
    <div class="container">
        <table class="table table-hover table-condensed">
       <thead>
           <tr>
               <th>
                   League Name
               </th>
               <th>Country</th>
               <th>Flag</th>
               <th>Session</th>
               <th>End Session</th>
           </tr>
       </thead>
   </table>
    </div>
</template>
<script>
export default{
    data(){
        return{
            leagues:{},
            token:''
        }
    },
    methods:{
        loadLeagues(){
             axios.get('https://api-football-v1.p.rapidapi.com/leagues', {
                headers: {
                    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                    "x-rapidapi-key": "ba38e4e931msh8cbd07b515ed9a0p15c2c5jsn87707fbad3c8"
                }
                }).then(({data})=>(
                    this.leagues=data.api.leagues,
                      this.PostData(this.leagues,data.api.results)              
                ));
                 
        },
        PostData(games,length){
            for(let i=1;i<=length;i++){
                let name=games[i].name;
                if(name===undefined){
                    name=''
                }
                axios.post('/Api/Leagues/Post',{
                         _token: this.token,
                        name:name,
                        country:games[i].country,
                        season:games[i].season,
                        start_season:games[i].season_start,
                        end_season:games[i].season_end,
                        logo:games[i].logo
                }).then((response)=>{
                    //when they have been updated
                    console.log('Data Successfully Saved');
                })
            }
        }
    },
    created(){
        this.loadLeagues()
    },
    mounted(){
           this.token= $('meta[name="csrf-token"]').attr('content')
    }
}
</script>