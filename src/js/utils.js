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
        
    },
    extractSortableType : function(v1,v2) {
      if ( typeof v1 === 'string' && typeof v2 === 'string') {
          return String;
      } else if ( typeof v1 === 'number' && typeof v2 === 'number') {
          return Number;
      } else if ( v1 instanceof Date && v2 instanceof Date ) {
          return Date;
      } else {
          return null;
      }
        
    },
    compare : function(type,val1,val2,direction) {
        if ( type === Number ) {
            if ( val1 && val2 ) {
                return (val2 - val1) * direction;
            } else if ( val1 && !val2 ) {
                return val1 * direction;
            } else if ( !val1 && val2 ) {
                return val2 * direction;
            } else {
                return 0;
            }
        } else  { //string sort
            if ( val1  ) {
                return val1.localeCompare(val2) * reverseDir;
            } else if ( val2 ) {
                return val2.localeCompare(val1) * reverseDir;
            } else {
                return 0;
            }
        }
        return 0;
        //FIXME how about date? slacker!
    }
    
}