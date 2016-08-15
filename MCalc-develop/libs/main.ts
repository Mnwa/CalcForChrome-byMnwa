///<reference path="../typings/tsd.d.ts"/>

$(document).ready(function () {
    let historyArray: Array<string> = `${localStorage["MCalcHistory"]}`.split(",") || new Array();
    $.each(historyArray, function (index, value) {
        if(value){
            $('table tbody').append(`<tr><td><strong>${historyArray.indexOf(value) + 1}.</strong> ${value}</td></tr>`);
        }
        else{
            let removeIt = historyArray.indexOf(value);
            if (removeIt != -1){
                historyArray.slice(removeIt, 1);
            }
        }
    });
    $('button#sHistory').click(function () {
        $('div#CalcBody').toggle('faster');
        $('table').toggle('faster');
    });
    $('button#cHistory').click(function () {
        localStorage["MCalcHistory"] = "";
        historyArray = new Array();
        $('table tbody').html("");
    })
    $('button#but').click(function () {											//Input id=but
        $('.textbox').val($('.textbox').val() + this.value);
    });
    $('button#sum').click(function () {										    //Input id=sum
        $('.textbox').val($('.textbox').val() + this.value);
    });
    $('button#add').click(function () {                                         //Enter
        if ($('.textbox').val()) {
            let addToHistory: string = $('.textbox').val();
            $('.textbox').val(Calculate($('.textbox').val()));
            addToHistory = `${addToHistory} = ${$('.textbox').val()}`;
            historyArray.push(addToHistory);
            $('table tbody').append(`<tr><td><strong>${historyArray.length}.</strong> ${addToHistory}</td></tr>`);
            localStorage["MCalcHistory"] = historyArray.join();
        }
    });
    $('button#bck').click(function () {										    //Backspace
        $('.textbox').val($('.textbox').val().slice(0, -1));
    });
    $('button#c').click(function () {											//Clean
        $('.textbox').val('');
    });
});