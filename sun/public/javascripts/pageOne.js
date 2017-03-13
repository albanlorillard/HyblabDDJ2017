
function esc_quot(text)
{
	var truc = text.replace("'", " ");
	return truc.replace('"', " ");
}

function coverToolTipOn(artist, title)
{
	document.getElementById("toolTipCover").innerHTML = artist + " - " + title ;
}

function coverToolTipOff()
{

}


function giveCovers(genre)
{
	$.getJSON('./5LastGenre/'+genre+'/', function(data2)
	{
		var CoverList = "";
		for (var i = 0, len = data2.length; i < len; i++) {
			(function(i) {
				var title=data2[i].title;
				var artist=data2[i].artist;
				$.getJSON('./Cover/' + artist + '/' + title + '/', function (data3) {
					if (data3 && data3.track && data3.track.album && data3.track.album.image && (data3.track.album.image[2]['#text'] != "")) {
						Cover = data3.track.album.image[2]['#text'];
						CoverList += "<img src=\"" + Cover + "\"  onMouseOver=' coverToolTipOn(\"" + esc_quot(artist) + "\", \"" + esc_quot(title) + "\");' onMouseOut='coverToolTipOff();'/>";
					}
					else {
						CoverList += "<img src=\"./images/jacket-blanc.png\" alt='Pochette non trouvée'  onMouseOver=' coverToolTipOn(\"" + esc_quot(artist) + "\", \"" + esc_quot(title) + "\");' onMouseOut='coverToolTipOff();'/>";
					}
					document.getElementById("Cover").innerHTML = CoverList;
					//else throw 'errordejugement'
				});//end first get json
			})(i)
		}//end for each
	});
}
function giveCoversMood(genre)
{
    $.getJSON('./5LastMood/'+genre+'/', function(data2)
    {
        var CoverList = "";
        for (var i = 0, len = data2.length; i < len; i++) {
            (function(i) {
				var title=data2[i].title;
				var artist=data2[i].artist;
				$.getJSON('./Cover/' + artist + '/' + title + '/', function (data3) {
					if (data3 && data3.track && data3.track.album && data3.track.album.image && (data3.track.album.image[2]['#text'] != "")) {
						Cover = data3.track.album.image[2]['#text'];
						CoverList += "<img src=\"" + Cover + "\"  onMouseOver=' coverToolTipOn(\"" + esc_quot(artist) + "\", \"" + esc_quot(title) + "\");' onMouseOut='coverToolTipOff();'/>";
					}
					else {
						CoverList += "<img src=\"./images/jacket-blanc.png\" alt='Pochette non trouvée'  onMouseOver='coverToolTipOn(\"" + esc_quot(artist) + "\", \"" + esc_quot(title) + "\");' onMouseOut='coverToolTipOff();'/>";
					}
					document.getElementById("Cover").innerHTML = CoverList;
					//else throw 'errordejugement'
				});//end first get json
			})(i)
        }//end for each
    });
}

