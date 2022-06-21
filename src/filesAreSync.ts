import { ʗXFile·XFileᗔB, obj } from '~types/basics'
import safeEval from '~root/safeEval'
import lodash from 'lodash'
import fileSys from 'fs'

let filesAreSync = ( ( xfile1, xfile2 ) => {
  if( ! fileSys.existsSync( xfile1.fileName ) )
    return false
  if( ! fileSys.existsSync( xfile2.fileName ) )
    return false
  let jsObject:obj = safeEval( xfile1.content )
  let jsonObject:obj = safeEval( xfile2.content )
  return lodash.isEqual( jsObject, jsonObject )
} ) as ʗXFile·XFileᗔB

export default filesAreSync
