
  // const test = ({ adUnitId }) => {
  //   return {
  //     adUnitId,
  //     onError: (fn) => fn(),
  //     onLoad: (fn) => fn()
  //   }
  // }
  // const createInterstitialAd = (adUnitId) => {
  //   let timer
  //   return new Promise((resolve, reject) => {
  //     const intersitialAd = test({
  //       adUnitId,
  //     })
  //     intersitialAd.onLoad && intersitialAd.onLoad(() => resolve(intersitialAd))
  //     intersitialAd.onError && intersitialAd.onError((err) => reject(err))
  //     timer = setTimeout(() => {
  //       reject('expire error')
  //       clearTimeout(timer)
  //       timer = null
  //     }, 3000)
  //   }).catch((err) => console.log('createInterstitialAd err:', err))
  // }
  // createInterstitialAd('1111111').then((res) => {
  //   console.log(res)
  // }).catch(err => {
  //   console.log(err)
  // })


//   const TEMPLATE_TYPE = [{
//     key: 'thing',
//     value: '20个以内字符(可汉字、数字、字母或符号组合)',
//   }, {
//     key: 'number',
//     value: '32位以内数字(只能数字，可带小数)',
//   }, {
//     key: 'letter',
//     value: '32位以内字母(只能字母)',
//   }, {
//     key: 'symbol',
//     value: '5位以内符号(只能符号)',
//   }, {
//     key: 'character_string',
//     value: '32位以内数字、字母或符号(可数字、字母或符号组合)',
//   }, {
//     key: 'time',
//     value: '24小时制时间格式（支持+年月日）',
//   }, {
//     key: 'date',
//     value: '年月日格式（支持+24小时制时间）',
//   }, {
//     key: 'amount',
//     value: '1个币种符号+10位以内纯数字，可带小数，结尾可带“元”',
//   }, {
//     key: 'phone_number',
//     value: '17位以内，数字、符号',
//   }, {
//     key: 'car_number',
//     value: '8位以内，第一位与最后一位可为汉字，其余为字母或数字',
//   }, {
//     key: 'name',
//     value: '10个以内纯汉字或20个以内纯字母或符号(中文和字母混合按中文名算，10个字内)',
//   }, {
//     key: 'phrase',
//     value: '5个以内纯汉字',
//   }]

// const content = "商品名称:{{name10.DATA}}\n支付金额:{{amount9.DATA}}\n支付时间:{{time8.DATA}}\n温馨提示:{{thing3.DATA}}\n"

// function mapToString(str) {
//   return str
//     .split('\n')
//     .filter(item => item)
//     .reduce((result, curr) => {
//       let tmp = {}
//       const currArr = curr.split(':{{')
//       const currSplit = currArr[1].split('.')
//       const filterItem = TEMPLATE_TYPE.filter(item => currSplit[0].includes(item.key))

//       if (filterItem.length) {
//         tmp[currSplit[0]] = {
//           title: `${currArr[0]}(${currSplit[0]})`,
//           value: filterItem[0].value
//         }
//       }

//       return {
//         ...result,
//         ...tmp
//       }
//     }, {})
//   }

// console.log(mapToString(content))

// const func = () => {
//   return Promise.resolve()
// }

// const requestSubMess = () => {
//   return Promise.resolve(111)
// }
// const submitTemplateId = () => {
//   return Promise.reject('submitTemplateId')
// }
// const func2 = () => {
//   return submitTemplateId().catch((err) => {
//     return err
//   })
// }
// const checkTemplateId = () => {
//   return func().then((res) => {
//     return requestSubMess().then(() => {
//       return func2
//     })
//     // .catch(err => {
//     //   console.log('1111111:', err)
//     //   return null
//     // })
//   }).catch(err => {
//     console.log('22222:', err)
//     return null
//   })
// }

// checkTemplateId().then(err => {
//   console.log(3333333333333, err)
// })

let isShow = false
const func = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject()
    }, 2000)
  })
}

const requestSubMess = () => {
  return Promise.resolve(111)
}
const funcaa = async() => {
  try {
    return await func()
  } catch (error) {
    console.error('error', error)
    // return 10
  }
}
const submitTemplateId = async () => {
  try {
    const condition = await func()
  } catch (error) {
    // console.error('error', error)
    // return Promise.resolve(null)
  }
  return requestSubMess().then(async () => {
      const a = await funcaa()
      console.log(222222222222222222, a)
    }).then((res) => {
      console.log(444444444444, res)
      return res
    })
}

const resFunc = () => {
  return submitTemplateId().then((res) => {
    console.log(3333, res)
    func().catch(e => {
      console.log('inorge')
    })
    return 1
  }).then((e) => {
    console.log(e)
    return e
  }).catch(e => {
    console.log(55, e)
  })
  console.log(isShow)
}
resFunc().then((res) => {
  console.log(66, res)
})