const {createApp} = Vue;


createApp({
    data() {
        return {
            name : null,
            lastName : null,
            address : null,
            zip : null,
            email : null,
            tel: null,
            mdp: null,
            c_mdp : null,
            message : null,
            conditionsCheck : null
        }
    },
    methods:{
        validTel: function (tel) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(tel);
        },
        submitForm: function(e){
            e.preventDefault();
            if(this.name == null || this.lastName == null || this.address == null || this.zip == null || this.email == null || this.tel == null || this.mdp == null || this.conditionsCheck == null || this.conditionsCheck == false){
                this.message = "Remplissez tous les champs pour vous connecter"
                console.log('1')
            }
            else if(this.c_mdp != this.mdp){
                this.message = "Vos mots de passes ne sont pas équivalents. Veuillez les revoir !"
                console.log('2')
            }
            else{
                console.log({
                    nom: this.lastName,
                    prenom: this.name,
                    adresse: this.address+","+this.zip,
                    email: this.email,  
                    telephone: this.tel,
                    motdepasse: this.mdp
                });
                this.message = null
                axios.post('http://localhost:3000/register', {
                    nom: this.lastName,
                    prenom: this.name,
                    adresse: this.address+","+this.zip,
                    email: this.email,  
                    telephone: this.tel,
                    motdepasse: this.mdp
                }).then(function (response) {
                    console.log(response);
                    if (response.status == 200) {
                        window.location.replace("http://localhost:3000/");
                    }
                    else {
                        this.message = "Erreur lors de la création de compte. Rééssayez !!"
                    }
                }).catch(function (error) {
                    this.message = "Erreur lors de la création de compte. Rééssayez !!"
                });
            }

        }
    }
}).mount('#app')
