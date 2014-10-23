function check(text, val){
	var b = text.substring(0,val),e = text.substring(val+1, text.length), num = new Array(),res = new Array();
	for(var i = 0; i!=b.length; i++){
		if(b.substring(i-1,i) == '+' || b.substring(i-1,i) == '-' || b.substring(i-1,i) == '*' || b.substring(i-1,i) == '/' ){
			num.push(i-1);
		}
	}
	if(num.length == 0){
		res.push(b);
	}
	else{
		res.push(b.substring(Math.max.apply(Math, num),  b.length));
		}
	num.length=0;
	for(var i = 0; i!=e.length+1; i++){
		if((e.substring(i-1,i) == '+' || e.substring(i-1,i) == '-' || e.substring(i-1,i) == '*' || e.substring(i-1,i) == '/') && i-1!=0 && i-1!=-1){
			num.push(i-1);
		}
	}
	
	if(num.length == 0){
		res.push(e);
	}
	else{
		res.push(e.substring(0, Math.min.apply(Math, num)));
	}
	return res
}

function calc(text){
	var num = 0, arr = new Array();
	num=0;
	num = text.indexOf('^');
	while(num!=-1){
		if(num != -1){
			arr = check(text, num); 
			text = text.replace(arr[0]+'^'+arr[1], Math.pow(arr[0],arr[1]));
		}
		num = text.indexOf('^', num+1);
	}
	num=0;
	num = text.indexOf('√');
	while(num!=-1){
		if(num != -1){
			arr = check(text, num); 
			text = text.replace('√'+arr[1], Math.sqrt(arr[1]));
		}
		num = text.indexOf('√', num+1);
	}
	num=0;
	num = text.indexOf('*');
	while(num!=-1){
		if(num != -1){
			arr = check(text, num); 
			text = text.replace(arr[0]+'*'+arr[1], arr[0]*arr[1]);
		}
		num = text.indexOf('*', num+1);
	}
	num=0;
	num = text.indexOf('/');
	while(num!=-1){
		if(num != -1){
			arr = check(text, num); 
			text = text.replace(arr[0]+'/'+arr[1], arr[0]/arr[1]);
		}
		num = text.indexOf('/', num+1);
	}
	num=0;
	num = text.indexOf('+');
	while(num!=-1){
		if(num != -1){
			arr = check(text, num); 
			text = text.replace(arr[0]+'+'+arr[1], parseFloat(arr[0])+parseFloat(arr[1]));
		}
		num = text.indexOf('+', num+1);
	}
	num=0;
	num = text.indexOf('-', num+1);
	while(num!=-1){
		if(num != -1){
			arr = check(text, num); 
			text = text.replace(arr[0]+'-'+arr[1], parseFloat(arr[0])-parseFloat(arr[1]));
		}
		num = text.indexOf('-', num+1);
	}
	return text
}

function main(text){
	var num = 0, io = 0;
	text = text.replace(/π/g,Math.PI);
	text = text.replace(/e/g,Math.E);
	num = text.indexOf('sin(');																					//sin	
	while(num!=-1){
		text = text.replace(/sin\([-0-9.+\/*√^]+\)/, Math.sin(calc(text.substring(num+4, text.indexOf(")",num)))));	
		num = text.indexOf(')', num+1);
	}
	num = text.indexOf('cos(');																					//cos
	while(num!=-1){
		text = text.replace(/cos\([-0-9.+\/*√^]+\)/, Math.cos(calc(text.substring(num+4, text.indexOf(")",num)))));
		num = text.indexOf(')', num+1);
	}
	num = text.indexOf('ctg(');																					//ctan
	while(num!=-1){
		text = text.replace(/ctg\([-0-9.+\/*√^]+\)/, 1/Math.tan(calc(text.substring(num+5, text.indexOf(")",num)))));
		num = text.indexOf(')', num+1);
	}
	num = text.indexOf('tg(');																					//tan
	while(num!=-1){
		text = text.replace(/tg\([-0-9.+\/*√^]+\)/, Math.tan(calc(text.substring(num+4, text.indexOf(")",num)))));
		num = text.indexOf(')', num+1);
	}
	num = text.indexOf('(');																					//(..)
	while(num!=-1){
		text = text.replace(/\([-0-9.+\/*√^]+\)/, calc(text.substring(num+1, text.indexOf(")",num))));
		num = text.indexOf('(', num+1);
	}
	return calc(text)
}