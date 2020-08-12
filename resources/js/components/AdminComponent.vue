<template>
    <div class="container">
    <h1 class="text-center" style="color:red;font-family:'monospace"> All Incomplete  Games</h1>
        <div class="table-responsive">
            <table class="table table-condensed table-hover table-bordered" style="font-size:10px">
                <thead>
                    <tr>
                        <th>League</th>
                        <th>Kick Off</th>
                        <th>Home Team</th>
                        <th>Away Team</th>
                        <th>Pick</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="game in games" :key="game.id">
                        <td>{{game.League}}</td>
                        <td>{{game.KickOff}}</td>
                        <td>{{game.HomeTeam}}</td>
                        <td>{{game.AwayTeam}}</td>
                        <td>{{game.Pick}}</td>
                        <td>
                            <span v-if="game.Type==1">
                               <div class="badge badge-success">
                                    Paid
                               </div>
                            </span>
                            <span v-else>
                                <div class="badge badge-success">
                                    Paid
                                </div>
                            </span>
                        </td>
                        <td>
                            <button class="btn btn-success btn-sm" @click="Won(game.id)">Won</button>
                            <button class="btn btn-info btn-sm" @click="Suspended(game.id)">Suspended</button>
                            <button class="btn btn-danger btn-sm" @click="Lost(game.id)">Lost</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h1 class="text-center" style="color:red;font-family:'monospace"> All Complete  Games</h1>
        <div class="table-responsive">
            <table class="table table-condensed table-hover table-bordered" style="font-size:10px">
                <thead>
                    <tr>
                        <th>League</th>
                        <th>Kick Off</th>
                        <th>Home Team</th>
                        <th>Away Team</th>
                        <th>Pick</th>
                        <th>OutCome</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="game in completed" :key="game.id">
                        <td>{{game.League}}</td>
                        <td>{{game.KickOff}}</td>
                        <td>{{game.HomeTeam}}</td>
                        <td>{{game.AwayTeam}}</td>
                        <td>{{game.Pick}}</td>
                        <td>
                            <span v-if="game.OutCome==1">
                                <div class="badge badge-success">
                                    Won
                                </div>
                            </span>
                            <span v-if="game.OutCome==2">
                                <div class="badge badge-warning">
                                    Suspended
                                </div>
                            </span>
                            <span v-if="game.OutCome==3">
                                <div class="badge badge-danger">
                                    Lost
                                </div>
                            </span>
                        </td>
                        <td>
                            <span v-if="game.Type==0">
                               <div class="badge badge-success">
                                    Paid
                               </div>
                            </span>
                            <span v-else>
                                <div class="badge badge-success">
                                    Paid
                                </div>
                            </span>
                        </td>
                        <td>
                            <button class="btn btn-success btn-sm" @click="Won(game.id)">Won</button>
                            <button class="btn btn-info btn-sm" @click="Suspended(game.id)">Suspended</button>
                            <button class="btn btn-danger btn-sm" @click="Lost(game.id)">Lost</button>
                            <button class="btn btn-secondary btn-sm" @click="Reset(game.id)">Reset</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
           <h1 class="text-center" style="color:red;font-family:'monospace">Manage System Dates</h1>
            <span v-if="isSuccess=='success'">
                <div class="alert alert-success" id="alert">
                    <a href="#" class="close" data-dismiss="alert" @click="hide">
                        &times;
                    </a>
                    <strong>Data Successfully Uploaded</strong>
                </div>
            </span>
            <span v-else></span>
            <span v-if="isSuccess=='danger'">
                <div class="alert alert-danger" id="alert">
                    <a href="#" class="close" data-dismiss="alert" @click="hide">
                        &times;
                    </a>
                    <strong>Data Successfully Deleted</strong>
                </div>
            </span>
             <span v-if="isSuccess=='updated'">
                <div class="alert alert-warning" id="alert">
                    <a href="#" class="close" data-dismiss="alert" @click="hide">
                        &times;
                    </a>
                    <strong>Match Successfully Updated</strong>
                </div>
            </span>
        <div class="row">
            <div class="col-sm-8">
                <div class="card">
                    <div class="form">
                        <form method="POST" @submit.prevent="Submit">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="Day" class="label-control">
                                            <i class="fa fa-sun ml-2 mt-3">
                                                Day
                                            </i>
                                        </label>
                                        <select class="form-control mr-2" name="Day" v-model="Day">
                                            <option label="Select The Day"></option>
                                            <option value="Yesterday">Yesterday</option>
                                            <option value="Today">Today</option>
                                            <option value="Tomorrow">Tomorrow</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label class="label-control" for="Date">
                                            <i class="fa fa-calendar ml-2 mt-3">
                                                Date
                                            </i>
                                        </label>
                                        <input type="date" class="form-control mr-3" name="Date" v-model="Date">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6 offset-sm-5">
                                    <button class="btn btn-success mb-2" type="submit"><i class="fa fa-check-circle"></i>Submit Dates</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <h2 class="text-right">Available System Dates</h2>
                <table class="table table-hover table-condensed table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="setting in settings" :key="setting.id">
                            <td>{{setting.Day}}</td>
                            <td>{{setting.Date}}</td>
                            <td><button class="btn btn-sm btn-danger" @click="Delete(setting.id)">Delete</button></td>
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
            games:{},
            token:'',
            Date:'',
            Day:'',
            isSuccess:'',
            settings:[],
            completed:[]
        }
    },
    methods:{
        Delete(id){
            axios.delete('/settings/'+id).then((response)=>{
                console.log(response.data),
                  this.loadSettings()
                   if(response.data.message=='danger'){
                       this.isSuccess='danger'
                   }
            }).catch((response)=>{
                console.log(response)
            })
        },
        loadGames(){
            axios.get('/AllTheGamez').then((data)=>{
                this.games=data.data
            })
        },
        Won(id){
            axios.get('/games/'+id).then((response)=>{
                this.isSuccess='updated';
                  this.loadGames();
                  this.loadComplete();
            }).catch((response)=>{
                console.log(response.data)
            })
        },
        Suspended(id){
          axios.get('/Suspend/'+id).then((response)=>{
              console.log(response)
                  this.loadGames();
                  this.loadComplete();
            }).catch((response)=>{
                console.log(response.data)
            })
        },
        Reset(id){
          axios.get('/Reset/'+id).then((response)=>{
              console.log(response)
                  this.loadGames();
                  this.loadComplete();
            }).catch((response)=>{
                console.log(response.data)
            })
        },
        Lost(id){
            axios.get('/Games/Lost/'+id).then((response)=>{
                console.log(response)
                this.loadComplete();
                this.loadGames();
            }).catch((response)=>{
                console.log(response)
            })
        },
        Submit(){
            this.token= $('meta[name="csrf-token"]').attr('content'),
           axios.post('/settings',{
               _token:this.token,
               Date:Date,
               Day:this.Day
           }).then((response)=>{
               if(response.data.message=='success'){
                     this.loadSettings()
                   this.isSuccess='success'
               }else{
                   this.isSuccess=='false'
               }
           })
        
        },
        hide:()=>{
            let alert=document.getElementById('alert');
            alert.hide()
        },
        loadSettings(){
            axios.get('/settings').then((data)=>{
                this.settings=data.data,
                console.log(data.data)
            })
        },
        loadComplete(){
            axios.get('/Complete').then((response)=>{
                this.completed=response.data
            }).catch((response)=>{
                console.log(response)
            })
        }
    },
    created(){
      this.loadSettings();
      this.loadComplete();
       this.loadGames();
    }
}
</script>