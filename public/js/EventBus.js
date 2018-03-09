/*
 Based on an implementation described here:
 https://medium.com/@soffritti.pierfrancesco/create-a-simple-event-bus-in-javascript-8aa0370b3969
*/

const EventBus = function(){
  const eventCallbacksPairs = [];

  this.subscribe = function( eventType, callback ){
    const eventCallbacksPair = findEventCallbacksPair( eventType );

    if(eventCallbacksPair){ // if the event exists
      eventCallbacksPair.callbacks.push( callback );
    }else{ // otherwise, push it into the array
      eventCallbacksPairs.push( new EventCallbacksPair( eventType, callback ));
    }
  }

  this.publish = function( eventType, argument1, argument2 ){
    const eventCallbacksPair = findEventCallbacksPair( eventType );

    if(!eventCallbacksPair){
      console.error("no subscribers for event "+eventType);
      return;
    }

    eventCallbacksPair.callbacks
      .forEach( callback => callback(argument1, argument2) );
  }

  function findEventCallbacksPair(eventType){
    return eventCallbacksPairs
      .find( eventObject => eventObject.eventType === eventType );
  }

  // correlation between an event and it's callback functions
  // the event bus stores a list of all of these objects, one
  // for every event
  function EventCallbacksPair( eventType, callback ){
    this.eventType = eventType;
    this.callbacks = [callback];
  }
}

export default EventBus;
