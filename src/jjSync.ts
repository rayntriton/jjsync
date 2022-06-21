import crypto from  'crypto'
import { str, num, boo, mol, obj, rex, nil, XFile, ʗSᗔS, ʗAᗔV, ʗVᗔV, ʗSᗔV } from '~types/basics'
import touch from '~root/touch'
import filesAreSync from '~root/filesAreSync'
import fileSys from 'fs'

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
    let path = fileNameParam.split( '=' )[ 1 ]
    if( path != '' ){
      if( path.startsWith( '/' ) ) jsonFile = path
      else jsonFile = process.cwd() + '/' + fileNameParam.split( '=' )[ 1 ]
      isJson = true
    }
  }
  if( fileNameParam.match( /js=/i ) ){
    let path = fileNameParam.split( '=' )[ 1 ]
    if( path != '' ){
      if( path.startsWith( '/' ) ) jsonFile = path
      else jsFile = process.cwd() + '/' + fileNameParam.split( '=' )[ 1 ]
      isJs = true
    }
  }
  return fileNameParam
} ) as ʗSᗔS )
if( ! isJson ){
  jsonFile = process.cwd() + '/' + 'package.json'
}
if( ! isJs ){
  jsFile = process.cwd() + '/' + 'package.jsos'
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
  fileSys.writeFileSync( jsFile , '{}' )
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
