function mapButtons(buttons){
/*
    该函数的用处是将buttons数组变为buttons对象,例如:
    ["btn.Trademark.add","btn.Trademark.update","btn.Trademark.remove"]
    =>
    {
        "btn.Trademark.add":true,
        "btn.Trademark.update":true,
        "btn.Trademark.remove":true
    }
*/
    let obj = {};
    buttons.forEach((buttonStr)=>{
        obj[buttonStr] = true;
    })

    return obj
}

export default mapButtons