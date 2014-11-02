$(document).ready(function() {

    var txtBox = $('.textbox');

    $('button').width(30).height(30);

    $('html').width(200).height(300);

    $('.but').click(function() { //Input id=but
        txtBox.val(txtBox.val() + this.value.toString());
    });

    $('.sum').click(function() { //Input id=sum
        txtBox.val(txtBox.val() + this.value.toString());
    });

    $('.add').click(function() { //Enter
        txtBox.val(main(txtBox.val()));
    });

    $('.bck').click(function() { //Backspace
        txtBox.val(txtBox.val().slice(0, -1));
    });

    $('.c').click(function() { //Clean
        txtBox.val('');
    });

});
