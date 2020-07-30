<template>
    <div class="container" style="margin-top:100px;">
    <div class="col-sm-6 offset-sm-3">
       <div class="card" style="elevation:0 !important;backfround-color:#f8f9fb !important">
           <div class="card-body">
               <div class="container">
                   <!-- <alert-success :form="form" message="Your changes have been saved!"></alert-success> -->
                 <form @submit.prevent="register" @keydown="form.onKeydown($event)">
                    <fieldset style="border:1px solid green !important">
                        <legend class="text-center" style="border:1px solid red;width:50% !important">
                           Register
                        </legend>
                          <div class="form-group text-center"  style="margin-top:20px">
                                <input type="text" v-model="form.name" class="form-control" :class="{'is-invalid':form.errors.has('name')}"  name="name" placeholder="Your Name" autocomplete="off" style="width:90%;margin-left:10px;margin-right:10px !important">
                                <has-error :form='form' field='email'></has-error>
                            </div>
                            <div class="form-group text-center">
                                <input type="email" v-model="form.email" class="form-control" :class="{'is-invalid':form.errors.has('email')}"  name="email" placeholder="Your Email Address" autocomplete="off" style="width:90%;margin-left:10px;margin-right:10px !important">
                                <has-error :form='form' field='email'></has-error>
                            </div>
                             <div class="form-group text-center">
                                <input type="password" v-model="form.password" class="form-control" :class="{'is-invalid':form.errors.has('password')}" name="password" placeholder="Password" autocomplete="off" style="width:90%;margin-left:10px;margin-right:10px !important">
                                <has-error :form='form' field='password'></has-error>
                            </div>
                            <div class="form-group text-center">
                                <input type="password" v-model="form.password_confirmation" class="form-control" :class="{'is-invalid':form.errors.has('password_confirmation')}" name="password_confirmation" placeholder="Confirm Password" autocomplete="off" style="width:90%;margin-left:10px;margin-right:10px !important">
                                <has-error :form='form' field='password_confirmation'></has-error>
                            </div>
                             <div class="form-group text-center">
                            <div class="col-md-6 offset-sm-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" required>

                                    <label class="form-check-label" for="remember">
                                    Agree to terms and Conditions?
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
            form: new Form({
                name:'',
                email:'',
                password:'',
                pasword_confirmation:''
            }),
        }
    },
    methods:{
        register(){
           this.form.post('/register').then(({data})=>(
              window.open('/home','_parent')
           ))
        }
    }
}
</script>