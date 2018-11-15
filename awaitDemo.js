function handleSql(val) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`延时${val}秒触发`)
      resolve(val);
    }, 1000);
  })
}

[1,2,3].forEach(async index => {
  console.log('调用await之前',index)
  const result = await handleSql(index);
  console.log('调用await之后',index)
})


async function forFn() {
  for(let index of [1,2,3]){
    console.log('调用await之前',index)
    const result = await handleSql(index);
    console.log('调用await之后',index)
  }
}
forFn()

async function forFn() {
  for(var index = 1;index<4;index++) {
    console.log('调用await之前',index)
    const result = await handleSql(index);
    console.log('调用await之后',index)
  }
}
forFn()