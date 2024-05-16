//デフォルトの持ち金設定
let credit = 50000;
$(function () {
    $("#credit").html(`$ ${credit}`);
});

// トランプデータ
const marks = [
    '♠️',
    '♣️',
    '♦️',
    '♥️'
];

// トランプの数字
const nums = [
    {rank: 2, label: '2' },
    {rank: 3, label: '3' },
    {rank: 4, label: '4' },
    {rank: 5, label: '5' },
    {rank: 6, label: '6' },
    {rank: 7, label: '7' },
    {rank: 8, label: '8' },
    {rank: 9, label: '9' },
    {rank: 10, label: '10' },
    {rank: 11, label: 'J' },
    {rank: 12, label: 'Q' },
    {rank: 13, label: 'K' },
    {rank: 14, label: 'A' }
];

// トランプを入れるデッキ
let deck = [];

// 各マークごとに2からAまで作成する
for (const mark of marks) {
    for (const num of nums) {
        deck.push({ num: num, mark: mark });
    }
}

// シャッフル関数
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // 配列の要素を入れ替える
    }
}

// カード画像のパスを生成する関数
function getCardImagePath(card) {
    return `img/card/${card.num.label}_of_${card.mark}.png`;
}

// カードをプレイヤーに配布する関数
function dealCards() {
    shuffleDeck(deck); // デッキをシャッフル

    //変数の設定
    let playerNum = 0; // プレイヤーの数字（10 引く前）
    let playerNum1 = 0; // プレイヤーの1枚目の数字（10 引く前）
    if (deck[0].num.rank == 11 || deck[0].num.rank == 12 || deck[0].num.rank == 13) {
        playerNum1 = 10
    } else if (deck[0].num.rank == 14) {
        playerNum1 = 1
    } else {
        playerNum1 = deck[0].num.rank;
    }
    let playerNum2 = 0; // プレイヤーの2枚目の数字（10 引く前）
    if (deck[2].num.rank == 11 || deck[2].num.rank == 12 || deck[2].num.rank == 13) {
        playerNum2 = 10
    } else if (deck[2].num.rank == 14) {
        playerNum2 = 1
    } else {
        playerNum2 = deck[2].num.rank;
    }
    let playerNum3 = 0; // プレイヤーの3枚目の数字（10 引く前）
    if (deck[4].num.rank == 11 || deck[4].num.rank == 12 || deck[4].num.rank == 13) {
        playerNum3 = 10
    } else if (deck[4].num.rank == 14) {
        playerNum3 = 1
    } else {
        playerNum3 = deck[4].num.rank;
    }
    let playerSum = 0; // プレイヤーの結果数字
    let bankerNum = 0; // バンカーの数字（10 引く前）
    let bankerNum1 = 0; // バンカーの1枚目の数字（10 引く前）
    if (deck[1].num.rank == 11 || deck[1].num.rank == 12 || deck[1].num.rank == 13) {
        bankerNum1 = 10
    } else if (deck[1].num.rank == 14) {
        bankerNum1 = 1
    } else {
        bankerNum1 = deck[1].num.rank;
    }
    let bankerNum2 = 0; // バンカーの2枚目の数字（10 引く前）
    if (deck[3].num.rank == 11 || deck[3].num.rank == 12 || deck[3].num.rank == 13) {
        bankerNum2 = 10
    } else if (deck[3].num.rank == 14) {
        bankerNum2 = 1
    } else {
        bankerNum2 = deck[3].num.rank;
    }
    let bankerNum3 = 0; // バンカーの3枚目の数字（10 引く前）
    if (deck[5].num.rank == 11 || deck[5].num.rank == 12 || deck[5].num.rank == 13) {
        bankerNum3 = 10
    } else if (deck[5].num.rank == 14) {
        bankerNum3 = 1
    } else {
        bankerNum3 = deck[5].num.rank;
    }
    let bankerSum = 0; // バンカーの結果数字

    //2枚目までカード配布
    $("#playerCardA").fadeIn(500).attr("src", getCardImagePath(deck[0]));
    $("#bankerCardA").delay(1500).fadeIn(500).attr("src", getCardImagePath(deck[1]));
    $("#playerCardB").delay(2500).fadeIn(500).attr("src", getCardImagePath(deck[2]));
    $("#bankerCardB").delay(3500).fadeIn(500).attr("src", getCardImagePath(deck[3]));
    playerNum = playerNum1 + playerNum2; // プレイヤーの2枚のカードの合計
    bankerNum = bankerNum1 + bankerNum2; // バンカーの2枚のカードの合計

    // プレイヤーの2枚目までの合計値が10以上の時
    if (playerNum >= 10) { // プレイヤーの2枚のカードの合計が10以上の時
        playerNum = playerNum - 10; // プレイヤーの合計値
    }

    // バンカーの2枚目までの合計値が10以上の時
    if (bankerNum >= 10) { // バンカーの2枚のカードの合計が10以上の時
        bankerNum = bankerNum - 10; // バンカーの合計値
    }

    //プレイヤー、バンカーいずれかがナチュラルか否か
    if (playerNum >= 8 || bankerNum >= 8) {
        // 双方3枚目は配られず結果が確定
        playerSum = playerNum; // プレイヤーの合計値
        bankerSum = bankerNum; // バンカーの合計値
    } else { // ナチュラルでない時の分岐
        if (playerNum <= 5) { // プレイヤーの2枚のカードの合計が5以下の時

            // プレイヤーに3枚目のカードが配られる
            playerNum = playerNum + playerNum3;
            if (playerNum >= 10) { // プレイヤーの3枚のカードの合計が10以上の時
                playerSum = playerNum - 10; // プレイヤーの合計値
            }
            playerSum = playerNum; // プレイヤーの3枚のカードの合計が10未満の時

            //プレイヤー3枚目表示
            $("#playerCardC").delay(4500).fadeIn(500).attr("src", getCardImagePath(deck[4]));

            if (playerSum == 0 || playerSum == 1 || playerSum == 9) { // プレイヤーの合計が0or1or9の時

                if (bankerNum <= 3) { // バンカーの2枚の合計値が3以下の時
                    bankerNum = bankerNum + bankerNum3; // バンカー3枚目ドロー
                    if (bankerNum >= 10) { // バンカーの3枚のカードの合計が10以上の時
                        bankerSum = bankerNum - 10; // バンカーの合計値
                    }
                    bankerSum = bankerNum; // バンカーの3枚のカードの合計が10未満の時
                    $("#bankerCardC").delay(5500).fadeIn(500).attr("src", getCardImagePath(deck[5]));
                } else {
                    bankerSum = bankerNum; //　バンカーに3枚目は配られない
                }

            } else if (playerSum == 2 || playerSum == 3) { // プレイヤーの合計が2or3の時

                if (bankerNum <= 4) { // バンカーの2枚の合計値が4以下の時
                    bankerNum = bankerNum + bankerNum3; // バンカー3枚目ドロー
                    if (bankerNum >= 10) { // バンカーの3枚のカードの合計が10以上の時
                        bankerSum = bankerNum - 10; // バンカーの合計値
                    }
                    bankerSum = bankerNum; // バンカーの3枚のカードの合計が10未満の時
                    $("#bankerCardC").delay(5500).fadeIn(500).attr("src", getCardImagePath(deck[5]));
                } else {
                    bankerSum = bankerNum; //　バンカーに3枚目は配られない
                }

            } else if (playerSum == 4 || playerSum == 5) { // プレイヤーの合計が4or5の時

                if (bankerNum <= 5) { // バンカーの2枚の合計値が5以下の時
                    bankerNum = bankerNum + bankerNum3; // バンカー3枚目ドロー
                    if (bankerNum >= 10) { // バンカーの3枚のカードの合計が10以上の時
                        bankerSum = bankerNum - 10; // バンカーの合計値
                    }
                    bankerSum = bankerNum; // バンカーの3枚のカードの合計が10未満の時
                    $("#bankerCardC").delay(5500).fadeIn(500).attr("src", getCardImagePath(deck[5]));
                } else {
                    bankerSum = bankerNum; //　バンカーに3枚目は配られない
                }

            } else if (playerSum == 6 || playerSum == 7) { // プレイヤーの合計が6or7の時

                if (bankerNum <= 6) { // バンカーの2枚の合計値が4以下の時
                    bankerNum = bankerNum + bankerNum3; // バンカー3枚目ドロー
                    if (bankerNum >= 10) { // バンカーの3枚のカードの合計が10以上の時
                        bankerSum = bankerNum - 10; // バンカーの合計値
                    }
                    bankerSum = bankerNum; // バンカーの3枚のカードの合計が10未満の時
                    $("#bankerCardC").delay(5500).fadeIn(500).attr("src", getCardImagePath(deck[5]));
                } else {
                    bankerSum = bankerNum; //　バンカーに3枚目は配られない
                }

            } else if (playerSum == 8) { // プレイヤーの合計が8の時

                if (bankerNum <= 2) { // バンカーの2枚の合計値が4以下の時
                    bankerNum = bankerNum + bankerNum3; // バンカー3枚目ドロー
                    if (bankerNum >= 10) { // バンカーの3枚のカードの合計が10以上の時
                        bankerSum = bankerNum - 10; // バンカーの合計値
                    }
                    bankerSum = bankerNum; // バンカーの3枚のカードの合計が10未満の時
                    $("#bankerCardC").delay(5500).fadeIn(500).attr("src", getCardImagePath(deck[5]));
                } else {
                    bankerSum = bankerNum; //　バンカーに3枚目は配られない
                }

            }

        //プレイヤーに3枚目が配られなかったパターン
        } else if (playerNum == 6 || playerNum == 7) {
            playerSum = playerNum; // プレイヤー3枚目は配られない

            if (bankerNum <= 5) { // バンカーの2枚の合計値が5以下の時
                bankerNum = bankerNum + bankerNum3; // バンカー3枚目ドロー
                if (bankerNum >= 10) { // バンカーの3枚のカードの合計が10以上の時
                    bankerSum = bankerNum - 10; // バンカーの合計値
                }
                bankerSum = bankerNum; // バンカーの3枚のカードの合計が10未満の時
                $("#bankerCardC").delay(5500).fadeIn(500).attr("src", getCardImagePath(deck[5]));
            } else {
                bankerSum = bankerNum; //　バンカーに3枚目は配られない
            }
        }
    }

    //次のゲームをどうするかの浦っっぷアップ
    $("#resultPop").delay(6000).fadeIn(500);

    //結果の判定
    if (playerSum > bankerSum) {
        $("#result").text("PLAYER WIN");
    } else if (playerSum < bankerSum) {
        $("#result").text("BANKER WIN");
    } else if (playerSum == bankerSum) {
        $("#result").text("TIE");
    }

    $("#resultPlayer").text("PLAYER：" + playerSum);
    $("#resultBanker").text("BANKER：" + bankerSum);

    resultMoney(playerSum, bankerSum);

}

