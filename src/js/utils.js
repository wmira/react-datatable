"use require";

module.exports = {
    
    extractValue : function(property,path,record) {


        var value = "";

        /**
         * By default, we will use record[property] if path is not given.
         * If path is provided and is a string then will uspltle record[path]
         * If path is provided and is a function then we will call the function.
         * else we dont do anything
         */
        if ( typeof property === 'string' ) {
            if ( !path ) {
                value = record[property];
                if ( typeof(value) === 'function' ) {
                    value = value.call(record);
                }
            } else {
                if ( typeof path === 'string' ) {
                    value =  path.split(".").reduce(function(previous,current) {
                        if ( !previous || !current ) {
                            return null;
                        }
                        return previous[current];
                    },record);// record[path];
                } else {
                    //TODO: function check
                    value = path(property,record);
                }
            }
        }
        return value;
        
    }
    
}