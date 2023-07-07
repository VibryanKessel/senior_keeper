var app = new Vue({
    el: '#app',
    data: {
        userData : null,
        form : null,
        profilScreen: "",
        contacts: [
            { nom: "Clara", tel: "0707333535" }, 
            { nom: "Clara", tel: "0707333535" }
        ],
        commands:[
            {
                date_liv:new Date("2030-07-06 10:30:00"),
                date_cmd:new Date("2030-07-06 10:30:00"),
                nomBracelet:"Bracelet Amandine"
            },
            {
                date_liv:new Date("2030-07-06 10:30:00"),
                date_cmd:new Date("2030-07-06 10:30:00"),
                nomBracelet:"Bracelet Amandine"
            }
        ]
    },
    mounted(){
        this.getSessionData()
        console.log(this.userData)
    },
    methods: {
        getSessionData(){
            axios.get("http://localhost:3000/who")
            .then(res => {
                this.userData = res.data
                this.form = res.data
            })
            .catch(err =>{
                console.log(err)
            })
        },
        screenButtonClick(screen){
            this.accordionScreen = screen
        }
    }
});