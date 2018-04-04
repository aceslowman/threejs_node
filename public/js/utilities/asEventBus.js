/*
 Based on an implementation described here:
 https://medium.com/@soffritti.pierfrancesco/create-a-simple-event-bus-in-javascript-8aa0370b3969
*/

function EventCallbacksPair( eventType, callback ){
  this.eventType = eventType;
  this.callbacks = [callback];
}

export default class asEventBus{
  constructor(){
    this.eventCallbacksPairs = [];
  }

  subscribe(eventType, callback){
    this.eventCallbacksPair = this.findEventCallbacksPair( eventType );

    if(this.eventCallbacksPair){ // if the event exists
      this.eventCallbacksPair.callbacks.push( callback );
    }else{ // otherwise, push it into the array
      this.eventCallbacksPairs.push( new EventCallbacksPair( eventType, callback ));
    }
  }

  publish(eventType, argument1, argument2){
    this.eventCallbacksPair = this.findEventCallbacksPair( eventType );

    if(!this.eventCallbacksPair){
      console.error("no subscribers for event "+eventType);
      return;
    }

    this.eventCallbacksPair.callbacks
      .forEach( callback => callback(argument1, argument2) );
  }

  findEventCallbacksPair(eventType){
    return this.eventCallbacksPairs
      .find( eventObject => eventObject.eventType === eventType );
  }
}
