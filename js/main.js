	$(document).ready(function(){
		$('button').width(30);
		$('html').width(200);
		$('html').height(300);
		$('button').height(30);
		$('button#but').click(function() {											//Input id=but
			$('.textbox').val($('.textbox').val() + this.value.toString());
		})
		
		$('button#sum').click(function() {										//Input id=sum
			$('.textbox').val($('.textbox').val() + this.value.toString());
		})
		$('button#add').click(function() {										//Enter
			$('.textbox').val(main($('.textbox').val()));
		})
		$('button#bck').click(function() {										//Backspace
			$('.textbox').val($('.textbox').val().slice(0,-1));
		})
		$('button#c').click(function() {											//Clean
			$('.textbox').val('');
		})
	});

