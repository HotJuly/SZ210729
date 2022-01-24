export default {
    data(){
        return{
            c:1,
            loading:false
        }
    },
    mounted(){
        // console.log(this.c,this.isShow)
        this.showLoading();

        setInterval(()=>{
            if(this.loading){
                console.log('loading....')
            }else{
                console.log('done!!!')
            }
        },1000);
        
        setTimeout(()=>{
            this.hideLoading();
        },3000)
    },
    methods:{
        showLoading(){
            this.loading=true;
        },
        hideLoading(){
            this.loading=false;
        }
    }
}