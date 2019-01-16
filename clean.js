var jetpack = require('fs-jetpack')

async function cleanup(){
  await Promise.all([
      jetpack.remove('./build'),
      jetpack.remove('./_DEBUG'),
      jetpack.remove('lib')
    ])
    console.log('clean')
}
cleanup()