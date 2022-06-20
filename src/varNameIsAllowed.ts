import { ʗSᗔB } from '~types/basics'

let varNameIsAllowed = ( ( variableName ) => {
  // reject chars used in js code & prevent code execution
  if( variableName.match( /[\[\]\{\}\(\)\+\-\*\/=&\^%#@!?\\ ]/g ) ) return false
  try {
    return eval( `() => { let ${ variableName } = true; return ${ variableName } }` )()
  }
  catch( error ){
    return false
  }
} ) as ʗSᗔB

export default varNameIsAllowed
