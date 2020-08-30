<template>
    <div class="container-fluid">
        <div class="row">
          <div class="col-sm-5 offset-sm-3">
                <h1 class="text-center" style="color:red">The Big Game</h1>
                <div class="row">
                        <div class="col-sm-5 text-center">
                            <img :src="big.homeFlag" width="200px"><br>
                            <span>   {{ big.home }}</span>
                        </div>
                        <div class="col-sm-2 text-center">
                        <h1 style="color:red;padding-top:70px" class="hidden-sm">VS</h1>
                        </div>
                        <div class="col-sm-5 text-center">
                            <img :src="big.awayFlag"  width="200px"><br>
                            <span>   {{ big.away }}</span>
                        </div>
                </div>
                <div class="text-center">
                    <span>Country: <img :src="big.flag" width="30px"> {{big.country}}</span><br>
                    <span>League: {{big.league}}</span>
                   <h1 style="color:red;font-family:monospace">Prediction  <u style="text-transform:UPPERCASE;text-shadow:2px 2px silver"> {{ prediction.advice }}</u></h1>
                </div>
          </div>
        </div>
            <!-- Start: promot-02 -->
    <section style="background-color: #F3F3F3;">
        <div class="container-fluid">
            <!-- Start: row -->
            <div class="row" style="margin-bottom: 70px;">
                <div class="col-xl-8 col-lg-8 col-md-12" style="text-align: end;">
                    <p style="color: rgb(0,0,0);font-size: 26px;font-weight: bold;margin-bottom: 7px;margin-top: 48px;"><strong>Betting World</strong></p>
                    <div style="border-top: 2px solid #ee8e00;width: 25%;float: right;"></div>
                    <p style="color: rgb(28,28,28);padding-top: 36px;padding-bottom: 20px;">We Are Easy :: &amp; Easy to Win! Offer many big matches from all big league. Don't miss a chance to win!<br></p><a class="btn" href="/login" style="background-color: #ee8e00;border-radius: 0px;border-color: #ed9305;color:white;font-weight:bold;width: 106px; !important">Join Us</a></div>
                <div
                    class="col-xl-4 col-lg-4 col-md-12"><img data-bs-hover-animate="bounce" class="pull-left" src="img/asset%2031.png?h=bf7f7e41b17ad0416c20662bc492b720" width="350px"></div>
        </div>
        <!-- End: row -->
        </div>
    </section>
    <!-- End: promot-02 -->
        <div class="card text-center" style="margin-top:30px">
           <blockquote class="blockquote">
               Gamblers Don't Have Enough Money. Bet Responsibly
               <cite class="blockquote-footer" style="font-weight:bold">BettingWorld</cite>
           </blockquote>
       </div>
           <!-- Start: 4 Columns Info Icons -->
    <div class="row">
        <div class="col-12 col-sm-6 col-md-3 col-lg-3">
            <h3 class="text-center">HTFT</h3>
            <div class="login-card"><img class="profile-img-card" src="img/fw_al_007_03.jpg?h=51ea7112b8f13b934e05cd1caaf83ea3">

            </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 col-lg-3">
            <h3 class="text-center">GG(BTTS)</h3>
            <div class="login-card"><img class="profile-img-card" src="img/deus-ex2.jpg?h=783a6546ad552913ce2bfa04a86b6d11">

            </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 col-lg-3">
            <h3 class="text-center">1X2</h3>
            <div class="login-card"><img class="profile-img-card" src="img/asset%2031.png?h=bf7f7e41b17ad0416c20662bc492b720">

            </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3 col-lg-3">
            <h3 class="text-center">JackPots</h3>
            <div class="login-card"><img class="profile-img-card" src="img/asset%2030.png?h=83eeb84411e9f54a0383f75daf12dfdd">

            </div>
        </div>
    </div>
    <!-- End: 4 Columns Info Icons -->
       <div class="row">
           <div class="col-sm-9">
               <div class="row">
                   <div class="col-sm-6">
                         <h3 class="text-center" style="color:white;font-weight:bold;font-size:10px;padding-top:10px">Todays Free  (Over 1.5) Games</h3>
                      <!--StartFree Games Table-->
                        <!-- Start: Pretty Table -->
                            <div class="datagrid">
                                <table class="table">
                                    <thead>
                                        <tr>
                                                <th style="color:white !important">Game</th>
                                                <th style="color:white !important">League</th>
                                                <th style="color:white !important">Time</th>
                                                <th style="color:white !important">Pick</th>
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
                                    <tfoot>
                                    </tfoot>
                                </table>
                            </div>
                        <!-- End: Pretty Table -->
                   </div>
                   <div class="col-sm-6">
                        <h3 class="text-center" style="color:white;font-weight:bold;font-size:10px;padding-top:10px">Todays Free  (under 1.5) Games</h3>
 <!-- Start: Pretty Table -->
                            <div class="datagrid">
                                <table class="table">
                                    <thead>
                                        <tr>
                                                <th style="color:white !important">Game</th>
                                                <th style="color:white !important">League</th>
                                                <th style="color:white !important">Time</th>
                                                <th style="color:white !important">Pick</th>
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
                                    <tfoot>
                                    </tfoot>
                                </table>
                            </div>
                        <!-- End: Pretty Table -->
                        <!-- End under 1.5 table -->
                   </div>
                   <!--end table-->
               </div>
               <div class="row">
                       <!--End col-6-->
                       <div class="col-sm-6">
                        <h3 class="text-center" style="color:white;font-weight:bold;font-size:10px;padding-top:10px">Yesterday Games</h3>
                        <!-- Start: Pretty Table -->
                            <div class="datagrid">
                                <table class="table">
                                    <thead>
                                        <tr>
                                                <th style="color:white !important">Game</th>
                                                <th style="color:white !important">League</th>
                                                <th style="color:white !important">Time</th>
                                                <th style="color:white !important">Status</th>
                                            </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="game in yesterdays" :key="game.id">
                                                <td>{{game.HomeTeam}} <span style="color:red">vs</span> {{game.AwayTeam}}</td>
                                                <td>{{game.League}}</td>
                                                <td>{{game.KickOff}}</td>
                                                <td class="text-center"><span style="font-size:20px;color:green !important">&check;</span></td>
                                            </tr>
                                    </tbody>
                                    <tfoot>
                                    </tfoot>
                                </table>
                            </div>
                        <!-- End: Pretty Table -->
                   </div>
                   <!-- End of completed Games -->
                    <div class="col-sm-6">
                        <h3 class="text-center" style="color:white;font-weight:bold;font-size:10px;padding-top:10px">Completed Games</h3>
                         <!-- Start: Pretty Table -->
                            <div class="datagrid">
                                <table class="table">
                                    <thead>
                                        <tr>
                                                <th style="color:white !important">Game</th>
                                                <th style="color:white !important">League</th>
                                                <th style="color:white !important">Time</th>
                                                <th style="color:white !important">Pick</th>
                                                <th style="color:white !important">Status</th>
                                            </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="game in completedGames" :key="game.id">
                                                <td>{{game.HomeTeam}} <span style="color:red">vs</span> {{game.AwayTeam}}</td>
                                                <td>{{game.League}}</td>
                                                <td>{{game.KickOff}}</td>
                                                <td>{{game.Pick}}</td>
                                                <td class="text-center"><span style="font-size:20px;color:green !important">&check;</span></td>
                                            </tr>
                                    </tbody>
                                    <tfoot>
                                    </tfoot>
                                </table>
                            </div>
                        <!-- End: Pretty Table -->
                   </div>
               </div>
           </div>
           <div class="col-sm-3">
             <h3 class="text-center" style="color:red;font-size:14px;margin-top:10px;font-weight:bold">VIP GAMES</h3>
             <!-- Start: Pretty Table -->
                            <div class="datagrid">
                                <table class="table">
                                    <thead>
                                        <tr>
                                                <th style="color:white !important">Game</th>
                                                <th style="color:white !important">League</th>
                                                <th style="color:white !important">Tip</th>
                                            </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="game in premium" :key="game.id">
                                        <td>{{game.HomeTeam}}</td>
                                        <td>{{game.League}}</td>
                                        <td style="color:red">&block;&block;&block;&block;&block;</td>
                                    </tr>
                                    </tbody>
                                    <tfoot>
                                    </tfoot>
                                </table>
                            </div>
                        <!-- End: Pretty Table -->
               <div class="text-center">
                    <span>
                       Kindly Register <a href="/register">Here</a> To access vip tips
                   </span>
               </div>
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
           <!--right ar-->
       </div>
           <!-- Start: Pretty Footer -->
    <footer>
        <div class="row">
            <div class="col-sm-6 col-md-4 footer-navigation">
                <h3> <img src="https://bettingworld.co.ke/dist/img/logo.jpg" height="45px"></h3>
                <p class="links"><a href="/">Home</a><strong> · </strong></p>
                 <ul class="list-unstyled quick-links" style="font-weight:bold">
                        <li><a href="javascript:void(0)" style="color:white">HT/FT</a></li>
                        <li><a href="javascript:void(0)" style="color:white">Asian Handicap</a></li>
                        <li><a href="javascript:void(0)" style="color:white">Correct Score</a></li>
                        <li><a href="javascript:void(0)" style="color:white">Combos</a></li>
                    </ul>
                <p class="company-name">BettingWorld © 2020 </p>
            </div>
            <div class="col-sm-6 col-md-4 footer-contacts">
                <div><span class="fa fa-map-marker footer-contacts-icon"> </span>
                    <p><span class="new-line-span">&block;&block;&block;</span> &block;&block;</p>
                </div>
                <div><i class="fa fa-phone footer-contacts-icon"></i>
                    <p class="footer-center-info email text-left">  0792209882</p>
                </div>
                <div><i class="fa fa-envelope footer-contacts-icon"></i>
                    <p> <a href="#" target="_blank"> dominicmainaw@gmail.com
