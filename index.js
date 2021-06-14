var arr = [0,1,2,3,4,5,6,7]

arr.forEach((e,i)=>{
    if(e>4){
        arr.splice(i,1)
    }
})
console.log(arr)