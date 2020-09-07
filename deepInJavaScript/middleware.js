



class WAW {
    constructor({ action }){
        this.actions = []
        this.action = action
    }


    dispatch(obj) {
        this.actions.forEach((subscriber) => subscriber.before(obj))

        const { methods } = obj
        this.action[methods]()
        
        this.actions.forEach((subscriber) => subscriber.after(obj))
    }

    subscribeAction(subscriber) {
        this.actions.push(subscriber)
    }

}

const event = new WAW({
    action: {
        getName(){
            console.log('aaron')
        }
    }
})
event.subscribeAction({
    before(obj) {
        console.log('before: ' + obj.methods + ' call success')
    },
    after(obj) {
        console.log('after: ' + obj.methods + ' call success')
    }
})
event.dispatch({
    methods: 'getName',
})