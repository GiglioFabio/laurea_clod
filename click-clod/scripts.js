window.onload = function () {
  const LOCALSTORAGE_KEY = 'clicker-game';
  const conf = {
    generators: [
      {
        id: 0,
        name: 'Nuovo cliente',
        cost: 10,
        costIncrease: 1,
        generate: 0.1,
      },
      {
        id: 1,
        name: 'Assumi un nuovo dipendente',
        cost: 100,
        costIncrease: 10,
        generate: 2,
      },
      {
        id: 2,
        name: 'Apri una nuova sede',
        cost: 500,
        costIncrease: 50,
        generate: 50,
      },
      {
        id: 3,
        name: 'Apre una nuova società (sei il prestanome)',
        cost: 1000,
        costIncrease: 100,
        generate: 150,
      },
      {
        id: 4,
        name: 'Apri un museo del caffè',
        cost: 4000,
        costIncrease: 400,
        generate: 200,
      },
      {
        id: 5,
        name: 'Schiavizzi una regione della Colombia',
        cost: 10000,
        costIncrease: 1000,
        generate: 1000,
      },
      {
        id: 6,
        name: 'Crei caffè dai fail',
        cost: 20000,
        costIncrease: 2000,
        generate: 20000,
      },
    ],
    tools: [
      {
        id: 0,
        name: 'Fail plus! (faili ma impari)',
        cost: 30,
        click: 1,
      },
      {
        id: 1,
        name: 'Migliora la coordinazione',
        cost: 100,
        click: 100,
      },
      {
        id: 3,
        name: 'Fai un figlio per vendere più caffè',
        cost: 1000,
        click: 500,
      },
    ],

    probabilita: [
      {
        id: 0,
        name: 'Mangi i biscotti alla mariyana -{{cost}}',
        cost: 500,
        generate: 0,
      },
      {
        id: 1,
        name: 'Vinci alla lotteria +{{generate}} ',
        cost: 0,
        generate: 30,
      },
      {
        id: 2,
        name: 'Trovi una carta pokemon rara +{{generate}} ',
        cost: 0,
        generate: 100,
      },
      {
        id: 3,
        name: 'Devi pagamere la cena a Dario -{{cost}} ',
        cost: 30,
        generate: 0,
      },
      {
        id: 4,
        name: 'Mirko si accorda con la Mafia +{{generate}} ',
        cost: 0,
        generate: 5000,
      },
      {
        id: 5,
        name: 'Vai con Jack e Zanza al CirinGay -{{cost}} (e hai male al culo)',
        cost: 500,
        generate: 0,
      },
      {
        id: 6,
        name: 'Campana fa danni',
        cost: 200,
        generate: 0,
      },
    ],
  };

  function round(number) {
    return Math.round(number * 10) / 10;
  }

  var app = new Vue({
    el: '#app',
    data: {
      score: 1,
      click: 1,
      probabilita: '',
      generators: {},
      configuration: conf,
    },
    computed: {
      perSecond() {
        let clicks = 0;
        Object.keys(this.generators).forEach((key) => {
          clicks +=
            this.generators[key] * this.configuration.generators[key].generate;
        });
        console.log('running perSecond', clicks);
        return round(clicks);
      },
    },
    methods: {
      pressButton() {
        this.score += this.click;
      },
      buy(id) {
        const generator = this.configuration.generators[id];
        const cost =
          generator.cost +
          generator.costIncrease * this.generators[generator.id];
        if (this.score - cost >= 0) {
          if (!this.generators[id]) {
            this.generators[id] = 0;
          }
          this.generators[id]++;
          this.score -= cost;
          this.score = round(this.score);
        }
      },
      buyTool(id) {
        const tool = this.configuration.tools[id];
        const cost = tool.cost;
        if (this.score - cost >= 0) {
          this.click += tool.click;
          this.score -= cost;
          this.score = round(this.score);
        }
      },
      tiraDado() {
        if (this.configuration.probabilita.length > 0) {
          var randomIndex = Math.floor(
            Math.random() * this.configuration.probabilita.length
          );
          var prob = this.configuration.probabilita.splice(randomIndex, 1)[0];
          console.log(prob);
          this.score += prob.generate;
          this.score -= prob.cost;
          this.probabilita = prob.name
            .replace('{{cost}}', prob.cost)
            .replace('{{generate}}', prob.generate);
        }
      },
      reset() {
        this.score = 1;
        this.click = 1;
        this.generators = {};
        this.probabilita = '';
        Object.keys(this.configuration.generators).forEach((key) => {
          Vue.set(this.generators, key, 0);
        });
      },
      tick() {
        console.log(this.score, this.perSecond);
        this.score = round(this.score + this.perSecond);
      },
      save() {
        window.localStorage.setItem(
          LOCALSTORAGE_KEY,
          JSON.stringify(this.$data)
        );
      },
      load() {
        const data = window.localStorage.getItem(LOCALSTORAGE_KEY);
        let res = null;
        try {
          res = JSON.parse(data);
        } catch (e) {}
        if (res) {
          Object.keys(res).forEach((key) => {
            this[key] = res[key];
          });
        }
        this.configuration = conf;
      },
    },
    created() {
      this.reset();
      this.load();
      window.setInterval(() => {
        this.tick();
        this.save();
      }, 1000);
    },
  });
};
