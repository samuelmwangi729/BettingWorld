<template>
    <div class="container" v-if="isAdmin">
         <admin-component></admin-component>
    </div>
    <div class="container" v-else>
    </div>
</template>
<script>
export default{
    data(){
        return{
            isAdmin:false
        }
    },
    methods:{
        checkAdmin(){
            axios.get('/IsAdminiistratorOfTheSite').then((data)=>{
                this.isAdmin=data.data;
                // console.log(data.data)
            })
        }
    },
    created(){
        this.checkAdmin()
    }
}
</script>