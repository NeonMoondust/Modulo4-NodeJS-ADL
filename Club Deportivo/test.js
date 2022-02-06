let string = '42aa';
let bool = true;
for (let i = 0 ; i <= string.length - 1 ; i++){
    console.log(string.charCodeAt(i));
    if (!(string.charCodeAt(i) >= 48 && string.charCodeAt(i) <= 57)) {bool = false};
}
console.log(bool);