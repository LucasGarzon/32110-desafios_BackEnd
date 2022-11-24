import {Router} from 'express';
const router = Router()

function verifyArgs(argvs) {
  if (argvs.length === 0) return 'no arguments entered'
  return argvs
} 

const infoView = {
  argvs: verifyArgs(process.argv.slice(2)),
  platform: process.platform,
  nodeVersion: process.version,
  memoryUsage: process.memoryUsage(),
  path: process.execPath,
  pid: process.pid,
  directory: process.cwd()
}

console.log(infoView);

router.get('/', (req, res) => {
  res.render('index_info', {info: infoView})
})

const infoRouter = router
export {infoRouter}

