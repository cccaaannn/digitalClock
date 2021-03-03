var cccaaannnTimeOneLine = {

    staticArgs : {
        divClassName : "cccaaannnTimeOneLine",
        scriptFileName : "cccaaannnTimeOneLine.js" // file name is used to add the div to scripts location
    },

    optionalArgs : {
        is24 : true,
    },

    construct : function(){
        // get optional arguments from html
        cccaaannnTimeOneLine.getOptionalArguments();

        // create custom div
        cccaaannnTimeOneLine.createDiv();

        // add div to script locations, there can be multiple
        cccaaannnTimeOneLine.addTimeDivToScriptLocation();
    },


    // time functions
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

        h = cccaaannnTimeOneLine.addZero(h);
        m = cccaaannnTimeOneLine.addZero(m);
        s = cccaaannnTimeOneLine.addZero(s);
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

        h = cccaaannnTimeOneLine.addZero(h);
        m = cccaaannnTimeOneLine.addZero(m);
        s = cccaaannnTimeOneLine.addZero(s);

        return h + ":" + m + ":" + s + " " + session;
    },


    // ui functions
    createDiv : function() {
        cccaaannnTimeOneLine.staticArgs.div = document.createElement('div');
        cccaaannnTimeOneLine.staticArgs.div.classList.add(cccaaannnTimeOneLine.staticArgs.divClassName);
        cccaaannnTimeOneLine.staticArgs.div.style.backgroundColor = "#343A40";
        cccaaannnTimeOneLine.staticArgs.div.style.color = "#568bff";
        cccaaannnTimeOneLine.staticArgs.div.style.fontFamily = "Arial, Helvetica, sans-serif";
        cccaaannnTimeOneLine.staticArgs.div.style.fontSize = "2.5em";
        cccaaannnTimeOneLine.staticArgs.div.style.display = "inline-block";
        cccaaannnTimeOneLine.staticArgs.div.style.paddingLeft = "5px";
        cccaaannnTimeOneLine.staticArgs.div.style.paddingRight = "5px";
        cccaaannnTimeOneLine.staticArgs.div.style.borderRadius = "7px";
        cccaaannnTimeOneLine.staticArgs.div.style.margin = "3px";
    },

    addTimeDivToScriptLocation : function(){
        // adds time to scripts location, works with multiple scripts
        if(typeof cccaaannnTimeOneLine.staticArgs.div !== 'undefined'){
            scripts = document.getElementsByTagName("script")
            for (let i = 0; i < scripts.length; i++) {
                // add divs
                let fileName = scripts[i].getAttribute('src').split('/').pop();
                if(fileName === cccaaannnTimeOneLine.staticArgs.scriptFileName){
                    scripts[i].parentElement.insertBefore(cccaaannnTimeOneLine.staticArgs.div, scripts[i]); 
                }
            }
        }
    },

    updateTimeOnDivs : function(str){
        // changes time on divs
        divs = document.getElementsByClassName(cccaaannnTimeOneLine.staticArgs.divClassName);
        for (let j = 0; j < divs.length; j++) {
            divs[j].innerHTML = str;
        }
    },


    // utility
    getOptionalArguments : function(){
        scripts = document.getElementsByTagName("script")
        for (let i = 0; i < scripts.length; i++) {

            // parse option arguments from html
            let args = scripts[i].getAttribute('args');
            if(typeof args === "string"){
                args = JSON.parse(args);

                if(typeof args.is24 === "string"){
                    cccaaannnTimeOneLine.optionalArgs.is24 = args.is24;
                }
            }

        }
    },       


    // start
    startTimeout : function(){
        let time = cccaaannnTimeOneLine.getTime24()
        if(cccaaannnTimeOneLine.optionalArgs.is24 === "false"){
            time = cccaaannnTimeOneLine.getTime12()
        }
        cccaaannnTimeOneLine.updateTimeOnDivs(time);  
        setTimeout(cccaaannnTimeOneLine.startTimeout, 500);
    },

    start : function(){
        // construct and start timeout
        cccaaannnTimeOneLine.construct();
        cccaaannnTimeOneLine.startTimeout();
    }
    // -----

}


cccaaannnTimeOneLine.start();

