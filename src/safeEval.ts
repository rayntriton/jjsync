import { ʗSᗔO, str, obj, rex } from '~types/basics'

let stringMatcher:rex = /"(?:\\.|[^\\"])*"?|'(?:\\.|[^\\'])*'?|`(?:\\.|[^\\`])*`?/g
let danger:rex = /[=\(\)\.]/g
let safeEval = ( ( str ) => {
  //console.log( 'EVALUATION str', str )
  if( str.replace( stringMatcher, '' ).match( danger ) ){
    let matches = str.replace( stringMatcher, '' ).match( /[^]{5}[=\(\)\.]/g )
    //console.log( matches ? matches[ 0 ] : '' )
    throw new Error( 'Can\'t eval, source is not clean js/json. source is:\nDangerous code :\n' + matches+ '.\nSource:\n' + str )
  }
  try{
    let evaluation:obj = eval( `() => { return ${ str } }` )()
    //console.log( 'EVALUATION', evaluation )
    return evaluation
  }
  catch( error ){
    throw `Failed to safeEval. source is ${ str }. ${ String( error ) }`
  }
} ) as ʗSᗔO

export default safeEval
