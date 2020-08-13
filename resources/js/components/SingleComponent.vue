<template>
    <div class="row">
        Shows Single Match Highlights
    </div>
</template>
<script>
export default{
    data(){
        return{
            details:[]
        }
    },
    methods:{
        loadDetails(){
            axios.get('/Latest/Data').then((response)=>{
                console.log(response.data.latest)
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    created(){
        this.loadDetails(),
        console.log('loading Details')
    }
}
</script>