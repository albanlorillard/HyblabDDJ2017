$(document).ready(function() {
      $('#timeline_value1').html((" " + ($('#timeline1').val()*2) + "h " + " - " + ($('#timeline1').val()*2+2) + "h "));
      $('#timeline_value2').html((" " + ($('#timeline2').val()*2) + "h " + " - " + ($('#timeline2').val()*2+2) + "h "));
    });

$(document).on('input change', '#timeline1', function() {
      $('#timeline2').val($('#timeline1').val());
      $('#timeline_value1').html((" " + ($('#timeline1').val()*2) + "h " + " - " + ($('#timeline1').val()*2+2) + "h "));
      $('#timeline_value2').html((" " + ($('#timeline1').val()*2) + "h " + " - " + ($('#timeline1').val()*2+2) + "h "));
});

$(document).on('input change', '#timeline2', function() {
      $('#timeline1').val($('#timeline2').val());
      $('#timeline_value1').html((" " + ($('#timeline2').val()*2) + "h " + " - " + ($('#timeline2').val()*2+2) + "h "));
      $('#timeline_value2').html((" " + ($('#timeline2').val()*2) + "h " + " - " + ($('#timeline2').val()*2+2) + "h "));
});

//$(document).on('click change','#');

function toggleOne(el){
    if(el.className!="pause")
    {
        el.src='./images/bouton_semaine_weekend_page2v2.png';
        el.className="pause";
    }
    else if(el.className=="pause")
    {
        el.src='./images/bouton_semaine_weekend_page2.png';
        el.className="play";
    }
    return false;
}

function toggleTwo(el){
    if(el.className!="pause")
    {
        el.src='./images/ambiance_off.svg';
        el.className="pause";
    }
    else if(el.className=="pause")
    {
    	el.src='./images/ambiance_on.svg';
        el.className="play";
    }
    return false;
}

function toggleThree(el){
    if(el.className!="pause")
    {
       el.src='./images/btn-weekend.svg';
       el.className="pause";
    }
    else if(el.className=="pause")
    {
        el.src='./images/btn-semaine.svg';
        el.className="play";
    }
    
    return false;
}

function synchroRadio()
{
    var saison;
    saison = $("input[name=credit-card]:checked").val();
}

function changeImagePrintemps()
{
    var img = document.getElementById("image");
    img.src="./images/btn-saison1.png";
    return false;
}

function changeImageHiver()
{
   var img = document.getElementById("image");
   img.src="./images/btn-saison2.png";
	return false;
}

function changeImageAutomne()
{
    var img = document.getElementById("image");
    img.src="./images/btn-saison4.png";
	return false;
}

function changeImageEte()
{
    var img = document.getElementById("image");
    img.src="./images/btn-saison3.png";
    return false;
}

function changer_image(image) {
   $('.image').css('background-image', 'url("'+image+'")');
}


$('input[name=credit-card]').on('change', function() {
    var saison;
    saison = $('input[name=credit-card]:checked').val();
    if(saison == 'printemps')
    {
        val_saison = 0;
    }
    else if(saison == 'ete')
    {
        val_saison = 1;
    }
    else if(saison == 'automne')
    {
        val_saison = 2;
    }
    else if(saison == 'hiver')
    {
        val_saison = 3;
    }
    $('#slider').roundSlider("option", "value", val_saison);
    changeBubble(getRoad());
});

// Présélections
$(function() {
    var today = new Date();

    //Présélection saisons
    var ladate=Date.parse(today);
    var lannee = today.getFullYear();
    var dateprintemps  =Date.parse(new Date(lannee, 2, 21));
    var dateete        =Date.parse(new Date(lannee, 5, 21));
    var dateautomne    =Date.parse(new Date(lannee, 8, 21));
    var datehiver      =Date.parse(new Date(lannee, 11, 21));
    if(ladate>=dateprintemps && ladate<dateete)
    {
        document.getElementById("printemps").checked = true;
        document.getElementById("ete").checked = false;
        document.getElementById("automne").checked = false;
        document.getElementById("hiver").checked = false;
    }
    else if(ladate>=dateete && ladate<dateautomne)
    {
        document.getElementById("printemps").checked = false;
        document.getElementById("ete").checked = true;
        document.getElementById("automne").checked = false;
        document.getElementById("hiver").checked = false;
    }
    else if(ladate>=dateautomne && ladate<datehiver)
    {
        document.getElementById("printemps").checked = false;
        document.getElementById("ete").checked = false;
        document.getElementById("automne").checked = true;
        document.getElementById("hiver").checked = false;
    }
    else if(ladate>=datehiver || ladate<dateprintemps)
    {
        document.getElementById("printemps").checked = true;
        document.getElementById("ete").checked = false;
        document.getElementById("automne").checked = false;
        document.getElementById("hiver").checked = true;
    }

    //Présélection week / weekend

    if (today.getDay() == 0 || today.getDay() == 6 )
        document.getElementById("weekOrWeekEnd1").className == "pause";
    else
        document.getElementById("weekOrWeekEnd1").className == "play";

    // Présélection des heures
    if (today.getHours() < 2)
        document.getElementById("timeline1").value = 0;
    else if (today.getHours() < 4)
        document.getElementById("timeline1").value = 1;
    else if (today.getHours() < 6)
        document.getElementById("timeline1").value = 2;
    else if (today.getHours() < 8)
        document.getElementById("timeline1").value = 3;
    else if (today.getHours() < 10)
        document.getElementById("timeline1").value = 4;
    else if (today.getHours() < 12)
        document.getElementById("timeline1").value = 5;
    else if (today.getHours() < 14)
        document.getElementById("timeline1").value = 6;
    else if (today.getHours() < 16)
        document.getElementById("timeline1").value = 7;
    else if (today.getHours() < 18)
        document.getElementById("timeline1").value = 8;
    else if (today.getHours() < 20)
        document.getElementById("timeline1").value = 9;
    else if (today.getHours() < 22)
        document.getElementById("timeline1").value = 10;
    else if (today.getHours() >= 22)
        document.getElementById("timeline1").value = 11;
    else
        document.getElementById("timeline1").value = 6;

    document.getElementById("timeline_value1").innerHTML = document.getElementById("timeline1").value*2 +"h - "+(document.getElementById("timeline1").value*2+2)+"h";
});


//changer_image();
//toggle();
/*toggleTwo();
toggleThree();*/
/*changeImagePrintemps();
changeImageHiver();
changeImageAutomne();
changeImageEte();*/