// 「DEAL」ボタンを押してカードをシャッフルして配布する
$(function () {
    $("#dealButton").on("click", function () {
        if (betBankerMoney != 0 || betPlayerMoney != 0 || betTieMoney != 0) {
            dealCards();
            reset();
        } else {
            $('#betAlert').fadeIn(250, function () {
                $(this).delay(750).fadeOut("slow");
            });
        }
    });
});

//「RESET」ボタンプッシュ
$(function () {
    $("#resetButton").on("click", function () {
        reset();
        betReset();
    });
});

//リセット関数
function reset() {
    betSubject = "";
    $("#bankerButton").css("background-color", "rgba(198, 252, 242, 0.75)");
    $("#playerButton").css("background-color", "rgba(198, 252, 242, 0.75)");
    $("#tieButton").css("background-color", "rgba(198, 252, 242, 0.75)");
}

//ベット金額をリセット
function betReset() {
    betBankerMoney = 0;
    $("#bankerBet").text('');
    betPlayerMoney = 0;
    $("#playerBet").text('');
    betTieMoney = 0;
    $("#tieBet").text('');
}

//終了後の金額調整
function resultMoney(player, banker) {
    credit = credit - betBankerMoney - betPlayerMoney - betTieMoney;
    let money = 0;
    if (player > banker) {
        credit = credit + betPlayerMoney * 2;
        money = betPlayerMoney * 2 - betBankerMoney - betPlayerMoney - betTieMoney;
        $("#win").delay(7000).text(money);
    } else if (player < banker) {
        credit = credit + betBankerMoney * 2;
        money = betBankerMoney * 2 - betBankerMoney - betPlayerMoney - betTieMoney;
        $("#win").delay(7000).text(money);
    } else if (player == banker) {
        credit = credit + betTieMoney * 8;
        money = betTieMoney * 8 - betBankerMoney - betPlayerMoney - betTieMoney;
        $("#win").delay(7000).text(money);
    }
    $("#credit").delay(7000).text(credit);
}

