//obj = {click: [callBack1, callBack2]}

class LqEventHub {
    constructor() {
        this.eventHubObj = {}
    }
    //订阅者
    subscribe(fnName,fn){
        if(!this.eventHubObj[fnName]) {
            this.eventHubObj[fnName] = []
            this.eventHubObj[fnName].push(fn)
        }else {
            this.eventHubObj[fnName].push(fn)
        }
    }
    //发布者
    publish(){
        const fnName = [].shift.call(arguments)
        const fns = this.eventHubObj[fnName]
        if(!fns || !fns?.length) {
            return console.error("没有订阅")
        }
        for(let i = 0; i < fns.length; i++) {
            fns[i].apply(this, arguments)
        }
    }
    //移除订阅
    remove(){
        const fnName = [].shift.call(arguments)
        const fns = this.eventHubObj[fnName]
        if(!fns || !fns?.length) return
        if(!arguments?.length) {
            this.eventHubObj[fnName] = []
            delete  this.eventHubObj[fnName]
        }else {
            for(let i = 0 ; i< fns.length; i++) {
                if([].slice.call(arguments).includes(fns[i])) {
                    fns.splice(i,1)
                }
            }
        }
    }
}

const test = new LqEventHub()
// const f1 = function f() {
//     console.log('11111')
// }
// const f2 = function f() {
//     console.log('2222')
// }
function f1 () {
    console.log('111')
}
function f2() {
    console.log('222')
}
test.subscribe('click', f1)
test.subscribe('click', f2)
test.publish("click")
test.remove("click",f2)
test.publish("click")