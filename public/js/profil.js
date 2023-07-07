var app = new Vue({
    el: '#app',
    data: {
        userData : null,
        formModification : null,
        formContact:{
            name:"",
            tel:""
        },
        formBracelet:{
            nomBracelet:"",
        },
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
        this.getCommands()
        this.getContacts()
    },
    methods: {
        commandDateStringFormat(item) {
            date = new Date(item.date_cmd)
            return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
        },
        deliveryDateStringFormat(item) {
            date = new Date(item.date_liv)
            return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
        },
        preperationDateStringFormat(item) {
            date = new Date(item.date_fab)
            return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
        },
        getSessionData(){
            axios.get("http://82.165.31.82:3000/who")
            .then(res => {
                this.userData = res.data
                this.formModification = res.data
            })
            .catch(err =>{
                console.log(err)
            })
        },
        getCommands(){
            axios.get("http://82.165.31.82:3000/getBracelet")
            .then(res => {
                this.commands = res.data
            })
            .catch(err =>{
                console.log(err)
            })
        },
        getContacts(){
            axios.get("http://82.165.31.82:3000/getContact")
            .then(res => {
                this.contacts = res.data
            })
            .catch(err =>{
                console.log(err)
            })
        },
        deleteContacts(id_contact){
            console.log(id_contact)
            axios.post("http://82.165.31.82:3000/deleteContact",{id_contact})
            .then(res => {
                this.getContacts()
            })
            .catch(err =>{
                console.log(err)
            })
        },
        addContacts(e){
            e.preventDefault();            
            console.log({
                name : this.formContact.name,
                tel : this.formContact.tel
            })
            axios.post("http://82.165.31.82:3000/addContact",{
                name : this.formContact.name,
                tel : this.formContact.tel
            })
            .then(res => {
                this.getContacts()
                this.profilScreen = 'contacts'
            })
            .catch(err =>{
                console.log(err)
            })
        },

        addCommand(e){
            e.preventDefault();            

            axios.post("http://82.165.31.82:3000/cmdBracelet",{
                nomBracelet : this.formBracelet.nomBracelet,
            })
            .then(res => {
                this.getCommands()
                this.profilScreen = 'commands'
            })
            .catch(err =>{
                console.log(err)
            })
        },
        screenButtonClick(screen){
            this.profilScreen = screen
        }
    }
});