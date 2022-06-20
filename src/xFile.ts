import { str, obj, rex, ʗXFileᗔV, ʗVᗔV, ʗAᗔV } from '~types/basics'
import fileSys from 'fs'
import jsPrettyString from '~root/jsPrettyString'
import safeEval from '~root/safeEval'
import update from '~root/update'
import sourceComments from '~root/sourceComments'
import filesAreSync from '~root/filesAreSync'
import fileContent from '~root/fileContent'
import iso8061DateString from '~root/iso8061DateString'
import appRoot from 'app-root-path'

export default class XFile{
  fileName:str
  type:str
  get content(){
    return fileContent( this.fileName )
  }
  pair:XFile = {} as XFile
  constructor( fileName:str, type:str ){
    this.fileName = fileName
    this.type = type
    if( type != 'js' && type != 'json' ) throw new Error( 'File is neither json or js' )
  }
  setPair = ( ( xFile ) => {
    this.pair = xFile
  } ) as ʗXFileᗔV
  status:str = 'IDLE'
  externalUpdates:str[] = []
  watch = ( () => {
    //console.log(`Watching ${ this.fileName }`)
    try {
      fileSys.watch( this.fileName, ( event, fileName ) => {
        //console.log('EVENT',event)
        let this_:XFile = this
        if ( event == 'change' ) {
          if( this.status == 'IDLE' ){
            this.status = 'RUNNING'
            let loopForContent = ( () => {
              if( this_.content != '' && this_.externalUpdates.length == 0 ){
                this_.pair.sync()
                this_.status = 'IDLE'
              }
              else {
                setTimeout( () => {
                  this_.externalUpdates.pop()
                  loopForContent()
                }, 2000 )
              }
            } )
            loopForContent()
          }
          else {
            this.externalUpdates.push( 'change' )
          }
        } } ) }
    catch( error ){
      console.error( 'ERROR', error )
    }
  } ) as ʗVᗔV
  private toJs(){
    let origin:obj = safeEval( this.content )
    let [ sourcedComments, keepFields ]:[ str, str[] ] = sourceComments( this.pair.content )
    //console.log( 'KEEP_FIELDS', keepFields )
    let destiny:obj = safeEval( sourcedComments )
    let updatedSource:obj = update( destiny, origin, keepFields )

    let pretty:str = jsPrettyString( updatedSource, 'js' )
    //console.log( 'PRETTYED updatedSource, pretty', updatedSource, pretty )
    //let regexSourceToComment:rex = /__comment__\d+ : "((?:\\.|[^\\"])*)"/gm
    let regexSourceToComment:rex = /^( *|\t*)_comment___\d+ : "((\\.|[^\\"])*)".*/gm

    let result:str = pretty
      .replace( regexSourceToComment, '$1//$2' )
      .replace( /<@qu0t3\/]/g, '"' )
      .replace( /<@5l4s8\/]/g, '\\' )

    //console.log( 'RESULT JS', result )
    fileSys.writeFileSync( `${ appRoot }/${ this.pair.fileName }` , result )
  }
  private toJson(){
    let js:obj = safeEval( this.content )
    let json:str = jsPrettyString( js, 'json' )
    //console.log( 'RESULT JSON', json )
    fileSys.writeFileSync( `${ appRoot }/${ this.pair.fileName }` , json )
    fileSys.appendFileSync( `${ appRoot }/.package.json_history`,
      `\n\n==========Updated ${ iso8061DateString() }==================================
      \n${ json }\n` )
  }
  sync(){
    if( ! filesAreSync( this, this.pair ) ){
      //console.log( `! FILES_ARE_SINC ====\n${ this.content }====\n${ this.pair.content }====\n` )
      if( this.type == 'js' ){
        this.pair.toJs()
      }
      else
        this.pair.toJson()
    }
    else console.log( `files are sync'ed` )
  }
}
