import fileSys from 'fs'
import { ʗSᗔS, str } from '~types/basics'
import appRoot from 'app-root-path'

let fileContent = ( ( file ) => {
  let content:str = fileSys.readFileSync( appRoot + '/' + file ).toString()
  return content
} ) as ʗSᗔS

export default fileContent