</a></p>
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="col-md-4 footer-about">
                <h4>About Us</h4>
                <p>  We provide Selected Soccer betting Tips and predictions. You probably would need to pick at most 3 games and stake highly. 99% chances of winning guaranteed.
         We also  aim to promote responsibility in gambling. We provide information to help you make informed decisions about your gambling. </p>
                <div class="social-links social-icons"><a href="#"><i class="fab fa-facebook"></i></a><a href="#"><i class="fab fa-twitter"></i></a><a href="#"><i class="fab fa-linkedin"></i></a><a href="#"></a></div>
            </div>
        </div>
    </footer>
    <!-- End: Pretty Footer -->
    </div>
</template>
<script>
    export default {
        data(){
            return{
                big:{},
                prediction:{},
                 games:{},
                 under:{},
                 Draws:{},
                 overs:{},
                 premium:{},
                 completedGames:{},
                 yesterdays:{}
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
            },
            loadDraw(){
               axios.get('Free/Draw').then(({data})=>(this.Draws=data))
            },
            loadYesterday(){
                axios.get('Yesterday/WonGames').then((data)=>{
                    this.yesterdays=data.data.games
                }).catch((data)=>{
                    console.log('Unknown error occurred')
                })
            },
            loadBig(){
                console.log('Big Game Loading')
                axios.get('/bigGame/today').then((data)=>{
                    this.big=data.data
                    //get predictions
                    this.loadPrediction(this.big.fixture_id)
                })
            },
            loadPrediction(id){
                 axios.get('/predictions/'+id).then((data)=>{
               let latestData=data.data
               axios.post('/LatestData',{
                   data:latestData
               }).then((response)=>{
                   this.prediction=response.data.message.data[0]
               }).catch((err)=>{
                   console.log(err)
               })
            }).catch((error)=>{
                console.log(error)
            })
            }
        },
        created() {
           this.loadGames()
           this.loadUnder()
           this.loadOver()
           this.loadDraw()
           this.loadPremium()
           this.loadCompleted()
           this.loadYesterday()
           this.loadBig()
        }
    }
</script>
