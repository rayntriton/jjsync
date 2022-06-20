import { ʗSᗔÅ } from '~types/basics'

let uncoverAtom = ( ( atom ) => {
  //console.log( 'UNCOVER_ATOM', atom )
  if( ! atom ) return atom
  // reject chars used in js code & prevent code execution
  if( atom.match && atom.match( /[\[\]\{\}\(\)\+\-\*\/=&\^%#@!?\\ ]/g ) ) return `${ atom.replace(/\"/g,'\\"') }`
  try{
    return eval( `() => { let value = ${ atom }; return value }` )()
  }
  catch( error ){
    return `${ atom.replace( /\"/g,'\\"' ) }`
  }
} ) as ʗSᗔÅ

export default uncoverAtom
