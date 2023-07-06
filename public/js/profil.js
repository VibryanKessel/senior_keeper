var app = new Vue({
    el: '#app',
    data: {
        nom: "Dubois",
        prenom: "Alex",
        adress:"60 Rue de la République, 95000",
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
    methods: {
        screenButtonClick(screen) {
            this.profilScreen = screen
        },
    }
});