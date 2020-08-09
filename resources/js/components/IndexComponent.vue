<template>
   <div class="container-fluid">
       <div class="card text-center" style="margin-top:30px">
           <blockquote class="blockquote">
               Gamblers Don't Have Enough Money. Bet Responsibly
               <cite class="blockquote-footer" style="font-weight:bold">BettingWorld</cite>
           </blockquote>
       </div>
       <div class="row" style="font-size:10px !important;">
           <div class="col-sm-9">
              <div class="row"  style="background:linear-gradient(90deg, #1a2a6c 0%,#b21f1f 50%,#fdbb2d 100% );color:white">
                  <div class="col-sm-6">
                         <h3 class="text-center" style="color:white;font-weight:bold;font-size:10px;padding-top:10px">Todays Free  (Over 1.5) Games</h3>
                      <!--StartFree Games Table-->
                        <table class="table table-condensed table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Game</th>
                            <th>League</th>
                            <th>Time</th>
                            <th>Pick</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="game in games" :key="game.id">
                            <td>{{game.HomeTeam}} <span style="color:red">vs</span> {{game.AwayTeam}}</td>
                            <td>{{game.League}}</td>
                            <td>{{game.KickOff}}</td>
                            <td>{{game.Pick}}</td>
                        </tr>
                    </tbody>
                </table>
                <!-- End free games table -->
                  </div>
                  <!--End COl-sm-6-->
                  <div class="col-sm-6">
                         <h3 class="text-center" style="color:white;font-weight:bold;font-size:10px;padding-top:10px">Todays Free  (under 1.5) Games</h3>

                        <table class="table table-condensed table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Game</th>
                            <th>League</th>
                            <th>Time</th>
                            <th>Pick</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="game in under" :key="game.id">
                            <td>{{game.HomeTeam}} <span style="color:red">vs</span> {{game.AwayTeam}}</td>
                            <td>{{game.League}}</td>
                            <td>{{game.KickOff}}</td>
                            <td>{{game.Pick}}</td>
                        </tr>
                    </tbody>
                </table>
                <!-- End free games table -->
                  </div>
              </div>
              <!--Another table for free games-->
                            <div class="row"  style="background:linear-gradient(90deg, #1a2a6c 0%,#b21f1f 50%,#fdbb2d 100% );color:white">
                  <div class="col-sm-6">
                         <h3 class="text-center" style="color:white;font-weight:bold;font-size:10px;padding-top:10px">Todays Free  (HTFT DRAW) Games</h3>
                      <!--StartFree Games Table-->
                        <table class="table table-condensed table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Game</th>
                            <th>League</th>
                            <th>Time</th>
                            <th>Pick</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="game in Draws" :key="game.id">
                            <td>{{game.HomeTeam}} <span style="color:red">vs</span> {{game.AwayTeam}}</td>
                            <td>{{game.League}}</td>
                            <td>{{game.KickOff}}</td>
                            <td>{{game.Pick}}</td>
                        </tr>
                    </tbody>
                </table>
                <!-- End free games table -->
                  </div>
                  <!--End COl-sm-6-->
                  <div class="col-sm-6">
                         <h3 class="text-center" style="color:white;font-weight:bold;font-size:10px;padding-top:10px">Todays Free  Over 2.5) Games</h3>
                        <table class="table table-condensed table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Game</th>
                            <th>League</th>
                            <th>Time</th>
                            <th>Pick</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="game in overs" :key="game.id">
                            <td>{{game.HomeTeam}} <span style="color:red">vs</span> {{game.AwayTeam}}</td>
                            <td>{{game.League}}</td>
                            <td>{{game.KickOff}}</td>
                            <td>{{game.Pick}}</td>
                        </tr>
                    </tbody>
                </table>
                <!-- End free games table -->
                  </div>
              </div>
           </div>
           <!--End Col-sm-8-->
           <div class="col-sm-3">
                <h3 class="text-center" style="color:red;font-size:14px;margin-top:10px;font-weight:bold">VIP GAMES</h3>
                   <table class="table">
                       <thead>
                           <tr>
                               <th>Game</th>
                               <th>League</th>
                               <th>Tip</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr v-for="game in premium" :key="game.id">
                               <td>{{game.HomeTeam}}</td>
                               <td>{{game.League}}</td>
                               <td style="color:red">&block;&block;&block;&block;&block;</td>
                           </tr>
                       </tbody>
                   </table>
               <div class="text-center">                   
                    <span>
                       Kindly Register <a href="/register">Here</a> To access vip tips
                   </span>
               </div>
           </div>
           <!--End cloacked premium tips-->
       </div>
        <div class="row">
        <div class="col-sm-9">
               <div class="row">
                   <div class="col-sm-6" style="background:linear-gradient(90deg, #ad5389 0%,#3c1053 100% );color:white">
                        <h3 class="text-center" style="color:white;font-weight:bold;font-size:10px;padding-top:10px">Yesterday Games</h3>
                        <table class="table table-condensed table-bordered table-hover">
                            <thead>
                                <tr style="font-size:10px">
                                    <th>Game</th>
                                    <th>League</th>
                                    <th>Time</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody  style="font-size:10px">
                                <tr v-for="game in completedGames" :key="game.id">
                                    <td>{{game.HomeTeam}} <span style="color:red">vs</span> {{game.AwayTeam}}</td>
                                    <td>{{game.League}}</td>
                                    <td>{{game.KickOff}}</td>
                                     <td style="color:green;font-size:20px" class="text-center"><span style="background-color:white">&check;</span></td>
                                </tr>
                            </tbody>
                        </table>
                   </div>
                   <!-- End of completed Games -->
                   <!-- Start Yesterdays Games -->
                    <div class="col-sm-6" style="background:linear-gradient(90deg, #333333 0%,#dd1818 100% );color:white">
                        <h3 class="text-center" style="color:white;font-weight:bold;font-size:10px;padding-top:10px">Completed Games</h3>
                        <table class="table table-condensed table-bordered table-hover">
                            <thead>
                                <tr style="font-size:10px">
                                    <th>Game</th>
                                    <th>League</th>
                                    <th>Time</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody  style="font-size:10px">
                                <tr v-for="game in completedGames" :key="game.id">
                                    <td>{{game.HomeTeam}} <span style="color:red">vs</span> {{game.AwayTeam}}</td>
                                    <td>{{game.League}}</td>
                                    <td>{{game.KickOff}}</td>
                                    <td style="color:green;font-size:20px" class="text-center"><span style="background-color:white">&check;</span></td>
                                </tr>
                            </tbody>
                        </table>
                   </div>
               </div>

                <!-- End free games table -->
           </div>
           <div class="col-sm-3 justify-content-center">
               <h3 class="text-center" style="color:red;font-weight:bold">About Us</h3>
            <div class="container text-center">
               <img class="card-img-top" src="https://bettingworld.co.ke/dist/img/logo.jpg" alt="BettingWorld" style="width:150px;float:center;border-radius:70px">
            </div>
            We offer the 
            most well known football wagering tips day by day  giving you motivation to come back to
           Us. Gain admittance to our free improvement score tips, best HT/FT expectations and combo tips.
           <h6 class="text-center">We Give Premium Tips In</h6>
            <ul style="list-style:none;color:purple;background:linear-gradient(90deg, #ffdb00 30%,#ff0303 75% );">
                <li class="list-item">Sure Bets</li>
                <li class="list-item">HT/FT</li>
                <li class="list-item">Correct Score</li>
                <li class="list-item">Combos</li>
                <li class="list-item">Jackpots 
                <sup>  <div class="badge badge-success">New</div></sup>
                </li>
            </ul>
           </div>
        </div> 
        <footer class="row" style="color:purple;background:linear-gradient(90deg, #ffdb00 30%,#ff0303 75% );">
