// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     	this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
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

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="https://1.bp.blogspot.com/-4R7iEgGkdYY/Xrb3XIeMYvI/AAAAAAAAQs0/wprq5Wq73DAy4VhQpHIL7SIumVJO1zmUACLcBGAsYHQ/s1600/IMG-20190807-WA0008.jpg"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "accidente",
			img: "https://1.bp.blogspot.com/-mcvKzko32QQ/XrfCNI7r8aI/AAAAAAAAQtE/6PWUioliQpYplQKjxk5ctN6wa7CQLbJRwCLcBGAsYHQ/s1600/Atropeyo.png",
			id: 1,
		},
		{
			name: "saludo",
			img: "https://media.giphy.com/media/hW3zmEpouQ3hA5Gd2g/giphy.gif",
			id: 2
		},
		{
			name: "Tumba",
			img: "https://2.bp.blogspot.com/-2tIWYtQW7aM/XIGZsmWBixI/AAAAAAAAG0U/Tbw5ebPdg58pv0BrB6K5dSq5XxX6Q9gSgCLcBGAs/s320/IMG-20180225-WA0049.png",
			id: 3
		},
		{
			name: "Mina",
			img: "https://2.bp.blogspot.com/-MwGBduJQubw/XIGZtXT67JI/AAAAAAAAG0c/E9AtdwTnYMAKbi6XbgVzU67Pu7io8-pmQCLcBGAs/s320/IMG-20180225-WA0050.png",
			id: 4
		}, 
		{
			name: "hija",
			img: "https://3.bp.blogspot.com/-jj695V_1vZk/XIGei1wVCqI/AAAAAAAAG08/W8-uEBpuKUg_Q8pHHY-kbK3ZOm5PnUeLgCLcBGAs/s320/IMG-20180224-WA0041.png",
			id: 5
		},
		{
			name: "Kaimwa",
			img: "https://1.bp.blogspot.com/-WHLPkeegwiA/XIGei17yy5I/AAAAAAAAG1A/VtHIjCNOrRcJ7Tb1RSSH0cFQY102rHVMwCLcBGAs/s320/IMG-20180224-WA0042.png",
			id: 6
		},
		{
			name: "cole",
			img: "https://2.bp.blogspot.com/-QfAFJZs-T6o/XIGei53nfKI/AAAAAAAAG1E/vdzSbmM4pJ827VnMh0ELBdY8ZeqcXQKEQCLcBGAs/s320/IMG-20180224-WA0046.png",
			id: 7
		},
		{
			name: "soborno",
			img: "https://1.bp.blogspot.com/-xrkSf_NgKgg/XIGej7X70sI/AAAAAAAAG1I/8sDyYvoHCOkF81YH68LvbByKu7zRe1ViQCLcBGAs/s320/IMG-20180225-WA0026.png",
			id: 8
		},
		{
			name: "Bilbo",
			img: "https://2.bp.blogspot.com/-NgL_xYyEScI/XIGekKmrytI/AAAAAAAAG1M/e82AxDCQ3cI8WXwCwUE8bziqi2i_Et3owCLcBGAs/s320/IMG-20180225-WA0044.png",
			id: 9
		},
		{
			name: "Coche",
			img: "https://3.bp.blogspot.com/-_CAj-GSVQuo/XIGf3cCOvrI/AAAAAAAAG1k/ZUMuYZAoNmk1gqkvTUsTTYtpA4cMBWmPgCLcBGAs/s320/IMG-20180225-WA0020.png",
			id: 10
		},
		{
			name: "Radio",
			img: "https://2.bp.blogspot.com/-OfiZOc40tzQ/XIGf3u-JsII/AAAAAAAAG1o/EwaFALRSygUv62VAtTjuoV1TKiIm3wXKwCLcBGAs/s320/IMG-20180225-WA0025.png",
			id: 11
		},
		{
			name: "Carta",
			img: "https://4.bp.blogspot.com/-sImqocCqqOo/XIGgcaSx9YI/AAAAAAAAG10/tzqEDAUEXqUKUBwM6vmoMqZ0pzgfasYowCLcBGAs/s320/IMG-20180224-WA0038.png",
			id: 12
		},
	];
    
	Memory.init(cards);


})();