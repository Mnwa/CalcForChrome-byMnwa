function calc(text){
	var reg = /([-0-9.]+)\^([-0-9.]+)/;																		//power
	while(reg.exec(text)!=null){
		text = text.replace(reg, Math.pow(reg.exec(text)[1],reg.exec(text)[2]));
	}
	reg = /√([-0-9.]+)/;																					//square
	while(reg.exec(text)!=null){
		text = text.replace(reg, Math.sqrt(reg.exec(text)[1]));
	}
	reg = /([-0-9.]+)\*([-0-9.]+)/;																			//multiplication
	while(reg.exec(text)!=null){
		text = text.replace(reg, reg.exec(text)[1]*reg.exec(text)[2]);
	}
	reg = /([-0-9.]+)\/([-0-9.]+)/;																			//division
	while(reg.exec(text)!=null){	
		text = text.replace(reg, reg.exec(text)[1]/reg.exec(text)[2]);
	}
	reg = /([-0-9.]+)\+([-0-9.]+)/;																			//addition
	while(reg.exec(text)!=null){
		text = text.replace(reg, parseFloat(reg.exec(text)[1])+parseFloat(reg.exec(text)[2]));
	}
	reg = /([0-9.]+)-([0-9.]+)/;																			//subtraction
	while(reg.exec(text)!=null){
		text = text.replace(reg, parseFloat(reg.exec(text)[1])-parseFloat(reg.exec(text)[2]));
	}
	return text
}

function main(text){
	text = text.replace(/π/g,Math.PI);
	text = text.replace(/e/g,Math.E);
	var reg = /sin\(([-0-9.+\/*√^]+)\)/;																		//sin	
	while(reg.exec(text)!=null){
		text = text.replace(reg, Math.sin(calc(reg.exec(text)[1])));	
	}
	reg = /cos\(([-0-9.+\/*√^]+)\)/;																			//cos
	while(reg.exec(text)!=null){
		text = text.replace(reg, Math.cos(calc(reg.exec(text)[1])));
	}
	reg = /ctg\(([-0-9.+\/*√^]+)\)/;																			//ctan
	while(reg.exec(text)!=null){
		text = text.replace(reg, 1/Math.tan(calc(reg.exec(text)[1])));
	}
	reg = /tg\(([-0-9.+\/*√^]+)\)/;																				//tan
	while(reg.exec(text)!=null){
		text = text.replace(reg, Math.tan(calc(reg.exec(text)[1])));
	}
	reg = /\(([-0-9.+\/*√^]+)\)/;																				//(..)
	while(reg.exec(text)!=null){
		text = text.replace(reg, calc(reg.exec(text)[1]));
	}
	return calc(text)
}