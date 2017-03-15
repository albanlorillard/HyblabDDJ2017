/**
 * Created by alban on 28/01/17.
 * Get all datas for us.
 */
var db = require('./dbconnect');

var data = {
    // Get All Datas (with join of the 2 tables)
    getAllData:function(callback) {
        return db.query("SELECT * FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id", callback);
    },

    //TODO: CHANGE With DATE(NOW()) with DATE(NOW())
    getToday:function(callback) {
        return db.query("SELECT performer AS artist, W.title, album, year, genre, prenom FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id ORDER BY date_heure_diffusion_reelle DESC LIMIT 10", callback);
    },

    // Get occurency of each music genre between a day & the season
    // Day use "DAYOFWEEK" : 1=sunday, 2=monday ...
    // Season : autumn, summer, spring or winter (/!\ lowcase)

    getCreneauSeasonWeekHour:function(season, week, start, end, callback)
    {
        var intervalle = "";
        switch(season)
        {
            case "winter":
                intervalle = "DAYOFYEAR(date_heure_diffusion_reelle) < 80 OR DAYOFYEAR(date_heure_diffusion_reelle) >= 355";
                break;
            case "spring":
                intervalle = "DAYOFYEAR(date_heure_diffusion_reelle) >= 80 AND DAYOFYEAR(date_heure_diffusion_reelle) < 172";
                break;
            case "summer":
                intervalle = "DAYOFYEAR(date_heure_diffusion_reelle) >= 172 AND DAYOFYEAR(date_heure_diffusion_reelle) < 264";
                break;
            case "autumn":
                intervalle = "DAYOFYEAR(date_heure_diffusion_reelle) >= 264 AND DAYOFYEAR(date_heure_diffusion_reelle) < 355";
                break;
            default:
                throw "Bad season";
                break;
        }

        if ( (!/\d/.test(week)) &&  (week.length!=1) )
            throw "Bad week format";
        else if (intervalle == "")
            throw "Bad interval format";
        else if(season > 6 && !/\D{6}/.test(season))
            throw "Bad season format";
        else
        if (week == 0) // Week
            return db.query("SELECT count(*) AS value, _genre4 AS id FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE _genre4 <>''AND _genre4<>'Classique' AND _genre4<>'Bande originale' AND _genre4<>'Musique traditionnelle' AND _genre4 <>'Autres' AND ("+intervalle+") AND WEEKDAY(date_heure_diffusion_reelle)<='4' AND HOUR(date_heure_diffusion_reelle)>='"+start+"' AND HOUR(date_heure_diffusion_reelle)<='"+end+"'  GROUP BY _genre4;", callback)
        else if (week == 1) // Week End
            return db.query("SELECT count(*) AS value, _genre4 AS id FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE _genre4 <>''AND _genre4<>'Classique' AND _genre4<>'Bande originale' AND _genre4<>'Musique traditionnelle' AND _genre4 <>'Autres' AND ("+intervalle+") AND WEEKDAY(date_heure_diffusion_reelle)>='5' AND HOUR(date_heure_diffusion_reelle)>='"+start+"' AND HOUR(date_heure_diffusion_reelle)<='"+end+"' GROUP BY _genre4;", callback)
        //return db.query("SELECT count(*), _genre4 FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE DAYOFYEAR(date_heure_diffusion_reelle) < DAYOFYEAR(NOW()) AND DAYOFYEAR(date_heure_diffusion_reelle) >= (DAYOFYEAR(NOW())-1) GROUP BY _genre4;", callback)
    },
getMoodSeasonWeekHour:function(mood,season, week, start, end, callback)
    {
        var intervalle = "";
        switch(season)
        {
            case "winter":
                intervalle = "DAYOFYEAR(date_heure_diffusion_reelle) < 80 OR DAYOFYEAR(date_heure_diffusion_reelle) >= 355";
                break;
            case "spring":
                intervalle = "DAYOFYEAR(date_heure_diffusion_reelle) >= 80 AND DAYOFYEAR(date_heure_diffusion_reelle) < 172";
                break;
            case "summer":
                intervalle = "DAYOFYEAR(date_heure_diffusion_reelle) >= 172 AND DAYOFYEAR(date_heure_diffusion_reelle) < 264";
                break;
            case "autumn":
                intervalle = "DAYOFYEAR(date_heure_diffusion_reelle) >= 264 AND DAYOFYEAR(date_heure_diffusion_reelle) < 355";
                break;
            default:
                throw "Bad season";
                break;
        }

        if ( (!/\d/.test(week)) &&  (week.length!=1) )
            throw "Bad week format";
        else if (intervalle == "")
            throw "Bad interval format";
        else if(season > 6 && !/\D{6}/.test(season))
            throw "Bad season format";
        else
        switch(mood)
        {
            case "Nostalgique":
                if (week == 0) // Week
                    return db.query("SELECT count(*) AS value FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE ("+intervalle+") AND WEEKDAY(date_heure_diffusion_reelle)<='4' AND HOUR(date_heure_diffusion_reelle)>='"+start+"' AND HOUR(date_heure_diffusion_reelle)<='"+end+"'AND (_mood1='Grisante' OR _mood1='Mélancolique' OR _mood1='Nostalgique' OR _mood1='Tourmentée');", callback);
                else if (week == 1) // Week End
                    return db.query("SELECT count(*) AS value FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE ("+intervalle+") AND WEEKDAY(date_heure_diffusion_reelle)>='5' AND HOUR(date_heure_diffusion_reelle)>='"+start+"' AND HOUR(date_heure_diffusion_reelle)<='"+end+"'AND (_mood1='Grisante' OR _mood1='Mélancolique' OR _mood1='Nostalgique' OR _mood1='Tourmentée');", callback);
                break;
            case "Cool" :
                if (week == 0) // Week
                        return db.query("SELECT count(*) AS value FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE ("+intervalle+") AND WEEKDAY(date_heure_diffusion_reelle)<='4' AND HOUR(date_heure_diffusion_reelle)>='"+start+"' AND HOUR(date_heure_diffusion_reelle)<='"+end+"'AND (_mood1='Brûlante' OR _mood1='Cool' OR _mood1='Enflammée' OR _mood1='Insouciante' OR _mood1='Paisible');", callback);
                else if (week == 1) // Week End
                        return db.query("SELECT count(*) AS value FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE ("+intervalle+") AND WEEKDAY(date_heure_diffusion_reelle)>='5' AND HOUR(date_heure_diffusion_reelle)>='"+start+"' AND HOUR(date_heure_diffusion_reelle)<='"+end+"'AND (_mood1='Brûlante' OR _mood1='Cool' OR _mood1='Enflammée' OR _mood1='Insouciante' OR _mood1='Paisible');", callback);
                break;
            case "Stimulante":
                if (week == 0) // Week
                     return db.query("SELECT count(*) AS value FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE ("+intervalle+") AND WEEKDAY(date_heure_diffusion_reelle)<='4' AND HOUR(date_heure_diffusion_reelle)>='"+start+"' AND HOUR(date_heure_diffusion_reelle)<='"+end+"'AND (_mood1='Stimulante' OR _mood1='Vigoureuse' OR _mood1='Exaltante' OR _mood1='Sensuelle' OR _mood1='Enjouée' OR _mood1='Agitée' );", callback);
                else if (week == 1) // Week End
                     return db.query("SELECT count(*) AS value FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE ("+intervalle+") AND WEEKDAY(date_heure_diffusion_reelle)>='5' AND HOUR(date_heure_diffusion_reelle)>='"+start+"' AND HOUR(date_heure_diffusion_reelle)<='"+end+"'AND (_mood1='Stimulante' OR _mood1='Vigoureuse' OR _mood1='Exaltante' OR _mood1='Sensuelle' OR _mood1='Enjouée' OR _mood1='Agitée');", callback);
                break;
            case "Agressive":   
                if (week == 0) // Week
                    return db.query("SELECT count(*) AS value FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE ("+intervalle+") AND WEEKDAY(date_heure_diffusion_reelle)<='4' AND HOUR(date_heure_diffusion_reelle)>='"+start+"' AND HOUR(date_heure_diffusion_reelle)<='"+end+"'AND (_mood1='Chahuteuse' OR _mood1='Provocante' OR _mood1='Agressive' OR _mood1='Ténébreuse');", callback);
                else if (week == 1) // Week End
                    return db.query("SELECT count(*) AS value FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE ("+intervalle+") AND WEEKDAY(date_heure_diffusion_reelle)>='5' AND HOUR(date_heure_diffusion_reelle)>='"+start+"' AND HOUR(date_heure_diffusion_reelle)<='"+end+"'AND (_mood1='Chahuteuse' OR _mood1='Provocante' OR _mood1='Agressive' OR _mood1='Ténébreuse');", callback);
                break;
            case "Sentimentale":
                if (week == 0) // Week
                    return db.query("SELECT count(*) AS value FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE ("+intervalle+") AND WEEKDAY(date_heure_diffusion_reelle)<='4' AND HOUR(date_heure_diffusion_reelle)>='"+start+"' AND HOUR(date_heure_diffusion_reelle)<='"+end+"' AND (_mood1='Sentimentale' OR _mood1='Romantique' OR _mood1='Réaliste' OR _mood1='Sophistiquée'  OR _mood1='Sérieuse' OR _mood1='Tendre');", callback);
                else if (week == 1) // Week End
                    return db.query("SELECT count(*) AS value FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE ("+intervalle+") AND WEEKDAY(date_heure_diffusion_reelle)>='5' AND HOUR(date_heure_diffusion_reelle)>='"+start+"' AND HOUR(date_heure_diffusion_reelle)<='"+end+"' AND (_mood1='Sentimentale' OR _mood1='Romantique' OR _mood1='Réaliste' OR _mood1='Sophistiquée'  OR _mood1='Sérieuse' OR _mood1='Tendre');", callback);
                break;
            default:
                throw "Bad mood";
                break;


        }
        
    },
     //TODO: CHANGE With DATE(NOW()) with DATE(NOW()) for the 12 function that follow
     getThisWeekRock:function(callback) {
                return db.query("select count(*) as value from winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id where dayofyear(DATE(NOW()))-7 <= dayofyear(DATE(date_heure_diffusion_reelle)) AND dayofyear(DATE(date_heure_diffusion_reelle))<= dayofyear(DATE(NOW())) AND year(NOW())=year(date_heure_diffusion_reelle) AND  _genre4='Rock';",callback)
    },
    getThisWeekAlternativeEtPunk:function(callback) {
                return db.query("select count(*) as value from winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id where dayofyear(DATE(NOW()))-7 <= dayofyear(DATE(date_heure_diffusion_reelle)) AND dayofyear(DATE(date_heure_diffusion_reelle))<= dayofyear(DATE(NOW())) AND year(NOW())=year(date_heure_diffusion_reelle) AND  _genre4='Alternative et punk';",callback)
    },
    getThisWeekUrban:function(callback) {
                return db.query("select count(*) as value from winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id where dayofyear(DATE(NOW()))-7 <= dayofyear(DATE(date_heure_diffusion_reelle)) AND dayofyear(DATE(date_heure_diffusion_reelle))<= dayofyear(DATE(NOW())) AND year(NOW())=year(date_heure_diffusion_reelle) AND  _genre4='Urban';",callback)
    },
    getThisWeekElectronica:function(callback) {
                return db.query("select count(*) as value from winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id where dayofyear(DATE(NOW()))-7 <= dayofyear(DATE(date_heure_diffusion_reelle)) AND dayofyear(DATE(date_heure_diffusion_reelle))<= dayofyear(DATE(NOW())) AND year(NOW())=year(date_heure_diffusion_reelle) AND  _genre4='Electronica';",callback)
    },
   
    getThisWeekJazz:function(callback) {
                return db.query("select count(*) as value from winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id where dayofyear(DATE(NOW()))-7 <= dayofyear(DATE(date_heure_diffusion_reelle)) AND dayofyear(DATE(date_heure_diffusion_reelle))<= dayofyear(DATE(NOW())) AND year(NOW())=year(date_heure_diffusion_reelle) AND  _genre4='Jazz';",callback)
    },
    getThisWeekPop:function(callback) {
                return db.query("select count(*) as value from winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id where dayofyear(DATE(NOW()))-7 <= dayofyear(DATE(date_heure_diffusion_reelle)) AND dayofyear(DATE(date_heure_diffusion_reelle))<= dayofyear(DATE(NOW())) AND year(NOW())=year(date_heure_diffusion_reelle) AND  _genre4='Pop';",callback)
    },
    getThisWeekSentimentale:function(callback) {
                return db.query("select count(*) as value from winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id where dayofyear(DATE(NOW()))-7 <= dayofyear(DATE(date_heure_diffusion_reelle)) AND dayofyear(DATE(date_heure_diffusion_reelle))<= dayofyear(DATE(NOW())) AND year(NOW())=year(date_heure_diffusion_reelle) AND (_mood1='Sentimentale' OR _mood1='Romantique' OR _mood1='Réaliste' OR _mood1='Sophistiquée'  OR _mood1='Sérieuse' OR _mood1='Tendre');",callback)
    },
    getThisWeekAgressive:function(callback) {
                return db.query("select count(*) as value from winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id where dayofyear(DATE(NOW()))-7 <= dayofyear(DATE(date_heure_diffusion_reelle)) AND dayofyear(DATE(date_heure_diffusion_reelle))<= dayofyear(DATE(NOW())) AND year(NOW())=year(date_heure_diffusion_reelle) AND  (_mood1='Chahuteuse' OR _mood1='Provocante' OR _mood1='Agressive' OR _mood1='Ténébreuse');",callback)
    },
    getThisWeekStimulante:function(callback) {
                return db.query("select count(*) as value from winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id where dayofyear(DATE(NOW()))-7 <= dayofyear(DATE(date_heure_diffusion_reelle)) AND dayofyear(DATE(date_heure_diffusion_reelle))<= dayofyear(DATE(NOW())) AND year(NOW())=year(date_heure_diffusion_reelle) AND  (_mood1='Stimulante' OR _mood1='Vigoureuse' OR _mood1='Exaltante' OR _mood1='Sensuelle' OR _mood1='Enjouée' OR _mood1='Agitée' );",callback)
    },
    getThisWeekCool:function(callback) {
                return db.query("select count(*) as value from winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id where dayofyear(DATE(NOW()))-7 <= dayofyear(DATE(date_heure_diffusion_reelle)) AND dayofyear(DATE(date_heure_diffusion_reelle))<= dayofyear(DATE(NOW())) AND year(NOW())=year(date_heure_diffusion_reelle) AND  (_mood1='Brûlante' OR _mood1='Cool' OR _mood1='Enflammée' OR _mood1='Insouciante' OR _mood1='Paisible');",callback)
    },
    getThisWeekNostalgique:function(callback) {
                return db.query("select count(*) as value from winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id where dayofyear(DATE(NOW()))-7 <= dayofyear(DATE(date_heure_diffusion_reelle)) AND dayofyear(DATE(date_heure_diffusion_reelle))<= dayofyear(DATE(NOW())) AND year(NOW())=year(date_heure_diffusion_reelle) AND  (_mood1='Grisante' OR _mood1='Mélancolique' OR _mood1='Nostalgique' OR _mood1='Tourmentée');",callback)

  
    },
    getGenreCreneau4H:function(numberOfCreneau,callback){
        number = 4*numberOfCreneau;

        return db.query("SELECT count(*) as value,  _genre4 AS id FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id  WHERE _genre4 <>''AND _genre4<>'Classique'  AND _genre4<>'Bande originale' AND _genre4<>'Musique traditionnelle' AND _genre4 <>'Autres'  AND  ( ( date(date_heure_diffusion_reelle)=date(date_sub(NOW(),interval "+number+" hour )) and hour(date_heure_diffusion_reelle) = hour(date_sub(NOW(),interval "+number+" hour)) ) or (  date(date_heure_diffusion_reelle)=date(date_sub(NOW(),interval "+number+" +1 hour )) and  hour(date_heure_diffusion_reelle) = hour(date_sub(NOW(),interval "+number+" +1 hour)) ) or (  date(date_heure_diffusion_reelle)=date(date_sub(NOW(),interval "+number+" +2 hour )) and hour(date_heure_diffusion_reelle) = hour(date_sub(NOW(),interval "+number+" +2 hour)) ) or (  date(date_heure_diffusion_reelle)=date(date_sub(NOW(),interval "+number+" +3 hour )) and hour(date_heure_diffusion_reelle) = hour(date_sub(NOW(),interval "+number+" +3 hour)) ) ) group by _genre4;",callback)
    },
    getMoodCreneau4H:function(mood,numberOfCreneau,callback) {
        number = 4 * numberOfCreneau
        switch (mood) {
            case "Nostalgique":
                return db.query("SELECT count(*) as value FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE _genre4 <>''AND _genre4<>'Classique' AND _genre4<>'Bande originale' AND _genre4<>'Musique traditionnelle' AND _genre4 <>'Autres' AND year(date_heure_diffusion_reelle) = year(NOW()) AND ((dayofyear(date_heure_diffusion_reelle) = dayofyear(NOW()) and  0 < hour(NOW())-"+number+" and hour(date_heure_diffusion_reelle) <=  hour(NOW())-" + number + " and hour(date_heure_diffusion_reelle) >=  hour(NOW()) -" + number + " -4 ) or (dayofyear(date_heure_diffusion_reelle) = dayofyear(NOW())-1)  and    0 > hour(NOW())-1 and hour(date_heure_diffusion_reelle) <=  hour(NOW())-" + number + " +24 and hour(date_heure_diffusion_reelle) >=  hour(NOW())-" + number + " -4 +24) AND (_mood1='Grisante' OR _mood1='Mélancolique' OR _mood1='Nostalgique' OR _mood1='Tourmentée');", callback)

                break;
            case "Cool" :
                return db.query("SELECT count(*) as value FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE _genre4 <>''AND _genre4<>'Classique' AND _genre4<>'Bande originale' AND _genre4<>'Musique traditionnelle' AND _genre4 <>'Autres' AND year(date_heure_diffusion_reelle) = year(NOW()) AND ((dayofyear(date_heure_diffusion_reelle) = dayofyear(NOW()) and  0 < hour(NOW())-"+number+" and hour(date_heure_diffusion_reelle) <=  hour(NOW())-" + number + " and hour(date_heure_diffusion_reelle) >=  hour(NOW()) -" + number + " -4 ) or (dayofyear(date_heure_diffusion_reelle) = dayofyear(NOW())-1)  and    0 > hour(NOW())-1 and hour(date_heure_diffusion_reelle) <=  hour(NOW())-" + number + " +24 and hour(date_heure_diffusion_reelle) >=  hour(NOW())-" + number + " -4 +24) AND (_mood1='Brûlante' OR _mood1='Cool' OR _mood1='Enflammée' OR _mood1='Insouciante' OR _mood1='Paisible');", callback)


                break;
            case "Stimulante":
                return db.query("SELECT count(*) as value FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE _genre4 <>''AND _genre4<>'Classique' AND _genre4<>'Bande originale' AND _genre4<>'Musique traditionnelle' AND _genre4 <>'Autres' AND year(date_heure_diffusion_reelle) = year(NOW()) AND ((dayofyear(date_heure_diffusion_reelle) = dayofyear(NOW()) and  0 < hour(NOW())-"+number+" and hour(date_heure_diffusion_reelle) <=  hour(NOW())-"+number+" and hour(date_heure_diffusion_reelle) >=  hour(NOW()) -"+number+" -4 ) or (dayofyear(date_heure_diffusion_reelle) = dayofyear(NOW())-1)  and    0 > hour(NOW())-"+number+"-4 and hour(date_heure_diffusion_reelle) <=  hour(NOW())-"+number+" +24 and hour(date_heure_diffusion_reelle) >=  hour(NOW())-"+number+" -4 +24) AND (_mood1='Stimulante' OR _mood1='Vigoureuse' OR _mood1='Exaltante' OR _mood1='Sensuelle' OR _mood1='Enjouée' OR _mood1='Agitée' );",callback)

                break;
            case "Agressive": 
                return db.query("SELECT count(*) as value FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE _genre4 <>''AND _genre4<>'Classique' AND _genre4<>'Bande originale' AND _genre4<>'Musique traditionnelle' AND _genre4 <>'Autres' AND year(date_heure_diffusion_reelle) = year(NOW()) AND ((dayofyear(date_heure_diffusion_reelle) = dayofyear(NOW()) and  0 < hour(NOW())-"+number+" and hour(date_heure_diffusion_reelle) <=  hour(NOW())-"+number+" and hour(date_heure_diffusion_reelle) >=  hour(NOW()) -"+number+" -4 ) or (dayofyear(date_heure_diffusion_reelle) = dayofyear(NOW())-1)  and    0 > hour(NOW())-"+number+"-4 and hour(date_heure_diffusion_reelle) <=  hour(NOW())-"+number+" +24 and hour(date_heure_diffusion_reelle) >=  hour(NOW())-"+number+" -4 +24) AND (_mood1='Chahuteuse' OR _mood1='Provocante' OR _mood1='Agressive' OR _mood1='Ténébreuse');",callback)

                break;
            case "Sentimentale":
               return db.query("SELECT count(*) as value FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE _genre4 <>''AND _genre4<>'Classique' AND _genre4<>'Bande originale' AND _genre4<>'Musique traditionnelle' AND _genre4 <>'Autres' AND year(date_heure_diffusion_reelle) = year(NOW()) AND ((dayofyear(date_heure_diffusion_reelle) = dayofyear(NOW()) and  0 < hour(NOW())-"+number+" and hour(date_heure_diffusion_reelle) <=  hour(NOW())-"+number+" and hour(date_heure_diffusion_reelle) >=  hour(NOW()) -"+number+" -4 ) or (dayofyear(date_heure_diffusion_reelle) = dayofyear(NOW())-1)  and    0 > hour(NOW())-"+number+"-4 and hour(date_heure_diffusion_reelle) <=  hour(NOW())-"+number+" +24 and hour(date_heure_diffusion_reelle) >=  hour(NOW())-"+number+" -4 +24) AND (_mood1='Sentimentale' OR _mood1='Romantique' OR _mood1='Réaliste' OR _mood1='Sophistiquée'  OR _mood1='Sérieuse' OR _mood1='Tendre');",callback)

               break;

            default:
                throw "Bad mood";
                break;
        }
    },

    //todo: date par now()
    get5LastGenre:function(genre,callback) {

        return db.query("SELECT  W.title, artiste_diffuser as artist FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE _genre4 ='"+genre+"' order by date_heure_diffusion_reelle desc limit 5;",callback)
    },
    get5LastMood:function(mood,callback){
        switch (mood) {
            case "Nostalgique":
                return db.query("SELECT  W.title, artiste_diffuser as artist FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE (_mood1='Grisante' OR _mood1='Mélancolique' OR _mood1='Nostalgique' OR _mood1='Tourmentée') AND year(date_heure_diffusion_reelle)= year(NOW()) AND dayofyear(date_heure_diffusion_reelle)<=dayofyear(NOW()) ANd dayofyear(date_heure_diffusion_reelle)>=dayofyear(NOW())-6 order by date_heure_diffusion_reelle desc limit 5;",callback)
  
                break;
            case "Cool" :
                return db.query("SELECT  W.title, artiste_diffuser as artist FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE (_mood1='Brûlante' OR _mood1='Cool' OR _mood1='Enflammée' OR _mood1='Insouciante' OR _mood1='Paisible') AND year(date_heure_diffusion_reelle)= year(NOW()) AND dayofyear(date_heure_diffusion_reelle)<=dayofyear(NOW()) ANd dayofyear(date_heure_diffusion_reelle)>=dayofyear(NOW())-6 order by date_heure_diffusion_reelle desc limit 5;",callback)
  

                break;
            case "Stimulante":
                return db.query("SELECT  W.title, artiste_diffuser as artist FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id Where (_mood1='Stimulante' OR _mood1='Vigoureuse' OR _mood1='Exaltante' OR _mood1='Sensuelle' OR _mood1='Enjouée' OR _mood1='Agitée' ) AND year(date_heure_diffusion_reelle)= year(NOW()) AND dayofyear(date_heure_diffusion_reelle)<=dayofyear(NOW()) ANd dayofyear(date_heure_diffusion_reelle)>=dayofyear(NOW())-6 order by date_heure_diffusion_reelle desc limit 5;",callback)
  
                break;
            case "Agressive": 
                return db.query("SELECT  W.title, artiste_diffuser as artist FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE (_mood1='Chahuteuse' OR _mood1='Provocante' OR _mood1='Agressive' OR _mood1='Ténébreuse') AND year(date_heure_diffusion_reelle)= year(NOW()) AND dayofyear(date_heure_diffusion_reelle)<=dayofyear(NOW()) ANd dayofyear(date_heure_diffusion_reelle)>=dayofyear(NOW())-6 order by date_heure_diffusion_reelle desc limit 5;",callback)
  
                break;
            case "Sentimentale":
               return db.query("SELECT  W.title, artiste_diffuser as artist FROM winmedia_media W LEFT JOIN musique_auditeur_tbl M ON M.id_musique = W._jazler_id WHERE (_mood1='Sentimentale' OR _mood1='Romantique' OR _mood1='Réaliste' OR _mood1='Sophistiquée'  OR _mood1='Sérieuse' OR _mood1='Tendre') AND year(date_heure_diffusion_reelle)= year(NOW()) AND dayofyear(date_heure_diffusion_reelle)<=dayofyear(NOW()) ANd dayofyear(date_heure_diffusion_reelle)>=dayofyear(NOW())-6 order by date_heure_diffusion_reelle desc limit 5;",callback)
  
               break;

            default:
                throw "Bad mood";
                break;
        }
    }

};




// Function verify if a date format sql is correct
function valideDate(date)
{
    myRegex=/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
    return (myRegex.test(date) && date.length==19);
}

module.exports=data;