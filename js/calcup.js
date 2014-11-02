function calc(text) {

    var reg = /([0-9.]+)\^(-?[0-9.]+)/; //power

    while (reg.exec(text) != null) {
        text = text.replace(reg, Math.pow(reg.exec(text)[1], reg.exec(text)[2]));
    }

    reg = /√([0-9.]+)/; //square

    while (reg.exec(text) != null) {
        text = text.replace(reg, Math.sqrt(reg.exec(text)[1]));
    }

    reg = /(-?\+?[0-9.]+)\*(-?\+?[0-9.]+)|(-?\+?[0-9.]+)\/(-?\+?[0-9.]+)/; //multiplication and division

    while (reg.exec(text) != null) {
        if (reg.exec(text)[1] != undefined) {
            test = reg.exec(text)[1] * reg.exec(text)[2];
            if (test < 0) {
                text = text.replace(reg, test);
            }
            else {
                text = text.replace(reg, "+" + test);
            }
        }
        else {
            test = reg.exec(text)[3] / reg.exec(text)[4];
            if (test < 0) {
                text = text.replace(reg, test);
            }
            else {
                text = text.replace(reg, "+" + test);
            }
        }
    }

    reg = /(-?\+?[0-9.]+)\+(-?\+?[0-9.]+)|(-?\+?[0-9.]+)-(-?\+?[0-9.]+)/; //addition and subtraction

    while (reg.exec(text) != null) {
        if (reg.exec(text)[1] != undefined) {
            test = parseFloat(reg.exec(text)[1]) + parseFloat(reg.exec(text)[2]);
            if (test < 0) {
                text = text.replace(reg, test);
            }
            else {
                text = text.replace(reg, "+" + test);
            }
        }
        else {
            test = parseFloat(reg.exec(text)[3]) - parseFloat(reg.exec(text)[4]);
            if (test < 0) {
                text = text.replace(reg, test);
            }
            else {
                text = text.replace(reg, "+" + test);
            }
        }
    }

    text = text.replace(/\+/g, "");

    return text
}

function main(text) {

    text = text.replace(/\s/g, "").replace(/,/g, ".").replace(/:/g, "/");

    var reg = /([-0-9.]+)°/;

    while (reg.exec(text) != null) {
        text = text.replace(reg, "($1*π/180)");
    }

    text = text.replace(/π/g, Math.PI).replace(/e/g, Math.E);

    reg = /sin\(([-0-9.+/*√^]+)\)/; //sin

    while (reg.exec(text) != null) {
        text = text.replace(reg, Math.sin(calc(reg.exec(text)[1])));
    }

    reg = /lg\(([-0-9.+/*√^]+)\)/; //log

    while (reg.exec(text) != null) {
        text = text.replace(reg, Math.log10(calc(reg.exec(text)[1])));
    }

    reg = /ln\(([-0-9.+/*√^]+)\)/; //log

    while (reg.exec(text) != null) {
        text = text.replace(reg, Math.log(calc(reg.exec(text)[1])));
    }

    reg = /cos\(([-0-9.+/*√^]+)\)/; //cos

    while (reg.exec(text) != null) {
        text = text.replace(reg, Math.cos(calc(reg.exec(text)[1])));
    }

    reg = /ctg\(([-0-9.+/*√^]+)\)/; //ctan

    while (reg.exec(text) != null) {
        text = text.replace(reg, 1 / Math.tan(calc(reg.exec(text)[1])));
    }

    reg = /tg\(([-0-9.+/*√^]+)\)/; //tan

    while (reg.exec(text) != null) {
        text = text.replace(reg, Math.tan(calc(reg.exec(text)[1])));
    }

    reg = /\(([-0-9.+/*√^]+)\)/; //(..)

    while (reg.exec(text) != null) {
        text = text.replace(reg, calc(reg.exec(text)[1]));
    }

    return calc(text);
}
