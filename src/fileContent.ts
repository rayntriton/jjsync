import fileSys from 'fs'
import { ʗSᗔS, str } from '~types/basics'

let fileContent = ( ( file ) => {
  let content:str = fileSys.readFileSync( file ).toString()
  return content
} ) as ʗSᗔS

export default fileContent
