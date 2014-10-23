	$(document).ready(function(){
		var d = 0;
		for (i=0; i<=9; i++) {															//Создание кнопок 0,1,2..9
			if(i == 0 || i== 3 || i == 6){
				d++;
				$('div#'+d+'').addClass('button');
			}
			$('div#'+d+'').append('<input type="submit" id="'+d+'" value="'+i+'">');
		}
		$('div#but input').click(function() {											//Ввод чисел
			$('.textbox').val($('.textbox').val() + this.value.toString());
		})
		
		$('div.vol input').click(function() {											//Ввод знаков
			$('.textbox').val($('.textbox').val() + this.value.toString());
		})
		
		$('div.vol4 input').click(function() {			//Ввод
			//var text = calc($('.textbox').val());
			$('.textbox').val(main($('.textbox').val()));
		})
	});