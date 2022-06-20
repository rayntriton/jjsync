import { ʗO·O·SᑕᑐᗔO, obj, str } from '~types/basics'

let update = ( ( object1, object2, keep = [ "__comments__0" ] ) => {
  //console.log('UPDATE object1, object2, keep', object1, object2, keep )
  let varObject:obj = Object.assign( {}, object2 )
  let result:obj = {}
  for( var key in object1 ){
    if( keep.includes( key ) ){
      result[ key ] = object1[ key ]
    }
    else if( object2.hasOwnProperty( key ) ){
      if(Array.isArray( object2[ key ] ) ){
        result[ key ] = object2[ key ]
      }
      else if( typeof object1[ key ] == 'object' ){
        result[ key ] = update( object1[ key ] as  obj, object2[ key ] as obj, keep )
      }
      else result[ key ] = object2[ key ]
      delete varObject[ key ]
    }
  }
  for( var key in varObject ){
    result[ key ] = varObject[ key ]
  }
  return result
} ) as ʗO·O·SᑕᑐᗔO

export default update