function putRandWeek()
{
	rand = Math.floor(Math.random() * 11) + 1;
    switch (rand) {
    	case 1 :
    		$.getJSON('./ThisWeekRock/', function(data)
    		{ 
    			number=data[0].value;
				if (number>1)
    				document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeurs ont voulu écouter du rock."
				else
					document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeur a voulu écouter du rock."
    			document.getElementById("randomWeek2").innerHTML ="Et vous, vous écoutez quoi ?";

				giveCovers("Rock");
    		});
    		
    		
    		break;
    	case 2 :
    		$.getJSON('./ThisWeekAlternativeEtPunk/', function(data) {
    			number=data[0].value;
				if (number>1)
    				document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeurs ont partagé des musiques alternatives et punks."
				else
					document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeur a partagé des musiques alternatives et punks."
    			document.getElementById("randomWeek2").innerHTML ="Et vous, vous écoutez quoi ?"

				giveCovers("Alternative et punk");

			});
    		break;
    	case 3 :
    		$.getJSON('./ThisWeekUrban/', function(data) {
    			number=data[0].value;
				if (number>1)
    				document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeurs ont choisi de vous faire découvrir des musiques urbaines."
				else
					document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeur a choisi de vous faire découvrir des musiques urbaines."
    			document.getElementById("randomWeek2").innerHTML ="Et vous, vous écoutez quoi ?"

				giveCovers("Urban");
    		});
    		break;
    	case 4 :
    		$.getJSON('./ThisWeekElectronica/', function(data) {
    			number=data[0].value;
				if (number>1)
    				document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeurs ont décidé de danser sur de la musique électronique."
				else
					document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeur a décidé de danser sur de la musique électronique."
    			document.getElementById("randomWeek2").innerHTML ="Et vous, vous écoutez quoi ?"

				giveCovers("Electronica");
    	});
    		break;
    	
    	case 5 :
    		$.getJSON('./ThisWeekJazz/', function(data) {
    			number=data[0].value;
				if (number>1)
    				document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeurs ont partagé leur musique de jazz préférée."
				else
					document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeur a partagé sa musique de jazz préférée."
    			document.getElementById("randomWeek2").innerHTML ="Et vous, vous écoutez quoi ?"

				giveCovers("Jazz");
    		});
    		break;
    	
    	case 6 :
    		$.getJSON('./ThisWeekPop/', function(data) {
    			number=data[0].value;
				if (number>1)
    				document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeurs ont choisi de danser sur des chansons pop."
				else
					document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeur a choisi de danser sur des chansons pop."
    			document.getElementById("randomWeek2").innerHTML ="Et vous, vous écoutez quoi ?"

				giveCovers("Pop");
    		});
    		break;
    	case 7 :
    		$.getJSON('./ThisWeekNostalgique/', function(data) {
    			number=data[0].value;
				if (number>1)
    				document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeurs se sentaient nostalgique."
				else
					document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeur se sentait nostalgique."
    			document.getElementById("randomWeek2").innerHTML ="Et vous, quelle est votre humeur ? "
                giveCoversMood("Nostalgique");
    		});
    		break;
    	case 8 :
    		$.getJSON('./ThisWeekCool/', function(data) {
    			number=data[0].value;
				if (number>1)
    				document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeurs étaient d’humeur cool."
				else
					document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeur était d’humeur cool."
    			document.getElementById("randomWeek2").innerHTML ="Et vous, quelle est votre humeur ? "
                giveCoversMood("Cool");
    		});
    		break;
    	case 9 :
    		$.getJSON('./ThisWeekStimulante/', function(data) {
    			number=data[0].value;
				if (number>1)
    				document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeurs ont voulu vous transmettre leur énergie."
				else
					document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeur a voulu vous transmettre son énergie."
    			document.getElementById("randomWeek2").innerHTML ="Et vous, quelle est votre humeur ? "
                giveCoversMood("Stimulante");
    		});
    		break;
    	case 10 :
    		$.getJSON('./ThisWeekAgressive/', function(data) {
    			number=data[0].value;
				if (number>1)
    				document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeurs ont partagé des musiques énervées."
				else
					document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeur a partagé des musiques énervées."
    			document.getElementById("randomWeek2").innerHTML ="Et vous, quelle est votre humeur ? "
                giveCoversMood("Agressive");
    		});
    		break;
    	case 11 :
    		$.getJSON('./ThisWeekSentimentale/', function(data) {
    			number=data[0].value;
				if (number>1)
    				document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeurs ont choisi de partager leurs sentiments."
				else
					document.getElementById("randomWeek").innerHTML ="Cette semaine, " + number + " auditeur a choisi de partager ses sentiments."
    			document.getElementById("randomWeek2").innerHTML ="Et vous, quelle est votre humeur ? "
                giveCoversMood("Sentimentale");
    		});
    		break;
    }
}
putRandWeek();




$(document).ready(function() {
    $('#fullpage').fullpage();
    $.fn.fullpage.setAllowScrolling(true);
    $.fn.fullpage.setKeyboardScrolling(true);
});

$(document).ready(function() {
    $('.js-scrollTo').on('click', function() {
        $.fn.fullpage.moveSectionDown();
    }); 
});

/*$('input[type="range"]').rangeslider();
$('input[type="range"]').rangeslider('destroy');
$('input[type="range"]').rangeslider('update', true);*/