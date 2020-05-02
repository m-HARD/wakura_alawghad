new Vue({
    el: '#app',
    data: {
        countries:[
            {   name:"وايلدسيتي",
                time:0*60   },
            {   name:"لاس فيجاس",
                time:5*60   },
            {   name:"هونج كونج",
                time:15*60  },
            {   name:"طوكيو",
                time:20*60  },
            {   name:"مكسيكو",
                time:25*60  },
            {   name:"ريو",
                time:35*60  },
            {   name:"كيب تاون",
                time:55*60  },
            {   name:"روما",
                time:50*60  },
            {   name:"لندن",
                time:55*60  },
            {   name:"القاهرة",
                time:60*60  },
            {   name:"امستردام",
                time:80*60  },
        ],
        
        names:["m.hard","القناص.","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"],
        name:"1",
        feild1:"وايلدسيتي",
        feild2:"لاس فيجاس",
        mytime:null,

        runing:[],
        done:[],

        wards:[
            {   name:"أقحوان . وايلد سيتي",
                inStok:0,
                input:0 },
            {   name:"ميرمية . لاس فيجاس",
                inStok:0,
                input:0 },
            {   name:"عود الصليب . هونج كونج",
                inStok:0,
                input:0 },
            {   name:"ساكورا . طوكيو",
                inStok:0,
                input:0 },
            {   name:"اضاليا . مكسيكو",
                inStok:0,
                input:0 },
            {   name:"الصبار . ريو",
                inStok:0,
                input:0 },
            {   name:"شجرة الفضة . كيب تاون",
                inStok:0,
                input:0 },
            {   name:"زهرة الربيع . روما",
                inStok:0,
                input:0 },
            {   name:"ورد احمر . لندن",
                inStok:0,
                input:0 },
            {   name:"زنبق الماء . القاهرة",
                inStok:0,
                input:0 },
            {   name:"تيوليب . امستردام",
                inStok:0,
                input:0 },
        ],

        inputId:1,


        wardTime:16,
        wardTimeLeft:0,
        editGoal:false,

        showAlert: false,
        alertColor: "",
        alertMessage : ""
    },
    methods: {
        add(){
            if(this.mytime != null){
                Time1 = 0;
                Time2 = this.mytime*60;
            }else{
                this.countries.forEach(country => {
                    if (country.name == this.feild1) {
                        Time1 = country.time;
                    }
                });
                this.countries.forEach(country => {
                    if (country.name == this.feild2) {
                        Time2 = country.time;
                    }
                });
            }

            this.runing.push({
                id: this.inputId,
                name:this.name,
                from:this.feild1,
                to: this.feild2,
                timeLimit: Math.abs(Time2-Time1),
                timePassed: 0,
                timeLeft:-1,
                timerInterval: null,
            });
            this.startTimer(this.inputId);
            this.getId();
            this.addAlert();
            this.mytime = null;
        },
        getId(){
            this.inputId++;
        },
        gettime(t1,t2){
            return Math.abs(t2-t1);
        },
        addDone(obj){
            this.done.push({
                id: obj.id,
                name:obj.name,
                from:obj.from,
                to: obj.to,
                timeLimit: obj.timeLimit,
                timePassed: obj.timePassed,
                timeLeft:obj.timeLeft,
                timerInterval: obj.timerInterval,
            });
        },
        RIFR(obj){
            this.removeItemFromRunning(obj);
            this.deleteAlert();
        },
        removeItemFromRunning(obj){

            let index = this.runing.indexOf(obj);
            if(index !== -1){
                this.runing.splice(index,1);
            }
        },
        RIFD(obj){
            this.removeItemFromDone(obj);
            this.deleteAlert();
        },
        removeItemFromDone(obj){

            let index = this.done.indexOf(obj);
            if(index !== -1){
                this.done.splice(index,1);
            }
        },
        reuse(obj){
            this.removeItemFromDone(obj);
            this.name = obj.name;
            this.feild1 = obj.to;
            this.feild2 = obj.from;
            this.reuseAlert();
        },

        startTimer(id) {
            this.runing.forEach(item => {
                if (item.id == id) {
                    
                    item.timerInterval = setInterval((() => item.timePassed += 1), 1000);
                }
            });
        },

        formatTime(time){
            min = Math.floor(time/60);
            sec = time%60;

            if (min < 10) {
                min = `0${min}`
            }
            if (sec < 10) {
                sec = `0${sec}`
            }
        
            if (time > 300) {
                omg = "ˋ︿ˊ";
            }else if (time > 60) {
                omg = "ˋ﹏ˊ";
            }else if (time > 0) {
                if (time % 2 == 0) {
                    omg = "ˋ﹏ˊ";
                } else {
                    omg = "◕‿◕";
                }
            } else {
                omg = "◕‿◕";
            }

            return `${min}:${sec} . . . . ${omg}`
        },

        getWardTime(){
            var time = new Date();
            var minutes = time.getMinutes();
            if (this.wardTime - minutes < 0) {
                this.wardTimeLeft = 60 - (minutes - this.wardTime);
            } else {
                this.wardTimeLeft = this.wardTime - minutes;
            }
            
            setInterval((() => this.updateWardTime() ), 1000);
        },
        updateWardTime(){
            var time = new Date();
            var minutes = time.getMinutes();
            if (this.wardTime - minutes < 0) {
                this.wardTimeLeft = 60 - (minutes - this.wardTime);
            } else {
                this.wardTimeLeft = this.wardTime - minutes;
            }
        },
        getTimeNow(){
            var time = new Date();
            return time.getHours()%12+" : "+time.getMinutes()+" : "+time.getSeconds();
        },


        AddToStok(obj){
            obj.inStok += obj.input;
            obj.input = 0;
        },
        SubToStok(obj){
            obj.inStok -= obj.input;
            obj.input = 0;
        },
        ThisToStok(obj){
            obj.inStok = obj.input;
            obj.input = 0;
        },

        alertFade(){
            this.showAlert = true
            var that = this;
            setTimeout(function() {
                that.showAlert = false;
              }, 800);
        },
        addAlert(){
            this.alertColor = "bg-green-500";
            this.alertMessage = "Added Successfully";
            this.alertFade();
        },
        reuseAlert(){
            this.alertColor = " bg-blue-500";
            this.alertMessage = "Reuse Successfully";
            this.alertFade();
        },
        deleteAlert(){
            this.alertColor = " bg-red-500";
            this.alertMessage = "Delete Successfully";
            this.alertFade();
        }
    },
    created() {
        this.getWardTime();
    },
    watch:{
        wardTime(){
            if(this.wardTime > 60){
                this.wardTime = 60
            }else if(this.wardTime < 0){
                this.wardTime = 0
            }

            var time = new Date();
            var minutes = time.getMinutes();
            if (this.wardTime - minutes < 0) {
                this.wardTimeLeft = 60 - (minutes - this.wardTime);
            } else {
                this.wardTimeLeft = this.wardTime - minutes;
            }
        }
    },
    computed: {
        runingList () {   
            return this.runing.map( (r) => {
                if (r.timeLeft == 0) {
                    this.addDone(r);
                    this.removeItemFromRunning(r);
                }    
                r.timeLeft = r.timeLimit - r.timePassed
                return r
              })
        },
    },
});