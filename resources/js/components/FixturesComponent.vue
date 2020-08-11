<template>
    <div class="row" style="margin-top:70px">
<div class="col-sm-9">
    <div class="table-responsive">
        <h2 class="text-center">Todays Games</h2>
        <table class="table table-condensed table-active table-hover" style="font-size:12px">
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
                <tr v-for="fixture in fixtures" :key="fixture.id">
                    <!-- <td><img :src="fixture.homeFlag" width="30px"> {{fixture.home}} vs </td> -->
                    <td> <img :src="fixture.flag" width="30px"> </td>
                    <td>{{fixture.home}} <b style="color:red">VS</b>  {{fixture.away}}</td>
                    <td>{{fixture.league}}</td>
                    <td>{{fixture.venue}}</td>
                    <td>{{fixture.country}}</td>
                    <td>{{fixture.date}}</td>
                </tr>
            </tbody>
        </table>
    </div>
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
            fixtures:{},
            leagues:{}
        }
    },
    methods:{
        loadFixtures(){
            axios.get('/Todays/Games').then(
                 ({
                        data
                    })=>(this.fixtures=data)
            )
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