import {
  ʗN·N·CᗔS,
  ʗNᗔʗNᗔS,
  ʗNᗔS,
  ʗÅ·NᗔÅ,
  ʗO·SᐤNᐤNᐤSᐤNᐤSᐤᗔS,
  Åtom, Str, Num, Obj
} from '~types/basics'
import uncoverAtom from '~root/uncoverAtom'
import varNameIsAllowed from '~root/varNameIsAllowed'
import replaceWhile from '~root/replaceWhile'

let spaces =( ( number, tabSize , char ) => {
  let spaces_ = ''
  for( let i = 0; i < number * tabSize; i ++ ) spaces_ += char
  return spaces_
} ) as ʗN·N·CᗔS

let tabs = ( ( m ) => {
  return ( n ) => spaces( n, m, ' ' )
} ) as ʗNᗔʗNᗔS

let unTabs = ( ( m ) => {
  return ( n ) => spaces( n, m, '\b' )
} ) as ʗNᗔʗNᗔS

let jsPrettyString = ( (
                          object,
                          outputSrc = 'js',
                          level = 1,
                          xCoord = 0,
                          yCoord = 'object',
                          tabSize = 2,
                          objectInitType = '[\n]'
                        ) => {
  let tabsz:ʗNᗔS = tabs( tabSize ),
      unTabsz:ʗNᗔS = unTabs( tabSize ),
      newLineAtOpen = '';
  let result:Str = ''
  if( objectInitType == '[ ['){
    if( xCoord == 0 && yCoord == 'object' ) newLineAtOpen = `${ unTabsz( level - 1 ) }\b `
  }
  else newLineAtOpen = ''
  //console.log( xCoord, yCoord )
  if( Array.isArray( object ) ) {
    result = `${ newLineAtOpen }[\n`
    for( var i = 0; i < object.length; i++){
      let entry:Str
      if(typeof object[ i ] =='object' )
        entry = jsPrettyString( object[ i ], outputSrc, level + 1, i, 'object' , tabSize, objectInitType )
      else entry = object[ i ]
      let entry_:Åtom = typeof object[ i ] == 'string' ? `"${ entry.replace( /\"/g,'\\"' ) }"` : entry //uncoverAtom( entry )
      result += tabsz( level ) + `${ entry_ }${ i < object.length - 1 ? ',\n' : '\n' }`
    }
    result += tabsz( level - 1 ) + `]`
  }
  else if( typeof object == 'object' ) {
    result += `${ newLineAtOpen }{\n`
    let index = -1
    for( var key in object ){
      index ++
      let key_:Str = ( outputSrc == 'js' && varNameIsAllowed( key ) ) ? key : `"${ key }"`
      let value:Str
      if( typeof object[ key ] == 'object' ){
        value = jsPrettyString( object[ key ] as Obj, outputSrc, level + 1, index, 'object' , tabSize, objectInitType )
      }
      else value = object[ key ] as Str
      //console.log('TYPEOF key, object[ key ]', typeof object[ key ], key, object[ key ] )
      let value_:Str = ( typeof object[ key ] == 'string' ? `"${ value.replace( /\"/g,'\\"' ) }"` : value ) //uncoverAtom( value )
      result += tabsz( level ) + `${ key_ } : ${ value_ }${ index < Object.keys( object ).length - 1 ? ',\n' : '\n' }`
    }
    /*let objectType = object as object
    result += `${ newLineAtOpen }{\n`
    let keys:Str[] = Object.keys( objectType )
    var length:Num = keys.length
    for( let index = 0; index < length; index ++){
      let key = keys[ index ] as keyof typeof objectType
      let key_:Str = ( outputSrc == 'js' && varNameIsAllowed( key ) ) ? key : `"${ key }"`
      let value:Str
      if( typeof objectType[ key ] == 'object' )
       value = jsPrettyString( objectType[ key ], outputSrc, level + 1, index, 'object' , tabSize, objectInitType )
      else value = objectType[ key ]
      let value_:Åtom = ( typeof value == 'string' ? `"${ value.replace( /\"/g,'\\"' ) }"` : value ) //uncoverAtom( value )
      result += tabsz( level ) + `${ key_ } : ${ value_ }${ index < length - 1 ? ',\n' : '\n' }`
    }
    */
    result += tabsz( level - 1 ) + `}`
  }
  else {
    result += ( typeof object == 'string' ? (object as Str).replace( /\"/g,'\\"' ) : object )
  } //uncoverAtom( String( object ) );
  if( level == 1 ){
    let regex = /([^|^\b][\b])|^[\b]/mg
    return replaceWhile( result , regex, '' )
  }
  return result
} ) as ʗO·SᐤNᐤNᐤSᐤNᐤSᐤᗔS

export default jsPrettyString
