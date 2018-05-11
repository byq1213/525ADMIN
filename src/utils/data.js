import url from "@/utils/url";

export function dataChart(arr) {
  let outDate = [];
  if (typeof arr == 'object') {
    arr.forEach(item => {
      let time = new Date(Math.floor(item.time));
      let getFullYear = time.getFullYear(); //完整年份
      let getMonth = time.getMonth(); //月份 1-11
      let getDate = time.getDate(); // 日期
      let getDay = time.getDay(); // 星期 0-6 
      let getHours = time.getHours(); // 小时数
      let getMinutes = time.getMinutes(); //分钟
      let xDate = `${time.getMonth() +1}-${time.getDate()}`; //分钟
      item = {
        time,
        getFullYear,
        getMonth,
        getDate,
        getDay,
        getMinutes,
        getHours,
        xDate
      }
      outDate.push(item)
    });
  }
  return outDate
}

export async function chartIndex(urls, lt = new Date().getTime(), gt = new Date().getTime() - 24 * 3600 * 7 * 1000) {
  console.log(lt, gt);

  let yData = [];
  let xData = []; //x轴
  let callback = {
    xData,
    yData,
  }
  let v1 = 24 * 3600 * 1000;
  let v2 = lt; //临时
  for (let i = 0; v2 > gt; i++) {
    let date = `${new Date(v2).getMonth() + 1}-${new Date(v2).getDate()}`;
    xData.push(date);
    v2 = v2 - v1;
  }
  xData = xData.reverse();
  let data = await url.post(urls, {
    gt,
    lt
  })
  data = dataChart(data.data.data);
  callback.count = data.length;

  xData.forEach(xitem => {
    let count = 0;
    data.forEach(yitem => {
      if (yitem.xDate == xitem) {
        count++;
      }
    });
    yData.push(count);
  });
  return callback
}

export async function getBrokerLists() {
  let lists = await url.post('/brokerLists')
  console.log(lists);
  
  return lists
}
