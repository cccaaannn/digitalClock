var cccaaannnTimeCustom = {

    staticArgs : {
        divClassName12 : "12hour",
        divClassName24 : "24hour"
    },

    addZero : function(num) {
        // adds extra 0s to time if needed
        if (num < 10) {
            num = "0" + num
        };
        return num;
    },

    getTime24 : function(){
        // 24 hour format time
        let today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();

        h = cccaaannnTimeCustom.addZero(h);
        m = cccaaannnTimeCustom.addZero(m);
        s = cccaaannnTimeCustom.addZero(s);
        return h + ":" + m + ":" + s;
    },

    getTime12 : function(){
        // 12 hour format time
        let today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();

        let session = "AM";
        if(h == 0){
            h = 12;
        }
        if(h > 12){
            h = h - 12;
            session = "PM";
        }

        h = cccaaannnTimeCustom.addZero(h);
        m = cccaaannnTimeCustom.addZero(m);
        s = cccaaannnTimeCustom.addZero(s);

        return h + ":" + m + ":" + s + " " + session;
    },

    updateTimeOnDivs : function(time12, time24){
        // changes time on divs
        divs12 = document.getElementsByClassName(cccaaannnTimeCustom.staticArgs.divClassName12);
        divs24 = document.getElementsByClassName(cccaaannnTimeCustom.staticArgs.divClassName24);

        for (let i = 0; i < divs12.length; i++) {
            divs12[i].innerHTML = time12;
        }
        for (let i = 0; i < divs24.length; i++) {
            divs24[i].innerHTML = time24;
        }

    },

    start : function(){
        // start timeout
        cccaaannnTimeCustom.updateTimeOnDivs(cccaaannnTimeCustom.getTime12(), cccaaannnTimeCustom.getTime24());
        setTimeout(cccaaannnTimeCustom.start, 500);
    }

}

cccaaannnTimeCustom.start();
