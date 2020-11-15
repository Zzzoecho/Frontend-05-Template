const str2Utf8 = (str) => {
    const utf8Arr = [];
    for(let i = 0; i < str.length; i++){
        let c = str.charCodeAt(i);
        // 4个字节
        if(c >= 0x010000 && c <= 0x10FFFF){
            utf8Arr.push(((c >> 18) & 0x07) | 0xF0);
            utf8Arr.push(((c >> 12) & 0x3F) | 0x80);
            utf8Arr.push(((c >> 6) & 0x3F) | 0x80);
            utf8Arr.push((c & 0x3F) | 0x80);
        }else if(c >= 0x000800 && c <= 0x00FFFF){
            // 3个字节
            utf8Arr.push(((c >> 12) & 0x0F) | 0xE0);
            utf8Arr.push(((c >> 6) & 0x3F) | 0x80);
            utf8Arr.push((c & 0x3F) | 0x80);
        }else if(c >= 0x000080 && c <= 0x0007FF){
            // 2个字节
            utf8Arr.push(((c >> 6) & 0x1F) | 0xC0);
            utf8Arr.push((c & 0x3F) | 0x80);
        }else{
            // 1个字节
            utf8Arr.push(c & 0xFF);
        }
    }
    return utf8Arr
}
