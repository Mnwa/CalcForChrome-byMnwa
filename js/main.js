	$(document).ready(function(){
		$('div#but input').click(function() {											//Ввод чисел
			$('.textbox').val($('.textbox').val() + this.value.toString());
		})
		
		$('div.vol input#sum').click(function() {											//Ввод знаков
			$('.textbox').val($('.textbox').val() + this.value.toString());
		})
		$('div.vol input#add').click(function() {			//Ввод
			$('.textbox').val(main($('.textbox').val()));
		})
		$('div.vol input#bck').click(function() {			//Backspace
			$('.textbox').val($('.textbox').val().slice(0,-1));
		})
		$('div.vol input#c').click(function() {			//Clean
			$('.textbox').val('');
		})
	});