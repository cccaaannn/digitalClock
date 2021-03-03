var cccaaannnTime = {

    staticArgs : {
        divClassName : "cccaaannnTime",
        scriptFileName : "cccaaannnTime.js" // file name is used to add the div to scripts location, if div classes are specified on the html this is not needed
    },

    optionalArgs : {
        is24 : true,
        divClassNames : []
    },

    construct : function(){

        // get optional arguments from html
        cccaaannnTime.getOptionalArguments();
        
        // if div classes are not given create div on the scripts location
        if(cccaaannnTime.optionalArgs.divClassNames.length === 0){
            // create custom div
            cccaaannnTime.createDiv();

            // add div to script locations, there can be multiple
            cccaaannnTime.addTimeDivToScriptLocation();
        }
        
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

        h = cccaaannnTime.addZero(h);
        m = cccaaannnTime.addZero(m);
        s = cccaaannnTime.addZero(s);
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

        h = cccaaannnTime.addZero(h);
        m = cccaaannnTime.addZero(m);
        s = cccaaannnTime.addZero(s);

        return h + ":" + m + ":" + s + " " + session;
    },


    // ui functions
    createDiv : function() {
        cccaaannnTime.staticArgs.div = document.createElement('div');
        cccaaannnTime.staticArgs.div.classList.add(cccaaannnTime.staticArgs.divClassName);
        cccaaannnTime.staticArgs.div.style.backgroundColor = "#343A40";
        cccaaannnTime.staticArgs.div.style.color = "#568bff";
        cccaaannnTime.staticArgs.div.style.fontFamily = "Arial, Helvetica, sans-serif";
        cccaaannnTime.staticArgs.div.style.fontSize = "2.5em";
        cccaaannnTime.staticArgs.div.style.display = "inline-block";
        cccaaannnTime.staticArgs.div.style.paddingLeft = "5px";
        cccaaannnTime.staticArgs.div.style.paddingRight = "5px";
        cccaaannnTime.staticArgs.div.style.borderRadius = "7px";
        cccaaannnTime.staticArgs.div.style.margin = "3px";
    },

    addTimeDivToScriptLocation : function(){
        // adds time to scripts location, works with multiple scripts
        if(typeof cccaaannnTime.staticArgs.div !== 'undefined'){
            scripts = document.getElementsByTagName("script")
            for (let i = 0; i < scripts.length; i++) {
                // add divs
                let fileName = scripts[i].getAttribute('src').split('/').pop();
                if(fileName === cccaaannnTime.staticArgs.scriptFileName){
                    scripts[i].parentElement.insertBefore(cccaaannnTime.staticArgs.div, scripts[i]); 
                }
            }
        }
    },

    updateTimeOnDivs : function(str){
        // changes time on divs

        // use user provided divs if exists
        if(cccaaannnTime.optionalArgs.divClassNames.length > 0){
            // use user provided divs instead of custom one
            for (let i = 0; i < cccaaannnTime.optionalArgs.divClassNames.length; i++) { 
                divs = document.getElementsByClassName(cccaaannnTime.optionalArgs.divClassNames[i]);
                for (let j = 0; j < divs.length; j++) {
                    divs[j].innerHTML = str;
                }
            }
        }
        // use custom div if noting provided
        else{
            divs = document.getElementsByClassName(cccaaannnTime.staticArgs.divClassName);
            for (let j = 0; j < divs.length; j++) {
                divs[j].innerHTML = str;
            }
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
                    cccaaannnTime.optionalArgs.is24 = args.is24;
                }
                if(typeof args.divs === "string"){
                    cccaaannnTime.optionalArgs.divClassNames = args.divs.split(",");
                }

            }
        }
    },       


    // start
    startTimeout : function(){

        let time = cccaaannnTime.getTime24()
        if(cccaaannnTime.optionalArgs.is24 === "false"){
            time = cccaaannnTime.getTime12()
        }
        cccaaannnTime.updateTimeOnDivs(time);  
        setTimeout(cccaaannnTime.startTimeout, 500);
    },

    start : function(){
        // construct and start timeout
        cccaaannnTime.construct();
        cccaaannnTime.startTimeout();
    }
    // -----

}


cccaaannnTime.start();