//「reBetButton」を押したとき
$(function rebetButton() {
    $("#reBetButton").on("click", function () {
        //ポップアップを隠す
        $("#resultPop").hide(300);
        //カードを隠す
        $("#playerCardA").hide(300);
        $("#bankerCardA").hide(300);
        $("#playerCardB").hide(300);
        $("#bankerCardB").hide(300);
        $("#playerCardC").hide(300);
        $("#bankerCardC").hide(300);

        //再度シャッフル
        dealCards();
    });
});

// 「resultBanker」ボタンを押したとき
$(function resetButton() {
    $("#resetBetButton").on("click", function () {
        reset();
        betReset();
        //ポップアップを隠す
        $("#resultPop").hide(300);
        //カードを隠す
        $("#playerCardA").hide(300);
        $("#bankerCardA").hide(300);
        $("#playerCardB").hide(300);
        $("#bankerCardB").hide(300);
        $("#playerCardC").hide(300);
        $("#bankerCardC").hide(300);
    });
});

//ベット対象を入れる変数定数
let betSubject = "";
const betBanker = "banker";
const betPlayer = "player";
const betTie = "tie";

//BANKERボタンを押す関数
$(function selectBanker() {
    $("#bankerButton").on("click", function () {
        betSubject = betBanker;
        $("#bankerButton").css("background-color", "rgba(194, 238, 14, 0.75)");
        $("#playerButton").css("background-color", "rgba(198, 252, 242, 0.75)");
        $("#tieButton").css("background-color", "rgba(198, 252, 242, 0.75)");
    });
});

