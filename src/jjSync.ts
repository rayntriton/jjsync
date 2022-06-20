import crypto from  'crypto'
import { str, num, boo, mol, obj, rex, nil, XFile, ʗSᗔS, ʗAᗔV, ʗVᗔV, ʗSᗔV } from '~types/basics'
import touch from '~root/touch'
import filesAreSync from '~root/filesAreSync'
import fileSys from 'fs'
import appRoot from 'app-root-path'

const args = process.argv.slice( 2 )
/*if( args.length != 2 ){
  console.log( `Args error: usage ${ process.argv[ 0 ] } ${ process.argv[ 1 ] } file1 file2`)
  process.exit( -1 )
}*/

let jsonFile = '',
    jsFile = '',
    isJson = false,
    isJs = false
args.map( ( ( fileNameParam ) => {
  if( fileNameParam.match( /json=/i ) ){
    jsonFile = fileNameParam.split('=') ? fileNameParam.split( '=' )[ 1 ] : ''
    if( jsonFile != null )
      isJson = true
  }
  if( fileNameParam.match( /js=/i ) ){
    jsFile = fileNameParam.split('=') ? fileNameParam.split( '=' )[ 1 ] : ''
    if( jsonFile != null )
      isJs = true
  }
  return fileNameParam
} ) as ʗSᗔS )
if( ! isJson ){
  jsonFile = 'package.json'
}
if( ! isJs ){
  jsFile = 'package.jsos'
}

/*let md5Hash = ( ( string ) => {
  return crypto.createHash( 'md5').update( string ).digest('hex')
} ) as ʗSᗔS
*/

touch( jsonFile )
touch( jsFile )

let json:XFile = new XFile( jsonFile, 'json' )
let js:XFile = new XFile( jsFile, 'js' )
json.setPair( js )
js.setPair( json )
if( js.content == '' ){
  fileSys.writeFileSync( `${ appRoot }/${ js.fileName }` , '{}' )
}
json.watch()
js.watch()
setTimeout( () => {
  if( js.content == '{}' ){
    js.sync()
  }
  else {
    if( ! filesAreSync( js, json ) )
      console.log( `jjsync: WARNING: files out of sync. ${ jsFile } and ${ jsonFile } not sync'ed.` )
    else console.log( `jjsync: files are sync'ed actually` )
  }
}, 100 )
