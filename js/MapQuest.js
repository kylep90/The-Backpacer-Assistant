// SECTION Library definition
var MapQuest = {
    // !! For the API key we use semicolon because is inside an object
    apiKey : "",
    /**
     * This function obtains the latitude/longitude for an address and executes
     * a Callback with the result
     * @param {string} pAddress The address to look the coordinate for
     * @param {function} pCallback A function that is executed when the API
     * call succeeds.The first parameter passed to that function will be the
     * first latitude/longitude object in the response 
     */
    getAddressCoordinates: function( pAddress,pCallback ){
        // !! encodeURIComponent will scape any characters that have special meaning for a URL
        // !! we use this because some times the API key may have special characters
        // !! this is also used as a security redundance for special characters on the search input
        // TODO : Sanitize search inputs
        var lUrl = "https://www.mapquestapi.com/geocoding/v1/address?key=" + encodeURIComponent(this.apiKey) + "&location=" + encodeURIComponent(pAddress);
        // !! --------------------------------------------------------------------------
        // SECTION JQUERY AJAX GET  [2020-05-15T06:09:47.762Z
        // SYNTAX
        $.ajax({
            url: lUrl,
            method: "GET"
        } ).then( function( pResponse ) {  
            // !!The default value of a variable declared in the following way will be undefined  
            var lFirstLatLng;
            // SECTION Validations
            // !! The following code performs the validation so the code does not return an error
            // !! If any of the validations fails the variables to be returned will be resolved 
            // !! to its default value therefore it will be resolved as undefined and will not
            // !! return an error just undefined
            if( pResponse.results.length > 0 ){
                if( pResponse.results[0].locations.length>0){
                    // get the first latitude/longitude in the response if the request 
                    // returns nothing on the array this line will not be executed 
                    lFirstLatLng = pResponse.results[0].locations[0].latLng;
                }
            }
            // !SECTION Validations  
            // SECTION Callback Execution
            if (typeof pCallback === "function"){
                // call is a native method of function that executes the function
                // setting the "this" key word on this case we are going to pass it
                // null because we don't need "this" however this reference is
                // applicable for further cases 
                pCallback.call(this,lFirstLatLng);
            }
            // !SECTION Callback Execution
        });
// !SECTION JQUERY AJAX GET 
// !! --------------------------------------------------------------------------
    }
};
// !SECTION Library definition
