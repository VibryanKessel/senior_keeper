Vue.component('accordion-item', {
    template: `
      <div class ="accordion w-full">
        <div @click="toggle" class = "flex flex-row w-1/2 p-2 bg-gray-200 border-t-2 border-gray-400 rounded-b-lg" >
            <div class = "flex flex-col items-center justify-center">
                <div>
                    {{bracelet.nomBracelet}}
                </div>
                <div>
                    {{acquisitionDateStringFormat}}
                </div>
            </div>
            <div class = "flex flex-col items-center justify-center" >
                <div>{{bracelet.status}}</div>
            </div>
        </div>
        <div v-show="isOpen" class = "w-1/2 p-2 bg-white-200 border-t-2 border-gray-400 rounded-b-lg" >
            <div class = "accordion__title" v-if="accordionScreen === 'modify'">
                <p class="text-2xl flex items-center justify-center"> Modifier informations du bracelet </p>
                
                <form class="form">
                    <div>
                        <label for="nomBracelet" class="block text-xl mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom du bracelet</label>
                        <input v-model="nomBraceletForm" type="text" id="nomBracelet"
                            placeholder=" Bracelet de Marguerite" required>
                    </div>
                    <button @click="submitModificationForm" class="p-button ">
                        Valider
                    </button>
                </form>

                <button @click="screenButtonClick(null)" class = "" > Retour </button>
            </div>
            <div v-else-if="accordionScreen === 'report'">
                <p class="text-2xl flex items-center justify-center"> Signaler un problème sur ce bracelet </p>
                
                <form class="form">
                    <div>
                        <label for="messageReport" class="block text-xl mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
                        <textarea v-model="message" id="messageReport" required></textarea>
                    </div>
                    <button type="submit" class="p-button ">
                        Valider
                    </button>
                </form>
                
                <button @click="screenButtonClick(null)" class = "" > Retour </button>
            </div>
            <div v-else-if="accordionScreen === 'replace'">
                <p class="text-2xl flex items-center justify-center"> Remplacer ce bracelet </p>
                
                <form class="form">
                    <div>
                        <label for="raison" class="block text-xl mb-2 text-sm font-medium text-gray-900 dark:text-white">Raison du changement</label>
                        <input v-model="raison" type="text" id="raison"required>
                    </div>
                    <button @click="" class="p-button">
                        Valider
                    </button>
                </form>
                
                <button @click="screenButtonClick(null)" class = "" > Retour </button>
            </div>
            <div v-else>
                <button @click="screenButtonClick('modify')" class = ""> Modifier les informations du bracelet</button>
                <button @click="screenButtonClick('report')" class = "">Signaler un problème</button>
                <button @click="screenButtonClick('replace')" class = "">Remplacer bracelet</button>
            </div>
        </div>
      </div>
    `,
    data() {
      return {
        isOpen: false,
        accordionScreen : null,
        nomBraceletForm : this.bracelet.nomBracelet,
        message : "",
        raison :""
      };
    },
    computed : {
        acquisitionDateStringFormat() {
            date = new Date(this.bracelet.date_liv)
            return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
        }
    },
    methods : {
      toggle() {
        this.isOpen = !this.isOpen;
      }, 
      screenButtonClick(screen){
        this.accordionScreen = screen
      },
      submitModificationForm(e){

      },
      submitReplaceForm(e){
                
      }
    },
    props: {
      bracelet:Object
    }
  });

Vue.component('accordion', {
    template: `
      <div class = "w-1/2">
        <slot></slot>
      </div>
    `
});


Vue.component('mesbracelets',{
    template : `
        <div class = "flex flex-col gap-20 items-center"> 
            <p class="text-5xl flex items-center font-bold justify-center"> Liste de vos bracelets </p>
            <div >
                <div v-for="item in data" >
                    <accordion>
                        <accordion-item :bracelet = "item" class = "bg-white-200">        
                        <accordion-item>
                    </accordion>
                </div>
            </div>
        </div>
    `,
    mounted(){
        this.getBracelets()
    },
    data(){
        return {
            data : null
        }
    },
    methods : {
        getBracelets(){
            axios.get("http://localhost:3000/getBracelet")
            .then(res => {
                this.data = res.data

                console.log(this.data)
            })
            .catch(err =>{
                console.log(err)
            })
        }
    }

})


var app = new Vue({
    el: '#app',
    data: {
        userData:null,
        message: null
    },
    mounted(){
        this.getSessionData()
    },
    methods: {
        getSessionData(){
            axios.get("http://localhost:3000/who")
            .then(res => {
                this.userData = res.data
            })
            .catch(err =>{
                console.log(err)
            })
        }
    }
});