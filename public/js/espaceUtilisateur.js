Vue.component('accordion-item', {
    template: `
      <div class ="accordion w-full cursor-default">
        <div @click="toggle" class = "flex p-2 bg-gray-200 border-t-2 border-gray-400 rounded-b-lg" >
            <div :class = "['flex items-center text-3xl justify-between w-full',{'font-bold': isOpen}]">
                <div>
                    {{bracelet.nomBracelet}}
                </div>
                <div class="flex gap-10">
                    <span>{{acquisitionDateStringFormat}}</span>
                    <span>{{isOpen?"v":">"}}</span>
                </div>
            </div>
            <div class = "flex flex-col items-center justify-center" >
                <div>{{bracelet.status}}</div>
            </div>
        </div>
        <div v-show="isOpen" class = "py-1 px-2 rounded-b-lg" >
            <div class = "accordion__title" v-if="accordionScreen === 'modify'">
                
                <form class="form flex flex-col bg-gray-100 gap-5 py-5 px-2">
                    <fieldset class="flex flex-col gap-3">
                        <legend class="text-2xl text-center py-5">Modifier les informations du bracelet </legend>      
                        <label for="nomBracelet" class="text-2xl font-medium text-gray-900">Nom du bracelet</label>
                        <input class="h-16 px-6 border text-2xl" v-model="nomBraceletForm" type="text" id="nomBracelet"
                            placeholder=" Bracelet de Marguerite" required>
                        <button @click="submitModificationForm" class="p-button text-2xl text-white rounded font-bold px-3 py-4 bg-purple-800">
                            Valider
                        </button>
                    </fieldset>
                </form>

                <button @click="screenButtonClick(null)" class = "text-2xl" > Retour </button>
            </div>
            <div v-else-if="accordionScreen === 'report'" class = "py-1 px-2 bg-gray-100 rounded-b-lg">
                <form class="form flex flex-col gap-5 py-5 px-2">
                    <fieldset class="flex flex-col gap-3">
                        <legend class="text-2xl text-center py-5">Signaler un probleme </legend>      
                        <label for="nomBracelet" class="text-2xl font-medium text-gray-900">Message</label>
                        <textarea class="h-16 px-6 border text-2xl flex items-center"  v-model="message" id="nomBracelet" placeholder=" Bracelet de Marguerite" required></textarea>
                        <button @click="submitModificationForm" class="p-button text-2xl text-white rounded font-bold px-3 py-4 bg-purple-800">
                            Valider
                        </button>
                    </fieldset>
                </form>

            <button @click="screenButtonClick(null)" class = "text-2xl font-semibold" > Retour </button>
            </div>
            <div v-else-if="accordionScreen === 'replace'" class = "py-1 px-2 bg-gray-100 rounded-b-lg">
                <form class="form flex flex-col gap-5 py-5 px-2">
                    <fieldset class="flex flex-col gap-3">
                        <legend class="text-2xl text-center py-5">Remplacer ce bracelet </legend>      
                        <label for="nomBracelet" class="text-2xl font-medium text-gray-900">Raison du changement</label>
                        <input class="h-5 w-2/3" v-model="raison" type="text" class="h-16 px-6 border text-2xl"  id="raison"required>
                        <button @click="submitModificationForm" class="p-button text-2xl text-white rounded font-bold px-3 py-4 bg-purple-800">
                            Valider
                        </button>
                    </fieldset>
                </form>    
        
                <button @click="screenButtonClick(null)" class = "text-2xl font-semibold" > Retour </button>
            </div>
            <div v-else class="flex gap-10 w-full">
                <button @click="screenButtonClick('modify')" class = " hover:underline text-2xl text-purple-800 font-semibold"> Modifier les informations du bracelet</button>
                <button @click="screenButtonClick('report')" class = " hover:underline text-2xl text-purple-800 font-semibold">Signaler un problème</button>
                <button @click="screenButtonClick('replace')" class = " hover:underline text-2xl text-purple-800 font-semibold">Remplacer bracelet</button>
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
      <div class = "w-full hover:font-bold">
        <slot></slot>
      </div>
    `
});


Vue.component('mesbracelets',{
    template : `
        <div class = "w-5/6"> 
            <p class="py-5 text-5xl font-bold text-center"> Liste de vos bracelets </p>
            <div class="">
                <div v-for="item in data" class="w-full">
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