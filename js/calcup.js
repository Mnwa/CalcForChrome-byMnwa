function check(text, val){
	var b = text.substring(0,val),e = text.substring(val+1, text.length), num = new Array(),res = new Array();
	for(var i = 0; i!=b.length; i++){
		if(b.substring(i-1,i) == '+' || b.substring(i-1,i) == '-' || b.substring(i-1,i) == '*' || b.substring(i-1,i) == '/' ){
			num.push(i-1);
		}
	}
	if(num.length == 0){
		num.push(0);
		res.push(b.substring(Math.max.apply(Math, num),  b.length));
	}
	else{
		res.push(b.substring(Math.max.apply(Math, num),  b.length));
		}
	num.length=0;
	for(var i = 0; i!=e.length+1; i++){
		if(e.substring(i-1,i) == '+' || e.substring(i-1,i) == '-' || e.substring(i-1,i) == '*' || e.substring(i-1,i) == '/' ){
			num.push(i-1);
		}
	}
	if(num.length == 0){
		num.push(e.length);
	}
	res.push(e.substring(0, Math.min.apply(Math, num)));
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
	num = text.indexOf('&');
	while(num!=-1){
		if(num != -1){
			arr = check(text, num); 
			text = text.replace('&'+arr[1], Math.sqrt(arr[1]));
		}
		num = text.indexOf('&', num+1);
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
	num = text.indexOf(')');
	while(num!=-1){
		io = text.indexOf('(');
		while(io < num && text.indexOf('(', io+1) != -1){
			io = text.indexOf('(', io+1);
		}
		text = text.replace(text.substring(io, num+1), calc(text.substring(io+1, num)));
		num = text.indexOf(')', num+1);
	}
	return calc(text)
}