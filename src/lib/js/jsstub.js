(function(){
    var global = this;

    function Stub(vName, sType){
        if(!(this instanceof arguments.callee)){
            return new arguments.callee(vName,sType);
        }else{
            this.createStub(vName,sType||"object");
        }
    }

    Stub.prototype.createStub = function(vName,sType){
        this._vReturnValue = "_js_stub_none";
        this._stubType = Stub.OBJECT;
        if(typeof vName=="string"){
            this.makeEnableObj(vName,sType);    
            this._stubType = sType;
        }else if(typeof vName=="object"||typeof vName=="function"){
            this._stubObj = vName;
        }else{
            throw new Error("Name of Stub is incorrect.Type is String or Object or Function.");
        }
    };

    Stub.prototype.getStub = function(){
        if(this._stubType==Stub.OBJECT){
            return this._stubObj;
        }else{
            return this._stubObj.prototype;
        }
    };

    Stub.prototype.makeEnableObj = function(sName,sType){
        var depth = sName.split(".");
        var objectName = depth[0];
        var obj;
        if(depth.length > 1){
            obj = global;

            for (var i = 0, l = depth.length; i < l-1 ; i++) {
                if (typeof obj[depth[i]] == "undefined"){
                    obj[depth[i]] = {};
                } 

                obj = obj[depth[i]];
            }
            objectName = depth[depth.length-1];
        }else{
            obj = global;
        }
        var returnObj;
        if(sType==Stub.OBJECT){
            returnObj = obj[objectName];
            if(returnObj){
                this._stubObj = returnObj;
            }else{
                this._stubObj = obj[objectName] = {};
            }
        }else if(sType==Stub.INSTANCE){
            returnObj = obj[objectName];
            if(returnObj){
                this._stubObj = returnObj;
            }else{
                this._stubObj = obj[objectName] = function(){};
                this._stubObj.prototype = obj[objectName].prototype = {};
            }
        }
    };

    Stub.prototype.should_receive = function(sFunctionName){
        var that = this;
        this.getStub()[sFunctionName] = function(){
            if(that._vReturnValue != "_js_stub_none"){
                return that._vReturnValue;
            }
        };
        return new StubMethod(this);
    };

    function StubMethod(iStub){
        this.iStub = iStub;
    }

    StubMethod.prototype.and_return = function(vReturn){
        this.iStub._vReturnValue = vReturn;
    };

    Stub.INSTANCE = "instance";
    Stub.OBJECT = "object";

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Stub;
    }else{
        global.stub = global.Stub = Stub;   
    }
})();