import { ʗXFile·XFileᗔB, obj } from '~types/basics'
import safeEval from '~root/safeEval'
import lodash from 'lodash'

let filesAreSync = ( ( xfile1, xfile2 ) => {
  let jsObject:obj = safeEval( xfile1.content )
  let jsonObject:obj = safeEval( xfile2.content )
  return lodash.isEqual( jsObject, jsonObject )
} ) as ʗXFile·XFileᗔB

export default filesAreSync
