### 斐波那契数列奇数项求和
一个函数，传入参数num，要求返回小于等于斐波那契数列中小于num的奇数项的和。

### 思路一：
```
function sumFibs(num) {
    var arr = [0,1];
    for (var i = 0;i<num; i++) {
        if(arr[arr.length-1] <= num) {
            arr.push(arr[arr.length-1] + arr[arr.length-2]);
        }
    }
    arr.pop();
    function sum (arr) {
        var sum = 0;
        for(var i = 0;i<arr.length; i++) {
           if( arr[i]%2 ) sum += arr[i];
        }
        return sum;
    }
    return sum(arr);
}
```
函数内部首先用一个循环，得到一个斐波那契数列存入数组arr中，数列最大项小于num。然后通过一个内建函数循环数组各项，筛选出其中的奇数项来相加并返回出来，最后再返回出这个和。
这样实现用到了两次for循环，如果传入的数值非常大，会增加运行时间或者假死。

### 思路二：
```
function sumFibs(num) {
  var a = 1,b = 1,sum = 0,c = 1;
  while (sum <= num) {
    if (a % 2 !== 0) c += a;
    sum = a + b;
    console.log(a,b,sum,c);
    a = sum;
    b = sum - b;
  }
  return c;
}
```
由于斐波那契数列数列有固定的规律，所以要判断所有小于num的奇数项只需要关注最大的那一项，而最大的那一项（前两位为1除外）肯定是由前两项相加得来的。将所有的操作放在一个循环里，首先这个循环要能够实现斐波那契数列规则的功能，也就有了`sum = a + b; a = sum; b = sum = b;`现在能够实现一个每一项都小于num的数列了，然后再在while循环中判断各项是否为奇数项，通过在循环体最顶部判断`a % 2 !== 0`,如果是奇数项则累加起来得到c，由于数列中第一位1是没有累加到的，所以将c的初始值设为1。
最终的到结果。
