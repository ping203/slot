var GeneratePoker = {
    arrtype: ["co", "ro", "bich", "tep"],
    arrnum: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"],
    randomPoker: function (sola, isDiff) {
        let result = [];
        if (isDiff) {
            while (result.length < sola) {
                let randomType = this.arrtype[Math.floor(Math.random() * this.arrtype.length)];
                let randomNum = this.arrnum[Math.floor(Math.random() * this.arrnum.length)];
                let poker = {
                    num: randomNum,
                    type: randomType
                };
                let search = result.find(function (e) {
                    return e.num === poker.num && e.type === poker.type;
                });

                if (!search) {
                    result.push(poker);
                }
            }
        } else if (isDiff === false) {
            while (result.length < sola) {
                let randomType = this.arrtype[Math.floor(Math.random() * this.arrtype.length)];
                let randomNum = this.arrnum[Math.floor(Math.random() * this.arrnum.length)];
                result.push({num: randomNum, type: randomType});
            }
        }
        return result;
    },
    generate5col: function () {
        let ds30La = this.randomPoker(30, true);
        let res = [];
        let arrCot1 = [], arrCot2 = [], arrCot3 = [], arrCot4 = [], arrCot5 = [];
        ds30La.forEach(function (current, index, array) {
            if (index < 3)
                arrCot1.push(current);
            if (index >= 3 && index < 6) {
                arrCot2.push(current);
            }
            if (index >= 6 && index < 9) {
                arrCot3.push(current);
            }
            if (index >= 9 && index < 12) {
                arrCot4.push(current);
            }
            if (index >= 12 && index < 15) {
                arrCot5.push(current);
            }
            if (index > 15) {
                return;
            }
        });
        arrCot1 = arrCot1.concat(this.randomPoker(24, false));
        arrCot2 = arrCot2.concat(this.randomPoker(24, false));
        arrCot3 = arrCot3.concat(this.randomPoker(24, false));
        arrCot4 = arrCot4.concat(this.randomPoker(24, false));
        arrCot5 = arrCot5.concat(this.randomPoker(24, false));
        ds30La.forEach(function (current, index, array) {
            if (index >= 15 && index < 18)
                arrCot1.push(current);
            if (index >= 18 && index < 21) {
                arrCot2.push(current);
            }
            if (index >= 21 && index < 24) {
                arrCot3.push(current);
            }
            if (index >= 24 && index < 27) {
                arrCot4.push(current);
            }
            if (index >= 27 && index < 30) {
                arrCot5.push(current);
            }
        });
        res = arrCot1.concat(arrCot2).concat(arrCot3).concat(arrCot4).concat(arrCot5);
        return res;
    },
    randomPokerDiffArr(sola, arr2) {
        let result = [];
        while (result.length < sola) {
            let randomType;
            let randomNum;
            let poker;
            do {
                randomType = this.arrtype[Math.floor(Math.random() * this.arrtype.length)];
                randomNum = this.arrnum[Math.floor(Math.random() * this.arrnum.length)];
                poker = {
                    num: randomNum,
                    type: randomType
                };
                x = arr2.find(function (e) {
                    return e.num === randomNum && e.type === randomType;
                })
            }while (x);

            let search = result.find(function (e) {
                return e.num === poker.num && e.type === poker.type;
            });

            if (!search) {
                result.push(poker);
            }
        }
        result.splice(1, 0, arr2[0]);
        result.splice(4, 0, arr2[1]);
        result.splice(7, 0, arr2[2]);
        result.splice(10, 0, arr2[3]);
        result.splice(13, 0, arr2[4]);

        return result;
    }
};