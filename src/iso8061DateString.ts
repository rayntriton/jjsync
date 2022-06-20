import { ʗDateᐤᗔS, ʗNᗔS, str } from '~types/basics'

let pad = ( ( n ) => String( n ).padStart( 2, '0' ) ) as ʗNᗔS

let iso8061DateString = ( ( d = new Date() ) => {
  let matchOffset:RegExpMatchArray|null = new Date( new Date().getTimezoneOffset() * 1000 )
    .toISOString().match( /:..:..\./ )
  let offset:str = matchOffset ? matchOffset[ 0 ].slice( 1, -1 ) : 'no offset found'

  return ''
    + d.getFullYear() + '-'
    + pad( d.getMonth() + 1 ) + '-'
    + pad( d.getDate() ) + 'T'
    + pad( d.getHours() ) + ':'
    + pad( d.getMinutes() ) + ':'
    + pad( d.getSeconds() ) + '.'
    + String( d.getMilliseconds() ).padStart( 3, '0' )
    + ( d.getTimezoneOffset() > 0 ? '-' : '+' )
    + offset
} ) as ʗDateᐤᗔS

export default iso8061DateString
