import { ʗS·R·S·BᐤNᐤNᐤᗔS }  from '~types/basics'

let replaceWhile = ( ( str, regex, replacer, overflow = false, maxStack = 100, iterationCount = 0 ) =>{
  if( ! overflow && iterationCount >= maxStack) throw new Error( 'Function overflowed. Error emitted as a safeward. Turn "overflow = true" to prevent this error' )
  if( str.match( regex ) )
    return replaceWhile( str.replace( regex, replacer ), regex, replacer, overflow, maxStack, iterationCount ++ )
  else return str
} ) as ʗS·R·S·BᐤNᐤNᐤᗔS

export default replaceWhile
