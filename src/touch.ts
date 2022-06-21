import { execSync } from 'child_process'
import { ʗSᗔV, ʗU·S·UᗔV } from '~types/basics'

let touch = ( ( file ) => {
  execSync( `touch ${ file }` )/*, ( ( error, stdout, stderr ) => {
    if ( error ) console.log( `error: ${ error }` )
    if ( stderr ) console.log( `stderr: ${ stderr }` )
    if( stdout ) console.log( `stdout: ${ stdout }` )
  } ) as ʗU·S·UᗔV )*/
} ) as ʗSᗔV

export default touch
