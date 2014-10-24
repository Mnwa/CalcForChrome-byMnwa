	$(document).ready(function(){
		$('div#but input').click(function() {											//Input id=but
			$('.textbox').val($('.textbox').val() + this.value.toString());
		})
		
		$('div.vol input#sum').click(function() {										//Input id=sum
			$('.textbox').val($('.textbox').val() + this.value.toString());
		})
		$('div.vol input#add').click(function() {										//Enter
			$('.textbox').val(main($('.textbox').val()));
		})
		$('div.vol input#bck').click(function() {										//Backspace
			$('.textbox').val($('.textbox').val().slice(0,-1));
		})
		$('div.vol input#c').click(function() {											//Clean
			$('.textbox').val('');
		})
	});