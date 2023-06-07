const { createApp } = Vue;


createApp({
    data() {
        return {
            tel: null,
            mdp: null,
            message: null
        }
    },
    methods: {
        validTel: function (tel) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(tel);
        },
        submitForm: function (e) {
            e.preventDefault();
            if (this.tel == null || this.mdp == null) {
                this.message = "Remplissez tous les champs pour vous connecter"
            }
            else {
                this.message = null;
                axios.post('http://localhost:3000/login', {
                    telephone: this.tel,
                    motdepasse: this.mdp
                }).then(response => {
                    console.log(response);
                    if (response.status === 200) {
                        console.log('ok')
                        window.location.href = "http://localhost:3000/";
                    }
                    else {
                        this.message = "Numéro de téléphone ou mot de passe incorrect"
                    }
                }).catch(function (error) {
                    this.message = "Erreur lors de la connexion au compte. Rééssayez !!"
                });


            }

        }
    }
}).mount('#app')