//PLAYERボタンを押す関数
$(function selectPlayer() {
    $("#playerButton").on("click", function () {
        betSubject = betPlayer;
        $("#bankerButton").css("background-color", "rgba(198, 252, 242, 0.75)");
        $("#playerButton").css("background-color", "rgba(194, 238, 14, 0.75)");
        $("#tieButton").css("background-color", "rgba(198, 252, 242, 0.75)");
    });
});

//TIEボタンを押す関数
$(function selectTie() {
    $("#tieButton").on("click", function () {
        betSubject = betTie;
        $("#bankerButton").css("background-color", "rgba(198, 252, 242, 0.75)");
        $("#playerButton").css("background-color", "rgba(198, 252, 242, 0.75)");
        $("#tieButton").css("background-color", "rgba(194, 238, 14, 0.75)");
    });
});

//各ベット金額
let betBankerMoney = 0;//バンカーへのベット金額
let betPlayerMoney = 0;//プレイヤーへのベット金額
let betTieMoney = 0;//タイへのベット金額

//$1をベット
$(function select$1() {
    $("#dollar1").on("click", function () {
        if (betSubject === betBanker) {
            betBankerMoney = betBankerMoney + 1;
            $("#bankerBet").text(`$ ${betBankerMoney}`);
        } else if (betSubject === betPlayer) {
            betPlayerMoney = betPlayerMoney + 1;
            $("#playerBet").text(`$ ${betPlayerMoney}`);
        } else if (betSubject === betTie) {
            betTieMoney = betTieMoney + 1;
            $("#tieBet").text(`$ ${betTieMoney}`);
        }
    });
});

//$5をベット
$(function select$1() {
    $("#dollar5").on("click", function () {
        if (betSubject === betBanker) {
            betBankerMoney = betBankerMoney + 5;
            $("#bankerBet").text(`$ ${betBankerMoney}`);
        } else if (betSubject === betPlayer) {
            betPlayerMoney = betPlayerMoney + 5;
            $("#playerBet").text(`$ ${betPlayerMoney}`);
        } else if (betSubject === betTie) {
            betTieMoney = betTieMoney + 5;
            $("#tieBet").text(`$ ${betTieMoney}`);
        }
    });
});

