<template>
<div class="container" style="margin-top:100px;">
    <ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6177716716878978"
     data-ad-slot="2161762392"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
    <div class="col-sm-6 offset-sm-3">
       <div class="card" style="elevation:0 !important;backfround-color:#f8f9fb !important">
           <div class="card-body">
               <div class="container">
                   <!-- <alert-success :form="form" message="Your changes have been saved!"></alert-success> -->
                 <form @submit.prevent="login" @keydown="form.onKeydown($event)">
                    <fieldset style="border:1px solid green !important">
                        <legend class="text-center" style="border:1px solid red;width:50% !important">
                           Login
                        </legend>
                            <div class="form-group text-center"  style="margin-top:20px">
                                <input type="email" v-model="form.email" class="form-control" :class="{'is-invalid':form.errors.has('email')}"  name="email" placeholder="Your Email Address" autocomplete="off" style="width:90%;margin-left:10px;margin-right:10px !important">
                                <has-error :form='form' field='email'></has-error>
                            </div>
                             <div class="form-group text-center">
                                <input type="password" v-model="form.password" class="form-control" :class="{'is-invalid':form.errors.has('password')}" name="password" placeholder="Password" autocomplete="off" style="width:90%;margin-left:10px;margin-right:10px !important">
                                <has-error :form='form' field='password'></has-error>
                            </div>
                             <div class="form-group text-center">
                            <div class="col-md-6 offset-sm-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember">

                                    <label class="form-check-label" for="remember">
                                    Remember Me?
                                    </label>
                                </div>
                            </div>
                            <div class="col-sm-6 offset-sm-3">
                                <button class="btn btn-success btn-block" :disabled="form.busy">
                                <i class="fa fa-sign"></i>  Sign In
                                </button>
                            </div>
                        </div>
                    </fieldset>
                 </form>
               </div>
           </div>
       </div>
    </div>
</div>
</template>
<script>
export default{
    data(){
        return{
          form:new Form({
            email:'',
            password:'',
            remember:false
          })
        }
    },
    methods:{
      login(){
        this.form.post('/login').then((data)=>(
            // toast({
            //     type:'success',
            //     title:'Successfully Logged  In'
            // }),
          window.open('/home','_parent')
        ));
      }
    },
    created(){
        // console.log('this is going to be the login form')
    }
}
</script>
