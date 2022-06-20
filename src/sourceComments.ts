import { str, ʗSᗔᑕS·Sᑕᑐᑐ } from '~types/basics'
let sourceComments = ( ( source ) => {
  let output = source
  let commentMatches = output.match( /^ *\/\/.+/gm )
  //console.log( 'COMMENT_MATCHES', commentMatches, commentMatches? commentMatches[0].replace(/\\/g,'<@5l4s8/]') : 'nothing' )
  let commentFields:str[] = []
  if( commentMatches != null ){
    commentMatches.map( ( match, index ) => {
      let key = `_comment___${ index }` //)
      // match comments ( // ) and escape double quotes
      let value = match
      .replace(/\\/g,'<@5l4s8/]')
      .replace( /^ *\/\//,'' )
      .replace( /"/g,'<@qu0t3/]' )//.replace( /"/g,'\\\"' ).replace( /"/g,'\\\"' )//.replace(/\\\"/g,'\\\\"' ).replace(/\"/g,'\\\"' )
      output = output.replace( match ,`,${ key } : "${ value }",` )
      commentFields.push( `_comment___${ index }` )
    } )
  }
  // fix commas
  output = output.replace( /([\{\[ ]+\n)[ \t]*,/g, '$1' ).replace( /,[ \n\t]*,/g, ',\n' )
  //.replace(/,\n,/,',\n').replace(/\{\n,/,'{\n').replace(/\[\n,/,'[\n')
  //console.log( 'SOURCE_COMMENTS output', output )
  return [ output, commentFields ]
} ) as ʗSᗔᑕS·Sᑕᑐᑐ

export default sourceComments