<div class="col-sm-4 text-center">
                     <h5><u>Brief</u></h5>
                     We provide Selected Soccer betting Tips and predictions. You probably would need to pick at most 3 games and stake highly. 99% chances of winning guaranteed.
         We also  aim to promote responsibility in gambling. We provide information to help you make informed decisions about your gambling.
                </div>
                 <div class="col-sm-4 text-center">
                    <h5><u>Quick links</u></h5>
                    <ul class="list-unstyled quick-links" style="font-weight:bold; !important">
                        <li><a href="javascript:void(0)" style="color:purple">Home</a></li>
                        <li><a href="javascript:void(0)" style="color:purple">About</a></li>
                        <li><a href="javascript:void(0)" style="color:purple">Livescore</a></li>
                        <li><a href="javascript:void(0)" style="color:purple">Match Results</a></li>
                        <li><a href="javascript:void(0)" style="color:purple">JackPots</a></li>
                    </ul>
                </div>
                 <div class="col-sm-4 text-center">
                    <h5><u>Tips</u></h5>
                    <ul class="list-unstyled quick-links" style="font-weight:bold">
                        <li><a href="javascript:void(0)" style="color:purple">HT/FT</a></li>
                        <li><a href="javascript:void(0)" style="color:purple">Asian Handicap</a></li>
                        <li><a href="javascript:void(0)" style="color:purple">Correct Score</a></li>
                        <li><a href="javascript:void(0)" style="color:purple">Combos</a></li>
                    </ul>
                </div>
            <!-- End footer row-->
            <div class="container justify-content-center">
                <!--Start Social Icons-->
                <ul class="list-unstyled list-inline social">
                    <li class="list-inline-item" style="padding-left:30px"><a href="javascript:void(0)"><i class="fab fa-facebook"></i></a></li>
                    <li class="list-inline-item"><a href="javascript:void(0)"><i class="fab fa-twitter"></i></a></li>
                    <li class="list-inline-item"><a href="javascript:void(0)"><i class="fab fa-instagram"></i></a></li>
                    <li class="list-inline-item"><a href="javascript:void(0)"><i class="fab fa-google-plus"></i></a></li>
                    <li class="list-inline-item"><a href="javascript:void(0)" target="_blank"><i class="fa fa-envelope"></i></a></li>
                </ul>
                      <h5 class="text-center" style="color:white !important">&copy; 2020 BettingWorld | All Rigts Reserved  || Made with <i class="fa fa-heart"  style="color:black"></i> By <a href="mailto:samuelmwangi729@gmail.com">Samuel Mwangi</a></h5>
            </div>
        </footer>
   </div>
</template>
<script>
    export default {
        data(){
            return{
                 games:{},
                 under:{},
                 Draws:{},
                 overs:{},
                 premium:{},
                 completedGames:{}
            }
        },
        methods:{
            loadUnder(){
                 axios.get('Free/Under').then(
                    ({
                        data
                    })=>(this.under=data)
                )
            },
             loadOver(){
                 axios.get('Free/Over2').then(
                    ({
                        data
                    })=>(this.overs=data)
                )
            },
            loadGames(){
                axios.get('Free/Over').then(
                    ({
                        data
                    })=>(this.games=data)
                )
            },
            //end load the games 
            loadPremium(){
                axios.get('Premium/Games').then(({data})=>(this.premium=data))
            },
            //load the completed games into the DOM
            loadCompleted(){
               axios.get('Get/Completed/Games').then(({data})=>(this.completedGames=data))
               console.log('You cant find anything here,Haha')
            },
            loadDraw(){
               axios.get('Free/Draw').then(({data})=>(this.Draws=data))
            }
        },
        created() {
           this.loadGames()
           this.loadUnder()
           this.loadOver()
           this.loadDraw()
           this.loadPremium()
           this.loadCompleted()
        }
    }
</script>
