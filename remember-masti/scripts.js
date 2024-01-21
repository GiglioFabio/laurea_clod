// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

jQuery(document).ready(function () {
  var Memory = {
    init: function (cards) {
      this.$game = $('.game');
      this.$modal = $('.modal');
      this.$overlay = $('.modal-overlay');
      this.$restartButton = $('button.restart');
      this.cardsArray = $.merge(cards, cards);
      this.shuffleCards(this.cardsArray);
      this.setup();
    },

    shuffleCards: function (cardsArray) {
      this.$cards = $(this.shuffle(this.cardsArray));
    },

    setup: function () {
      this.html = this.buildHTML();
      this.$game.html(this.html);
      this.$memoryCards = $('.card');
      this.paused = false;
      this.guess = null;
      this.binding();
    },

    binding: function () {
      this.$memoryCards.on('click', this.cardClicked);
      this.$restartButton.on('click', $.proxy(this.reset, this));
    },
    // kinda messy but hey
    cardClicked: function () {
      var _ = Memory;
      var $card = $(this);
      if (
        !_.paused &&
        !$card.find('.inside').hasClass('matched') &&
        !$card.find('.inside').hasClass('picked')
      ) {
        $card.find('.inside').addClass('picked');
        if (!_.guess) {
          _.guess = $(this).attr('data-id');
        } else if (
          _.guess == $(this).attr('data-id') &&
          !$(this).hasClass('picked')
        ) {
          $('.picked').addClass('matched');
          _.guess = null;
        } else {
          _.guess = null;
          _.paused = true;
          setTimeout(function () {
            $('.picked').removeClass('picked');
            Memory.paused = false;
          }, 600);
        }
        if ($('.matched').length == $('.card').length) {
          _.win();
        }
      }
    },

    win: function () {
      this.paused = true;
      setTimeout(function () {
        Memory.showModal();
        Memory.$game.fadeOut();
      }, 1000);
    },

    showModal: function () {
      this.$overlay.show();
      this.$modal.fadeIn('slow');
    },

    hideModal: function () {
      this.$overlay.hide();
      this.$modal.hide();
    },

    reset: function () {
      this.hideModal();
      this.shuffleCards(this.cardsArray);
      this.setup();
      this.$game.show('slow');
    },

    // Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
    shuffle: function (array) {
      var counter = array.length,
        temp,
        index;
      // While there are elements in the array
      while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }
      return array;
    },

    buildHTML: function () {
      var frag = '';
      this.$cards.each(function (k, v) {
        frag +=
          '<div class="card" data-id="' +
          v.id +
          '"><div class="inside">\
				<div class="front"><img src="' +
          v.img +
          '"\
				alt="' +
          v.name +
          '" /></div>\
				<div class="back"><img src="./assets/domanda.png"\
				alt="domanda" /></div></div>\
				</div>';
      });
      return frag;
    },
  };

  var cards = [
    {
      name: 'masti_1',
      img: './assets/masti_1.png',
      id: 1,
    },
    {
      name: 'masti_2',
      img: './assets/masti_2.png',
      id: 2,
    },
    {
      name: 'masti_3',
      img: './assets/masti_3.png',
      id: 3,
    },
    {
      name: 'masti_4',
      img: './assets/masti_4.png',
      id: 4,
    },
    {
      name: 'masti_5',
      img: './assets/masti_5.png',
      id: 5,
    },
    {
      name: 'masti_6',
      img: './assets/masti_6.png',
      id: 6,
    },
    {
      name: 'masti_7',
      img: './assets/masti_7.png',
      id: 7,
    },
    {
      name: 'masti_8',
      img: './assets/masti_8.png',
      id: 8,
    },
    {
      name: 'masti_9',
      img: './assets/masti_9.png',
      id: 9,
    },
    {
      name: 'masti_10',
      img: './assets/masti_10.png',
      id: 10,
    },
    {
      name: 'masti_11',
      img: './assets/masti_11.png',
      id: 11,
    },
    {
      name: 'masti_12',
      img: './assets/masti_12.png',
      id: 12,
    },
  ];

  Memory.init(cards);
});