//$10をベット
$(function select$1() {
    $("#dollar10").on("click", function () {
        if (betSubject === betBanker) {
            betBankerMoney = betBankerMoney + 10;
            $("#bankerBet").text(`$ ${betBankerMoney}`);
        } else if (betSubject === betPlayer) {
            betPlayerMoney = betPlayerMoney + 10;
            $("#playerBet").text(`$ ${betPlayerMoney}`);
        } else if (betSubject === betTie) {
            betTieMoney = betTieMoney + 10;
            $("#tieBet").text(`$ ${betTieMoney}`);
        }
    });
});

//$50をベット
$(function select$1() {
    $("#dollar50").on("click", function () {
        if (betSubject === betBanker) {
            betBankerMoney = betBankerMoney + 50;
            $("#bankerBet").text(`$ ${betBankerMoney}`);
        } else if (betSubject === betPlayer) {
            betPlayerMoney = betPlayerMoney + 50;
            $("#playerBet").text(`$ ${betPlayerMoney}`);
        } else if (betSubject === betTie) {
            betTieMoney = betTieMoney + 50;
            $("#tieBet").text(`$ ${betTieMoney}`);
        }
    });
});

//$100をベット
$(function select$1() {
    $("#dollar100").on("click", function () {
        if (betSubject === betBanker) {
            betBankerMoney = betBankerMoney + 100;
            $("#bankerBet").text(`$ ${betBankerMoney}`);
        } else if (betSubject === betPlayer) {
            betPlayerMoney = betPlayerMoney + 100;
            $("#playerBet").text(`$ ${betPlayerMoney}`);
        } else if (betSubject === betTie) {
            betTieMoney = betTieMoney + 100;
            $("#tieBet").text(`$ ${betTieMoney}`);
        }
    });
});

//$500をベット
$(function select$1() {
    $("#dollar500").on("click", function () {
        if (betSubject === betBanker) {
            betBankerMoney = betBankerMoney + 500;
            $("#bankerBet").text(`$ ${betBankerMoney}`);
        } else if (betSubject === betPlayer) {
            betPlayerMoney = betPlayerMoney + 500;
            $("#playerBet").text(`$ ${betPlayerMoney}`);
        } else if (betSubject === betTie) {
            betTieMoney = betTieMoney + 500;
            $("#tieBet").text(`$ ${betTieMoney}`);
        }
    });
});

//$1Kをベット
$(function select$1() {
    $("#dollar1K").on("click", function () {
        if (betSubject === betBanker) {
            betBankerMoney = betBankerMoney + 1000;
            $("#bankerBet").text(`$ ${betBankerMoney}`);
        } else if (betSubject === betPlayer) {
            betPlayerMoney = betPlayerMoney + 1000;
            $("#playerBet").text(`$ ${betPlayerMoney}`);
        } else if (betSubject === betTie) {
            betTieMoney = betTieMoney + 1000;
            $("#tieBet").text(`$ ${betTieMoney}`);
        }
    });
});

//$5Kをベット
$(function select$1() {
    $("#dollar5K").on("click", function () {
        if (betSubject === betBanker) {
            betBankerMoney = betBankerMoney + 5000;
            $("#bankerBet").text(`$ ${betBankerMoney}`);
        } else if (betSubject === betPlayer) {
            betPlayerMoney = betPlayerMoney + 5000;
            $("#playerBet").text(`$ ${betPlayerMoney}`);
        } else if (betSubject === betTie) {
            betTieMoney = betTieMoney + 5000;
            $("#tieBet").text(`$ ${betTieMoney}`);
        }
    });
});

//$10Kをベット
$(function select$1() {
    $("#dollar10K").on("click", function () {
        if (betSubject === betBanker) {
            betBankerMoney = betBankerMoney + 10000;
            $("#bankerBet").text(`$ ${betBankerMoney}`);
        } else if (betSubject === betPlayer) {
            betPlayerMoney = betPlayerMoney + 10000;
            $("#playerBet").text(`$ ${betPlayerMoney}`);
        } else if (betSubject === betTie) {
            betTieMoney = betTieMoney + 10000;
            $("#tieBet").text(`$ ${betTieMoney}`);
        }
    });
});