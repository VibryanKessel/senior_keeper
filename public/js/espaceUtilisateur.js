Vue.component('accordion-item', {
    template: `
      <div>
        <div @click="toggle" class = "flex flex-row w-1/2 p-2 bg-gray-200 border-t-2 border-gray-400 rounded-b-lg" >
            <div class = "flex flex-col items-center justify-center">
                <div>
                    {{bracelet.braceletName}}
                </div>
                <div>
                    {{bracelet.possessor}}
                </div>
                <div>
                    {{acquisitionDateStringFormat}}
                </div>
            </div>
            <div class = "flex flex-col items-center justify-center" >
                <div>{{bracelet.status}}</div>
                <div>{{lastFallStringFormat}}</div>
            </div>
        </div>
        <div v-show="isOpen" class = "w-1/2 p-2 bg-white-200 border-t-2 border-gray-400 rounded-b-lg" >
            <div v-if="accordionScreen === 'modify'">
                <p class="text-2xl flex items-center justify-center"> Modifier informations du bracelet </p>
                
                <form class="form">
                    <div>
                        <label for="nomBracelet" class="block text-xl mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom du bracelet</label>
                        <input v-model="nomBraceletForm" type="text" id="nomBracelet"
                            class="shadow appearance-none border rounded rounded-lg w-full my-2 mx-3 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder=" Bracelet de Marguerite" required>
                    </div>
                    <div>
                        <label for="possessor" class="block text-xl mb-2 text-sm font-medium text-gray-900 dark:text-white">Possesseur</label>
                        <input v-model="possesseurForm" type="text" id="possessor"
                            class="shadow appearance-none border rounded rounded-lg w-full my-2 mx-3 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder=" Bracelet de Marguerite" required>
                    </div>
                    <button @click="submitModificationForm" class="p-button my-6 mx-3 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                        Valider
                    </button>
                </form>

                <button @click="screenButtonClick(null)" class = "my-6 mx-3 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" > Retour </button>
            </div>
            <div v-else-if="accordionScreen === 'report'">
                <p class="text-2xl flex items-center justify-center"> Signaler un problème sur ce bracelet </p>
                <button @click="screenButtonClick(null)" class = "my-6 mx-3 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" > Retour </button>
            </div>
            <div v-else-if="accordionScreen === 'replace'">
                <p class="text-2xl flex items-center justify-center"> Remplacer ce bracelet </p>
                <button @click="screenButtonClick(null)" class = "my-6 mx-3 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" > Retour </button>
            </div>
            <div v-else>
                <button @click="screenButtonClick('modify')" class = "my-6 mx-3 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" > Modifier les informations du bracelet</button>
                <button @click="screenButtonClick('report')" class = "my-6 mx-3 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" >Signaler un problème</button>
                <button @click="screenButtonClick('replace')" class = "my-6 mx-3 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" >Remplacer bracelet</button>
            </div>
        </div>
      </div>
    `,
    data() {
      return {
        isOpen: false,
        component : `<button>Signaler problème</button>`,
        accordionScreen : null,
        nomBraceletForm : this.bracelet.braceletName,
        possesseurForm : this.bracelet.possessor
      };
    },
    computed : {
        lastFallStringFormat(){
            return this.bracelet.lastFall.getDate()+"/"+this.bracelet.lastFall.getMonth()+"/"+this.bracelet.lastFall.getFullYear()
        },
        acquisitionDateStringFormat() {
            return this.bracelet.acquisitionDate.getDate()+"/"+this.bracelet.acquisitionDate.getMonth()+"/"+this.bracelet.acquisitionDate.getFullYear()
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
        <div class = "flex flex-col space-y-64 items-center w-3/4 bg-green"> 
            <p class="text-5xl flex items-center justify-center"> Liste de vos bracelets </p>
            <div v-for="item in data" >
                <accordion>
                    <accordion-item :bracelet = "item" class = "bg-white-200">
                        
                    <accordion-item>
                </accordion>
            </div> 
        </div>
    `,
    data(){
        return {
            data : [
                {
                    braceletName:'Bracelet 1',
                    status:"Actif",
                    lastFall: new Date("2/12/2000"),
                    acquisitionDate: new Date("2/12/2000"),
                    possessor: "Pierre Dubois"

                },
                {
                    braceletName:'Bracelet 2',
                    isActive:true,
                    lastFall:new Date("2/12/2000"),
                    acquisitionDate: new Date("2/12/2000"),
                    possessor: "Marie Dubois"

                },
                {
                    braceletName:'Bracelet 3',
                    isActive: true,
                    lastFall: new Date("2/12/2000"),
                    acquisitionDate: new Date("2/12/2000"),
                    possessor: "Hermann Dubois"

                }
            ]
        }
    }

})




var app = new Vue({
    el: '#app',
    data: {
        nom: "Dubois",
        prenom: "Alex",
        tel: null,
        mdp: null,
        message: null
    },
    methods: {
      
    }
  });
  


/* createApp({
    data() {
        return {
            nom: "Dubois",
            prenom: "Alex",
            tel: null,
            mdp: null,
            message: null
        }
    },
    computed: {
        content() {
            return ;
        }
    },
    methods: {
        selectTab(index) {
            this.selectedTab = index;
        }
    },
    component : {
        "mesbracelets": Mesbracelets
    }
}).mount('#app') */


/* 
createApp({
    data() {
        return {
            tabs: ['Mon bracelet', 'Mes commandes', 'Mes chutes'],
            selectedTab: 0,
            nom: "Dubois",
            prenom: "Alex",
            tel: null,
            mdp: null,
            message: null
        }
    },
    computed: {
        content() {
            return ;
        }
    },
    methods: {
        selectTab(index) {
            this.selectedTab = index;
        }
    },
    component : {
        
    }
}).mount('#app')
 */