///<reference path="../typings/tsd.d.ts"/>

var Calculate = (stringForCalc: string): string => {
    stringForCalc = stringForCalc.replace(/\s/g, "");
    stringForCalc = stringForCalc.replace(/,/g, ".");
    stringForCalc = stringForCalc.replace(/:/g, "/");

    let calc = (stringForCalc: string): number => Number(Calculate(stringForCalc));

    let reg: RegExp = /([-0-9.]+)°/;
    while (reg.exec(stringForCalc)) {
        stringForCalc = stringForCalc.replace(reg, `(${reg.exec(stringForCalc)[1]}*π/180)`);
    }

    stringForCalc = stringForCalc.replace(/π/g, `${math.pi}`);
    stringForCalc = stringForCalc.replace(/e/g, `${math.e}`);

    reg = /arcsin\(([-0-9.+/*√^]+)\)/;																		//Asin	
    while (reg.exec(stringForCalc)) {
        stringForCalc = stringForCalc.replace(reg, math.asin(calc(reg.exec(stringForCalc)[1])).toString());
    }
    reg = /arccos\(([-0-9.+/*√^]+)\)/;																		//Acos
    while (reg.exec(stringForCalc)) {
        stringForCalc = stringForCalc.replace(reg, Math.acos(calc(reg.exec(stringForCalc)[1])).toString());
    }
    reg = /arctg\(([-0-9.+/*√^]+)\)/;																		//Atan
    while (reg.exec(stringForCalc)) {
        stringForCalc = stringForCalc.replace(reg, math.atan(calc(reg.exec(stringForCalc)[1])).toString());
    }
    reg = /arcctg\(([-0-9.+/*√^]+)\)/;																		//Acot
    while (reg.exec(stringForCalc)) {
        stringForCalc = stringForCalc.replace(reg, math.acot(calc(reg.exec(stringForCalc)[1])).toString());
    }
    reg = /sin\(([-0-9.+/*√^]+)\)/;																			//Sin	
    while (reg.exec(stringForCalc)) {
        stringForCalc = stringForCalc.replace(reg, math.sin(calc(reg.exec(stringForCalc)[1])).toString());
    }
    reg = /cos\(([-0-9.+/*√^]+)\)/;																			//Cos
    while (reg.exec(stringForCalc)) {
        stringForCalc = stringForCalc.replace(reg, Math.cos(calc(reg.exec(stringForCalc)[1])).toString());
    }
    reg = /tg\(([-0-9.+/*√^]+)\)/;																			//Tan
    while (reg.exec(stringForCalc)) {
        stringForCalc = stringForCalc.replace(reg, math.tan(calc(reg.exec(stringForCalc)[1])).toString());
    }
    reg = /ctg\(([-0-9.+/*√^]+)\)/;																			//Cot
    while (reg.exec(stringForCalc)) {
        stringForCalc = stringForCalc.replace(reg, math.cot(calc(reg.exec(stringForCalc)[1])).toString());
    }

    reg = /lg\(([-0-9.+/*√^]+)\)/;																			//Lg
    while (reg.exec(stringForCalc)) {
        stringForCalc = stringForCalc.replace(reg, math.log10(calc(reg.exec(stringForCalc)[1])).toString());
    }
    reg = /ln\(([-0-9.+/*√^]+)\)/;																			//Ln
    while (reg.exec(stringForCalc)) {
        stringForCalc = stringForCalc.replace(reg, math.log(calc(reg.exec(stringForCalc)[1])).toString());
    }

    reg = /\(([-0-9.+/*√^]+)\)/                                                                             //Round brackets
    while (reg.exec(stringForCalc)) {
        stringForCalc = stringForCalc.replace(reg, calc(reg.exec(stringForCalc)[1]).toString());
    }

    reg = /([0-9.]+)\^(-?[0-9.]+)/;				                                                            //Pow																						//power
    while (reg.exec(stringForCalc)) {
        stringForCalc = math.pow(reg.exec(stringForCalc)[1], reg.exec(stringForCalc)[2]).toString();
    }
    reg = /√([0-9.]+)/;                                                                                     //Sqrt																																//square
    while (reg.exec(stringForCalc)) {
        stringForCalc = stringForCalc.replace(reg, math.sqrt(reg.exec(stringForCalc)[1]).toString());
    }

    let resultFromMath: number;
    reg = /(-?\+?[0-9.]+)\*(-?\+?[0-9.]+)|(-?\+?[0-9.]+)\/(-?\+?[0-9.]+)/;					                //Multiply and Divide														//multiplication and division
    while (reg.exec(stringForCalc)) {
        if (reg.exec(stringForCalc)[1]) {                                                                            //Multiply
            resultFromMath = Number(math.format(math.multiply(reg.exec(stringForCalc)[1], reg.exec(stringForCalc)[2]), {precision: 14}))
            if (resultFromMath < 0) {
                stringForCalc = stringForCalc.replace(reg, resultFromMath.toString());
            }
            else {
                stringForCalc = stringForCalc.replace(reg, `+${resultFromMath}`);
            }
        }
        else {                                                                                               //Divide
            resultFromMath = Number(math.format(math.divide(reg.exec(stringForCalc)[3], reg.exec(stringForCalc)[4]), {precision: 14}))
            if (resultFromMath < 0) {
                stringForCalc = stringForCalc.replace(reg, resultFromMath.toString());
            }
            else {
                stringForCalc = stringForCalc.replace(reg, `+${resultFromMath}`);
            }
        }
    }

    reg = /(-?\+?[0-9.]+)\+(-?\+?[0-9.]+)|(-?\+?[0-9.]+)-(-?\+?[0-9.]+)/;                                   //Add and subtract                                																		//addition and subtraction	
    while (reg.exec(stringForCalc)) {
        if (reg.exec(stringForCalc)[1]) {                                                                            //Plus
            resultFromMath = Number(math.format(math.add(reg.exec(stringForCalc)[1], reg.exec(stringForCalc)[2]), {precision: 14}));
            if (resultFromMath < 0) {
                stringForCalc = stringForCalc.replace(reg, resultFromMath.toString());
            }
            else {
                stringForCalc = stringForCalc.replace(reg, `+${resultFromMath}`);
            }
        }
        else {                                                                                              //Minus
            resultFromMath = Number(math.format(math.subtract(reg.exec(stringForCalc)[3], reg.exec(stringForCalc)[4]), {precision: 14}))
            if (resultFromMath < 0) {
                stringForCalc = stringForCalc.replace(reg, resultFromMath.toString());
            }
            else {
                stringForCalc = stringForCalc.replace(reg, `+${resultFromMath}`);
            }
        }
    }
    stringForCalc = stringForCalc.replace(/\+/g, "");
    return stringForCalc
}
