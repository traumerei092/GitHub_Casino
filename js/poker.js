//各プレイヤーのデフォルト持ち金
let computer1Money = 2000;
let computer2Money = 2000;
let computer3Money = 2000;
let playerMoney = 2000;

//参加費
let bigBlindMoney = 100;
let smallBlindMoney = 50;

//ポット金額
let potMoney = 0;

//各プレイヤーの役割
const dealer = "Dealer";
const bigBlindRole = "Big Blind";
const smallBlindRole = "Small Blind"

//役職変数
let com1Role = "";
let com2Role = "";
let com3Role = "";
let plyRole = "";

//アクション定義
const fold = "Fold";
const call = "Call";
const raise = "Raise";

//アクション変数
let com1Action = "";
let com2Action = "";
let com3Action = "";
let plyAction = "";

//ゲームステータス
let gameStatus = "";
const preflop = "Preflop";
const flop = "Flop";
const turn = "Turn";
const river = "River";

//ゲームメッセージ
let gameMessage = "";
const noContest = "No Contest";

//ゲーム数
let gameAnnounce = "";
const game1 = "GAME 1";
const game2 = "GAME 2";
const game3 = "GAME 3";

//最低ベット金額
let minimumAmount = 0;

//レイズ額
let raiseMoney = 100;

//トランプデータ
const mark = [
    '♠️',
    '♣️',
    '♦️',
    '♥️'
];

const num = [
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

//トランプ入れる箱
let tramp = [];

// 各マークごとに2からAまで作成する
for (let i = 0; i < mark.length; i++) {
    for (let j = 0; j < num.length; j++) {
        let couple = { num: num[j], mark: mark[i] };
        tramp.push(couple);
    }
}

//「PlayStart」ボタン時の動作
$(function () {
    $("#playStart").on("click", function () {
        $("#beforePoker").fadeOut(300, function () {
            $("#computer1CardA").hide();
            $("#computer1CardB").hide();
            $("#computer2CardA").hide();
            $("#computer2CardB").hide();
            $("#computer3CardA").hide();
            $("#computer3CardB").hide();
            $("#communityCardA").hide();
            $("#communityCardB").hide();
            $("#communityCardC").hide();
            $("#communityCardD").hide();
            $("#communityCardE").hide();
            $("#playerCardA").hide();
            $("#playerCardB").hide();
            $("#computer1Action").hide();
            $("#computer2Action").hide();
            $("#computer3Action").hide();
            $("#playerAction").hide();
            $("#afterPoker").fadeIn(300, function () {
                $("#computer1Money").text("Pocket：¥ " + computer1Money);
                $("#computer2Money").text("Pocket：¥ " + computer2Money);
                $("#computer3Money").text("Pocket：¥ " + computer3Money);
                $("#playerMoney").text("Pocket：¥ " + playerMoney);
                gameAnnounce = game1;
                $("#gameNumber").text(gameAnnounce, function () {
                    $("#roulette").fadeIn(300);
                });
            });
        });
    });
});

//ディーラールーレット~プリフロップ
$(function () {
    $("#rouletteBtn").on("click", function () {
        $("#roulette").fadeOut(300, function () {
            $("#rouletteBtn").fadeOut(300);

            const rundomNum = Math.random() * 4;
            const result = Math.floor(rundomNum);

            //プレイヤーがディーラー
            if (result === 0) {
                plyRole = dealer;
                com1Role = smallBlindRole;
                com2Role = bigBlindRole;
                $("#playerRole").text(plyRole).css("color","pink");
                $("#computer1Role").text(com1Role).css("color","yellow");
                $("#computer2Role").text(com2Role).css("color","deepskyblue");
                computer1Money = computer1Money - smallBlindMoney;
                computer2Money = computer2Money - bigBlindMoney;
                $("#computer1Money").text("Pocket：¥ " + computer1Money);
                $("#computer2Money").text("Pocket：¥ " + computer2Money);
                $("#computer1Action").fadeIn(100, function () {
                    $("#computer1ActionContent").text("Entry：¥ " + smallBlindMoney);
                });
                $("#computer2Action").fadeIn(100, function () {
                    $("#computer2ActionContent").text("Entry：¥ " + bigBlindMoney);
                });

            //コンピューター①がディーラー
            } else if (result === 1) {
                com1Role = dealer;
                com2Role = smallBlindRole;
                com3Role = bigBlindRole;
                $("#computer1Role").text(com1Role).css("color","pink");
                $("#computer2Role").text(com2Role).css("color","yellow");
                $("#computer3Role").text(com3Role).css("color","deepskyblue");
                computer2Money = computer2Money - smallBlindMoney;
                computer3Money = computer3Money - bigBlindMoney;
                $("#computer2Money").text("Pocket：¥ " + computer2Money);
                $("#computer3Money").text("Pocket：¥ " + computer3Money);
                $("#computer2Action").fadeIn(100, function () {
                    $("#computer2ActionContent").text("Entry：¥ " + smallBlindMoney);
                });
                $("#computer3Action").fadeIn(100, function () {
                    $("#computer3ActionContent").text("Entry：¥ " + bigBlindMoney);
                });

            //コンピューター②がディーラー
            } else if (result === 2) {
                com2Role = dealer;
                com3Role = smallBlindRole;
                plyRole = bigBlindRole;
                $("#computer2Role").text(com2Role).css("color","pink");
                $("#computer3Role").text(com3Role).css("color","yellow");
                $("#playerRole").text(plyRole).css("color","deepskyblue");
                computer3Money = computer3Money - smallBlindMoney;
                playerMoney = playerMoney - bigBlindMoney;
                $("#computer3Money").text("Pocket：¥ " + computer3Money);
                $("#playerMoney").text("Pocket：¥ " + playerMoney);
                $("#computer3Action").fadeIn(100, function () {
                    $("#computer3ActionContent").text("Entry：¥ " + smallBlindMoney);
                });
                $("#playerAction").fadeIn(100, function () {
                    $("#playerActionContent").text("Entry：¥ " + bigBlindMoney);
                });

            //コンピューター③がディーラー
            } else {
                com3Role = dealer;
                plyRole = smallBlindRole;
                com1Role = bigBlindRole;
                $("#computer3Role").text(dealer).css("color","pink");
                $("#playerRole").text(smallBlindRole).css("color","yellow");
                $("#computer1Role").text(bigBlindRole).css("color","deepskyblue");
                playerMoney = playerMoney - smallBlindMoney;
                computer1Money = computer1Money - bigBlindMoney;
                $("#playerMoney").text("Pocket：¥ " + playerMoney);
                $("#computer1Money").text("Pocket：¥ " + computer1Money);
                $("#playerAction").fadeIn(100, function () {
                    $("#playerActionContent").text("Entry：¥ " + smallBlindMoney);
                });
                $("#computer1Action").fadeIn(100, function () {
                    $("#computer1ActionContent").text("Entry：¥ " + bigBlindMoney);
                });

            }

            //ポット金額の加算
            potMoney = potMoney + smallBlindMoney + bigBlindMoney;
            $("#potMoney").text("¥ " + potMoney);

            //プリフロップの表示
            gameStatus = preflop;
            $("#gameStatus").text(gameStatus);

            //最低ベット金額の表示
            minimumAmount = bigBlindMoney;
            $("#minimumAmount").text("¥ " + minimumAmount);

            //カードの表示
            $("#computer1CardABack").fadeIn(1000);
            $("#computer1CardBBack").fadeIn(1000);
            $("#computer2CardABack").fadeIn(1000);
            $("#computer2CardBBack").fadeIn(1000);
            $("#computer3CardABack").fadeIn(1000);
            $("#computer3CardBBack").fadeIn(1000);
            $("#playerCardA").fadeIn(1000);
            $("#playerCardB").fadeIn(1000);

            //トランプをシャッフル
            for (let i = tramp.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * i);
                let temp = tramp[i];
                tramp[i] = tramp[j];
                tramp[j] = temp;
            }

            //プレイヤーに配布
            $("#computer1CardA").text(tramp[0].mark + tramp[0].num.label);
            $("#computer1CardB").text(tramp[1].mark + tramp[1].num.label);
            $("#computer2CardA").text(tramp[2].mark + tramp[2].num.label);
            $("#computer2CardB").text(tramp[3].mark + tramp[3].num.label);
            $("#computer3CardA").text(tramp[4].mark + tramp[4].num.label);
            $("#computer3CardB").text(tramp[5].mark + tramp[5].num.label);
            $("#playerCardA").text(tramp[6].mark + tramp[6].num.label);
            $("#playerCardB").text(tramp[7].mark + tramp[7].num.label);

            //プリフロップ開始
            const action1 = Math.floor(Math.random() * 100);
            const action2 = Math.floor(Math.random() * 100);
            const action3 = Math.floor(Math.random() * 100);

            //プレイヤーがディーラー
            if (result === 0) {
                com3fn(action1);
                plyButton();

            //コンピューター①がディーラー
            } else if (result === 1) {
                plyButton();

            //コンピューター②がディーラー
            } else if (result === 2) {
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
                if (com1Action == fold && com2Action == fold && com3Action == fold) {
                    //ノーコンテストからGAME2に
                    game1_2();
                } else {
                    $("#playerActionContent").delay(7000).fadeOut(300, function () {
                        plyButton();
                    });
                }

            //コンピューター③がディーラー
            } else {
                com2fn(action3);
                com3fn(action1);
                $("#playerActionContent").delay(7000).fadeOut(300, function () {
                    plyButton();
                });
            }
        });
    });
});

//コールした時のアクション
$(function () {
    $("#playerCall").on("click", function () {
        //プレイヤーがラスト
        if (com2Role == dealer) {
            $("#playerFold").fadeOut(500);
            $("#playerCall").fadeOut(500);
            $("#playerRaise").fadeOut(500);
            $("#playerActionContent").text(`Call：¥ ${minimumAmount}`);
            $("#playerAction").fadeOut(500);
            $("#playerActionContent").fadeOut(500);
            playerMoney = playerMoney - minimumAmount;
            $("#playerMoney").delay(600).text(`Pocket：¥ ${playerMoney}`);
            potMoney = potMoney + minimumAmount;
            $("#potMoney").delay(600).text(potMoney);
            if (gameStatus == preflop) {
                //プリフロップの時
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                gameStatus = flop;
                $("#gameStatus").text(gameStatus);
                $("#communityCardA").delay(1000).fadeIn(1000);
                $("#communityCardB").delay(1000).fadeIn(1000);
                $("#communityCardC").delay(1000).fadeIn(1000);
                $("#communityCardA").text(tramp[8].mark + tramp[8].num.label);
                $("#communityCardB").text(tramp[9].mark + tramp[9].num.label);
                $("#communityCardC").text(tramp[10].mark + tramp[10].num.label);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
                plyButton();
            } else if (gameStatus == flop) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                gameStatus = turn;
                $("#gameStatus").text(gameStatus);
                $("#communityCardD").delay(1000).fadeIn(1000);
                $("#communityCardD").text(tramp[11].mark + tramp[11].num.label);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
                plyButton();
            } else if (gameStatus == turn) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                gameStatus = river;
                $("#gameStatus").text(gameStatus);
                $("#communityCardE").delay(1000).fadeIn(1000);
                $("#communityCardE").text(tramp[12].mark + tramp[12].num.label);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
                plyButton();
            } else if (gameStatus == river) {
                showDown();
            }
        } else if (com3Role == dealer) {
            $("#playerFold").fadeOut(500);
            $("#playerCall").fadeOut(500);
            $("#playerRaise").fadeOut(500);
            $("#playerActionContent").text(`Call：¥ ${minimumAmount}`);
            $("#playerAction").fadeOut(500);
            $("#playerActionContent").fadeOut(500);
            playerMoney = playerMoney - minimumAmount;
            $("#playerMoney").delay(600).text(`Pocket：¥ ${playerMoney}`);
            potMoney = potMoney + minimumAmount;
            $("#potMoney").delay(600).text(potMoney);
            if (gameStatus == preflop) {
                //プリフロップの時
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                gameStatus = flop;
                $("#gameStatus").text(gameStatus);
                $("#communityCardA").delay(1000).fadeIn(1000);
                $("#communityCardB").delay(1000).fadeIn(1000);
                $("#communityCardC").delay(1000).fadeIn(1000);
                $("#communityCardA").text(tramp[8].mark + tramp[8].num.label);
                $("#communityCardB").text(tramp[9].mark + tramp[9].num.label);
                $("#communityCardC").text(tramp[10].mark + tramp[10].num.label);
                com2fn(action3);
                com3fn(action1);
                plyButton();
            } else if (gameStatus == flop) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                gameStatus = turn;
                $("#gameStatus").text(gameStatus);
                $("#communityCardD").delay(1000).fadeIn(1000);
                $("#communityCardD").text(tramp[11].mark + tramp[11].num.label);
                com2fn(action3);
                com3fn(action1);
                plyButton();
            } else if (gameStatus == turn) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                gameStatus = river;
                $("#gameStatus").text(gameStatus);
                $("#communityCardE").delay(1000).fadeIn(1000);
                $("#communityCardE").text(tramp[12].mark + tramp[12].num.label);
                com2fn(action3);
                com3fn(action1);
                plyButton();
            } else if (gameStatus == river) {
                const action2 = Math.floor(Math.random() * 100);
                com1fn(action2);
                showDown();
            }
        } else if (plyRole == dealer) {
            $("#playerFold").fadeOut(500);
            $("#playerCall").fadeOut(500);
            $("#playerRaise").fadeOut(500);
            $("#playerActionContent").text(`Call：¥ ${minimumAmount}`);
            $("#playerAction").fadeOut(500);
            $("#playerActionContent").fadeOut(500);
            playerMoney = playerMoney - minimumAmount;
            $("#playerMoney").delay(600).text(`Pocket：¥ ${playerMoney}`);
            potMoney = potMoney + minimumAmount;
            $("#potMoney").delay(600).text(potMoney);
            if (gameStatus == preflop) {
                //プリフロップの時
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                gameStatus = flop;
                $("#gameStatus").text(gameStatus);
                $("#communityCardA").delay(1000).fadeIn(1000);
                $("#communityCardB").delay(1000).fadeIn(1000);
                $("#communityCardC").delay(1000).fadeIn(1000);
                $("#communityCardA").text(tramp[8].mark + tramp[8].num.label);
                $("#communityCardB").text(tramp[9].mark + tramp[9].num.label);
                $("#communityCardC").text(tramp[10].mark + tramp[10].num.label);
                com3fn(action1);
                plyButton();
            } else if (gameStatus == flop) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                gameStatus = turn;
                $("#gameStatus").text(gameStatus);
                $("#communityCardD").delay(1000).fadeIn(1000);
                $("#communityCardD").text(tramp[11].mark + tramp[11].num.label);
                com3fn(action1);
                plyButton();
            } else if (gameStatus == turn) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                gameStatus = river;
                $("#gameStatus").text(gameStatus);
                $("#communityCardE").delay(1000).fadeIn(1000);
                $("#communityCardE").text(tramp[12].mark + tramp[12].num.label);
                com3fn(action1);
                plyButton();
            } else if (gameStatus == river) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                showDown();
            }
        } else if (com1Role == dealer) {
            $("#playerFold").fadeOut(500);
            $("#playerCall").fadeOut(500);
            $("#playerRaise").fadeOut(500);
            $("#playerActionContent").text(`Call：¥ ${minimumAmount}`);
            $("#playerAction").fadeOut(500);
            $("#playerActionContent").fadeOut(500);
            playerMoney = playerMoney - minimumAmount;
            $("#playerMoney").delay(600).text(`Pocket：¥ ${playerMoney}`);
            potMoney = potMoney + minimumAmount;
            $("#potMoney").delay(600).text(potMoney);
            if (gameStatus == preflop) {
                //プリフロップの時
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
                gameStatus = flop;
                $("#gameStatus").text(gameStatus);
                $("#communityCardA").delay(1000).fadeIn(1000);
                $("#communityCardB").delay(1000).fadeIn(1000);
                $("#communityCardC").delay(1000).fadeIn(1000);
                $("#communityCardA").text(tramp[8].mark + tramp[8].num.label);
                $("#communityCardB").text(tramp[9].mark + tramp[9].num.label);
                $("#communityCardC").text(tramp[10].mark + tramp[10].num.label);
                plyButton();
            } else if (gameStatus == flop) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
                gameStatus = turn;
                $("#gameStatus").text(gameStatus);
                $("#communityCardD").delay(1000).fadeIn(1000);
                $("#communityCardD").text(tramp[11].mark + tramp[11].num.label);
                plyButton();
            } else if (gameStatus == turn) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
                gameStatus = river;
                $("#gameStatus").text(gameStatus);
                $("#communityCardE").delay(1000).fadeIn(1000);
                $("#communityCardE").text(tramp[12].mark + tramp[12].num.label);
                plyButton();
            } else if (gameStatus == river) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
                showDown();
            }
        }
    });
});

//レイズした際のアクション
$(function () {
    $("#playerRaise").on("click", function () {
        //プレイヤーがラスト
        if (com2Role == dealer) {
            $("#playerFold").fadeOut(500);
            $("#playerCall").fadeOut(500);
            $("#playerRaise").fadeOut(500);
            $("#playerActionContent").text(`Raise：¥ ${minimumAmount}`);
            $("#playerAction").fadeOut(500);
            $("#playerActionContent").fadeOut(500);
            minimumAmount = minimumAmount + raiseMoney;
            ("#minimumAmount").delay(600).text(`¥ ${minimumAmount}`);
            playerMoney = playerMoney - minimumAmount;
            $("#playerMoney").delay(600).text(`Pocket：¥ ${playerMoney}`);
            potMoney = potMoney + minimumAmount;
            $("#potMoney").delay(600).text(potMoney);
            if (gameStatus == preflop) {
                //プリフロップの時
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                gameStatus = flop;
                $("#gameStatus").text(gameStatus);
                $("#communityCardA").delay(1000).fadeIn(1000);
                $("#communityCardB").delay(1000).fadeIn(1000);
                $("#communityCardC").delay(1000).fadeIn(1000);
                $("#communityCardA").text(tramp[8].mark + tramp[8].num.label);
                $("#communityCardB").text(tramp[9].mark + tramp[9].num.label);
                $("#communityCardC").text(tramp[10].mark + tramp[10].num.label);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
                plyButton();
            } else if (gameStatus == flop) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                gameStatus = turn;
                $("#gameStatus").text(gameStatus);
                $("#communityCardD").delay(1000).fadeIn(1000);
                $("#communityCardD").text(tramp[11].mark + tramp[11].num.label);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
                plyButton();
            } else if (gameStatus == turn) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                gameStatus = river;
                $("#gameStatus").text(gameStatus);
                $("#communityCardE").delay(1000).fadeIn(1000);
                $("#communityCardE").text(tramp[12].mark + tramp[12].num.label);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
                plyButton();
            } else if (gameStatus == river) {
                showDown();
            }
        } else if (com3Role == dealer) {
            $("#playerFold").fadeOut(500);
            $("#playerCall").fadeOut(500);
            $("#playerRaise").fadeOut(500);
            $("#playerActionContent").text(`Raise：¥ ${minimumAmount}`);
            $("#playerAction").fadeOut(500);
            $("#playerActionContent").fadeOut(500);
            minimumAmount = minimumAmount + raiseMoney;
            ("#minimumAmount").delay(600).text(`¥ ${minimumAmount}`);
            playerMoney = playerMoney - minimumAmount;
            $("#playerMoney").delay(600).text(`Pocket：¥ ${playerMoney}`);
            potMoney = potMoney + minimumAmount;
            $("#potMoney").delay(600).text(potMoney);
            if (gameStatus == preflop) {
                //プリフロップの時
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                gameStatus = flop;
                $("#gameStatus").text(gameStatus);
                $("#communityCardA").delay(1000).fadeIn(1000);
                $("#communityCardB").delay(1000).fadeIn(1000);
                $("#communityCardC").delay(1000).fadeIn(1000);
                $("#communityCardA").text(tramp[8].mark + tramp[8].num.label);
                $("#communityCardB").text(tramp[9].mark + tramp[9].num.label);
                $("#communityCardC").text(tramp[10].mark + tramp[10].num.label);
                com2fn(action3);
                com3fn(action1);
                plyButton();
            } else if (gameStatus == flop) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                gameStatus = turn;
                $("#gameStatus").text(gameStatus);
                $("#communityCardD").delay(1000).fadeIn(1000);
                $("#communityCardD").text(tramp[11].mark + tramp[11].num.label);
                com2fn(action3);
                com3fn(action1);
                plyButton();
            } else if (gameStatus == turn) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                gameStatus = river;
                $("#gameStatus").text(gameStatus);
                $("#communityCardE").delay(1000).fadeIn(1000);
                $("#communityCardE").text(tramp[12].mark + tramp[12].num.label);
                com2fn(action3);
                com3fn(action1);
                plyButton();
            } else if (gameStatus == river) {
                const action2 = Math.floor(Math.random() * 100);
                com1fn(action2);
                showDown();
            }
        } else if (plyRole == dealer) {
            $("#playerFold").fadeOut(500);
            $("#playerCall").fadeOut(500);
            $("#playerRaise").fadeOut(500);
            $("#playerActionContent").text(`Raise：¥ ${minimumAmount}`);
            $("#playerAction").fadeOut(500);
            $("#playerActionContent").fadeOut(500);
            minimumAmount = minimumAmount + raiseMoney;
            ("#minimumAmount").delay(600).text(`¥ ${minimumAmount}`);
            playerMoney = playerMoney - minimumAmount;
            $("#playerMoney").delay(600).text(`Pocket：¥ ${playerMoney}`);
            potMoney = potMoney + minimumAmount;
            $("#potMoney").delay(600).text(potMoney);
            if (gameStatus == preflop) {
                //プリフロップの時
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                gameStatus = flop;
                $("#gameStatus").text(gameStatus);
                $("#communityCardA").delay(1000).fadeIn(1000);
                $("#communityCardB").delay(1000).fadeIn(1000);
                $("#communityCardC").delay(1000).fadeIn(1000);
                $("#communityCardA").text(tramp[8].mark + tramp[8].num.label);
                $("#communityCardB").text(tramp[9].mark + tramp[9].num.label);
                $("#communityCardC").text(tramp[10].mark + tramp[10].num.label);
                com3fn(action1);
                plyButton();
            } else if (gameStatus == flop) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                gameStatus = turn;
                $("#gameStatus").text(gameStatus);
                $("#communityCardD").delay(1000).fadeIn(1000);
                $("#communityCardD").text(tramp[11].mark + tramp[11].num.label);
                com3fn(action1);
                plyButton();
            } else if (gameStatus == turn) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                gameStatus = river;
                $("#gameStatus").text(gameStatus);
                $("#communityCardE").delay(1000).fadeIn(1000);
                $("#communityCardE").text(tramp[12].mark + tramp[12].num.label);
                com3fn(action1);
                plyButton();
            } else if (gameStatus == river) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                showDown();
            }
        } else if (com1Role == dealer) {
            $("#playerFold").fadeOut(500);
            $("#playerCall").fadeOut(500);
            $("#playerRaise").fadeOut(500);
            $("#playerActionContent").text(`Raise：¥ ${minimumAmount}`);
            $("#playerAction").fadeOut(500);
            $("#playerActionContent").fadeOut(500);
            minimumAmount = minimumAmount + raiseMoney;
            ("#minimumAmount").delay(600).text(`¥ ${minimumAmount}`);
            playerMoney = playerMoney - minimumAmount;
            $("#playerMoney").delay(600).text(`Pocket：¥ ${playerMoney}`);
            potMoney = potMoney + minimumAmount;
            $("#potMoney").delay(600).text(potMoney);
            if (gameStatus == preflop) {
                //プリフロップの時
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
                gameStatus = flop;
                $("#gameStatus").text(gameStatus);
                $("#communityCardA").delay(1000).fadeIn(1000);
                $("#communityCardB").delay(1000).fadeIn(1000);
                $("#communityCardC").delay(1000).fadeIn(1000);
                $("#communityCardA").text(tramp[8].mark + tramp[8].num.label);
                $("#communityCardB").text(tramp[9].mark + tramp[9].num.label);
                $("#communityCardC").text(tramp[10].mark + tramp[10].num.label);
                plyButton();
            } else if (gameStatus == flop) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
                gameStatus = turn;
                $("#gameStatus").text(gameStatus);
                $("#communityCardD").delay(1000).fadeIn(1000);
                $("#communityCardD").text(tramp[11].mark + tramp[11].num.label);
                plyButton();
            } else if (gameStatus == turn) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
                gameStatus = river;
                $("#gameStatus").text(gameStatus);
                $("#communityCardE").delay(1000).fadeIn(1000);
                $("#communityCardE").text(tramp[12].mark + tramp[12].num.label);
                plyButton();
            } else if (gameStatus == river) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
                showDown();
            }
        }
    });
});

//フォールドした際のアクション
$(function () {
    $("#playerFold").on("click", function () {
        //プレイヤーがラスト
        if (com2Role == dealer) {
            $("#playerFold").fadeOut(500);
            $("#playerCall").fadeOut(500);
            $("#playerRaise").fadeOut(500);
            $("#playerActionContent").text(`Call：¥ ${minimumAmount}`);
            $("#playerAction").fadeOut(500);
            $("#playerActionContent").fadeOut(500);
            $("#playerCardA").fadeOut(500);
            $("#playerCardB").fadeOut(500);
            if (gameStatus == preflop) {
                //プリフロップの時
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                gameStatus = flop;
                $("#gameStatus").text(gameStatus);
                $("#communityCardA").delay(1000).fadeIn(1000);
                $("#communityCardB").delay(1000).fadeIn(1000);
                $("#communityCardC").delay(1000).fadeIn(1000);
                $("#communityCardA").text(tramp[8].mark + tramp[8].num.label);
                $("#communityCardB").text(tramp[9].mark + tramp[9].num.label);
                $("#communityCardC").text(tramp[10].mark + tramp[10].num.label);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
            } else if (gameStatus == flop) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                gameStatus = turn;
                $("#gameStatus").text(gameStatus);
                $("#communityCardD").delay(1000).fadeIn(1000);
                $("#communityCardD").text(tramp[11].mark + tramp[11].num.label);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
            } else if (gameStatus == turn) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                gameStatus = river;
                $("#gameStatus").text(gameStatus);
                $("#communityCardE").delay(1000).fadeIn(1000);
                $("#communityCardE").text(tramp[12].mark + tramp[12].num.label);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
            } else if (gameStatus == river) {
                showDown();
            }
        } else if (com3Role == dealer) {
            $("#playerFold").fadeOut(500);
            $("#playerCall").fadeOut(500);
            $("#playerRaise").fadeOut(500);
            $("#playerActionContent").text(`Call：¥ ${minimumAmount}`);
            $("#playerAction").fadeOut(500);
            $("#playerActionContent").fadeOut(500);
            $("#playerCardA").fadeOut(500);
            $("#playerCardB").fadeOut(500);
            if (gameStatus == preflop) {
                //プリフロップの時
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                gameStatus = flop;
                $("#gameStatus").text(gameStatus);
                $("#communityCardA").delay(1000).fadeIn(1000);
                $("#communityCardB").delay(1000).fadeIn(1000);
                $("#communityCardC").delay(1000).fadeIn(1000);
                $("#communityCardA").text(tramp[8].mark + tramp[8].num.label);
                $("#communityCardB").text(tramp[9].mark + tramp[9].num.label);
                $("#communityCardC").text(tramp[10].mark + tramp[10].num.label);
                com2fn(action3);
                com3fn(action1);
            } else if (gameStatus == flop) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                gameStatus = turn;
                $("#gameStatus").text(gameStatus);
                $("#communityCardD").delay(1000).fadeIn(1000);
                $("#communityCardD").text(tramp[11].mark + tramp[11].num.label);
                com2fn(action3);
                com3fn(action1);
            } else if (gameStatus == turn) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                gameStatus = river;
                $("#gameStatus").text(gameStatus);
                $("#communityCardE").delay(1000).fadeIn(1000);
                $("#communityCardE").text(tramp[12].mark + tramp[12].num.label);
                com2fn(action3);
                com3fn(action1);
            } else if (gameStatus == river) {
                const action2 = Math.floor(Math.random() * 100);
                com1fn(action2);
                showDown();
            }
        } else if (plyRole == dealer) {
            $("#playerFold").fadeOut(500);
            $("#playerCall").fadeOut(500);
            $("#playerRaise").fadeOut(500);
            $("#playerActionContent").text(`Call：¥ ${minimumAmount}`);
            $("#playerAction").fadeOut(500);
            $("#playerActionContent").fadeOut(500);
            $("#playerCardA").fadeOut(500);
            $("#playerCardB").fadeOut(500);
            if (gameStatus == preflop) {
                //プリフロップの時
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                gameStatus = flop;
                $("#gameStatus").text(gameStatus);
                $("#communityCardA").delay(1000).fadeIn(1000);
                $("#communityCardB").delay(1000).fadeIn(1000);
                $("#communityCardC").delay(1000).fadeIn(1000);
                $("#communityCardA").text(tramp[8].mark + tramp[8].num.label);
                $("#communityCardB").text(tramp[9].mark + tramp[9].num.label);
                $("#communityCardC").text(tramp[10].mark + tramp[10].num.label);
                com3fn(action1);
            } else if (gameStatus == flop) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                gameStatus = turn;
                $("#gameStatus").text(gameStatus);
                $("#communityCardD").delay(1000).fadeIn(1000);
                $("#communityCardD").text(tramp[11].mark + tramp[11].num.label);
                com3fn(action1);
            } else if (gameStatus == turn) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                gameStatus = river;
                $("#gameStatus").text(gameStatus);
                $("#communityCardE").delay(1000).fadeIn(1000);
                $("#communityCardE").text(tramp[12].mark + tramp[12].num.label);
                com3fn(action1);
            } else if (gameStatus == river) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                showDown();
            }
        } else if (com1Role == dealer) {
            $("#playerFold").fadeOut(500);
            $("#playerCall").fadeOut(500);
            $("#playerRaise").fadeOut(500);
            $("#playerActionContent").text(`Call：¥ ${minimumAmount}`);
            $("#playerAction").fadeOut(500);
            $("#playerActionContent").fadeOut(500);
            $("#playerCardA").fadeOut(500);
            $("#playerCardB").fadeOut(500);
            if (gameStatus == preflop) {
                //プリフロップの時
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
                gameStatus = flop;
                $("#gameStatus").text(gameStatus);
                $("#communityCardA").delay(1000).fadeIn(1000);
                $("#communityCardB").delay(1000).fadeIn(1000);
                $("#communityCardC").delay(1000).fadeIn(1000);
                $("#communityCardA").text(tramp[8].mark + tramp[8].num.label);
                $("#communityCardB").text(tramp[9].mark + tramp[9].num.label);
                $("#communityCardC").text(tramp[10].mark + tramp[10].num.label);
            } else if (gameStatus == flop) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
                gameStatus = turn;
                $("#gameStatus").text(gameStatus);
                $("#communityCardD").delay(1000).fadeIn(1000);
                $("#communityCardD").text(tramp[11].mark + tramp[11].num.label);
            } else if (gameStatus == turn) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
                gameStatus = river;
                $("#gameStatus").text(gameStatus);
                $("#communityCardE").delay(1000).fadeIn(1000);
                $("#communityCardE").text(tramp[12].mark + tramp[12].num.label);
            } else if (gameStatus == river) {
                const action2 = Math.floor(Math.random() * 100);
                const action3 = Math.floor(Math.random() * 100);
                const action1 = Math.floor(Math.random() * 100);
                com1fn(action2);
                com2fn(action3);
                com3fn(action1);
                showDown();
            }
        }
    });
});

//com1のアクション
function com1fn(action) {
    if (com1Action != fold) {
        if (action <= 10) {
            com1Action = fold;
            $("#computer1Action").delay(1000).fadeIn(500, function () {
                $("#computer1ActionContent").text(com1Action);
            });
            $("#computer1Action").delay(1500).fadeOut(500, function () {
                $("#computer1CardABack").fadeOut(500);
                $("#computer1CardBBack").fadeOut(500);
            });
        } else if (11 < action <= 70) {
            com1Action = call;
            $("#computer1Action").delay(1000).fadeIn(500, function () {
                $("#computer1ActionContent").text(`${com1Action}：¥ ${minimumAmount}`);
            });
            $("#computer1Action").delay(1500).fadeOut(500, function () {
                computer1Money = computer1Money - minimumAmount;
                $("#computer1Money").text("Pocket：¥ " + computer1Money);
                potMoney = potMoney + minimumAmount;
                $("#potMoney").text("¥ " + potMoney);
            });
        } else {
            com1Action = raise;
            $("#computer1Action").delay(1000).fadeIn(500, function () {
                minimumAmount = minimumAmount + raiseMoney;
                $("#minimumAmount").text(`¥ ${minimumAmount}`);
                $("#computer1ActionContent").text(`${com1Action}：¥ ${minimumAmount}`);
            });
            $("#computer1Action").delay(1500).fadeOut(500, function () {
                computer1Money = computer1Money - minimumAmount;
                $("#computer1Money").text(`Pocket：¥ ${computer1Money}`);
                potMoney = potMoney + minimumAmount;
                $("#potMoney").text(`¥ ${potMoney}`);
            });
        }
    }
}

//com2のアクション
function com2fn(action) {
    if (com2Action != fold) {
        if (action <= 10) {
            com2Action = fold;
            $("#computer2Action").delay(3000).fadeIn(500, function () {
                $("#computer2ActionContent").text(com2Action);
            });
            $("#computer2Action").delay(3500).fadeOut(500, function () {
                $("#computer2CardABack").fadeOut(500);
                $("#computer2CardBBack").fadeOut(500);
            });
        } else if (11 < action <= 70) {
            com2Action = call;
            $("#computer2Action").delay(3000).fadeIn(500, function () {
                $("#computer2ActionContent").text(`${com2Action}：¥ ${minimumAmount}`);
            });
            $("#computer2Action").delay(3500).fadeOut(500, function () {
                computer2Money = computer2Money - minimumAmount;
                $("#computer2Money").text("Pocket：¥ " + computer2Money);
                potMoney = potMoney + minimumAmount;
                $("#potMoney").text("¥ " + potMoney);
            });
        } else {
            com1Action = raise;
            $("#computer2Action").delay(3000).fadeIn(500, function () {
                minimumAmount = minimumAmount + raiseMoney;
                $("#minimumAmount").text(`¥ ${minimumAmount}`);
                $("#computer2ActionContent").text(`${com2Action}：¥ ${minimumAmount}`);
            });
            $("#computer2Action").delay(3500).fadeOut(500, function () {
                computer2Money = computer2Money - minimumAmount;
                $("#computer2Money").text(`Pocket：¥ ${computer2Money}`);
                potMoney = potMoney + minimumAmount;
                $("#potMoney").text(`¥ ${potMoney}`);
            });
        }
    }
}

function com3fn(action) {
    if (com3Action != fold) {
        if (action <= 10) {
            com3Action = fold;
            $("#computer3Action").delay(5000).fadeIn(500, function () {
                $("#computer3ActionContent").text(com3Action);
            });
            $("#computer3Action").delay(5500).fadeOut(500, function () {
                $("#computer3CardABack").fadeOut(500);
                $("#computer3CardBBack").fadeOut(500);
            });
        } else if (11 < action <= 70) {
            com3Action = call;
            $("#computer3Action").delay(5000).fadeIn(500, function () {
                $("#computer3ActionContent").text(`${com3Action}：¥ ${minimumAmount}`);
            });
            $("#computer3Action").delay(5500).fadeOut(500, function () {
                computer3Money = computer3Money - minimumAmount;
                $("#computer3Money").text("Pocket：¥ " + computer3Money);
                potMoney = potMoney + minimumAmount;
                $("#potMoney").text("¥ " + potMoney);
            });
        } else {
            com3Action = raise;
            $("#computer3Action").delay(5000).fadeIn(500, function () {
                minimumAmount = minimumAmount + raiseMoney;
                $("#minimumAmount").text(`¥ ${minimumAmount}`);
                $("#computer3ActionContent").text(`${com3Action}：¥ ${minimumAmount}`);
            });
            $("#computer3Action").delay(5500).fadeOut(500, function () {
                computer3Money = computer3Money - minimumAmount;
                $("#computer3Money").text(`Pocket：¥ ${computer3Money}`);
                potMoney = potMoney + minimumAmount;
                $("#potMoney").text(`¥ ${potMoney}`);
            });
        }
    }
}

//プレイヤーボタン表示
function plyButton(plyActionContent) {
    $("#playerAction").delay(7000).fadeIn(500);
    $("#playerFold").fadeIn(500);
    $("#playerCall").fadeIn(500);
    $("#playerRaise").fadeIn(500);
}

//game1→game2
function game1_2() {
    $("#afterPoker").fadeIn(300);
    gameMessage = noContest;
    $("#gameMessage").text(gameMessage);
    $("#afterPoker").delay(3000).fadeOutut(300);
    $("#gameMessage").delay(3000).fadeOut(gameMessage);
    playerMoney = playerMoney + potMoney;
    $("#playerMoney").delay(4000).text(playerMoney);
    $("#afterPoker").delay(6000).fadeIn(300);
    gameAnnounce = game2;
    $("#gameAnnounce").delay(6000).text(game2);
}

//game2→game3
function game2_3() {
    $("#afterPoker").fadeIn(300);
    gameMessage = noContest;
    $("#gameMessage").text(gameMessage);
    $("#afterPoker").delay(3000).fadeOutut(300);
    $("#gameMessage").delay(3000).fadeOut(gameMessage);
    playerMoney = playerMoney + potMoney;
    $("#playerMoney").delay(4000).text(playerMoney);
    $("#afterPoker").delay(6000).fadeIn(300);
    gameAnnounce = game3;
    $("#gameAnnounce").delay(6000).text(game3);
}

function showDown() {
    $("#roulette").delay(1000).fadeIn(300);
    $("#gameMessage").text("役判定まで実装できず😇");
    $("#roulette").delay(3000).fadeOut(300);
    $("#gameMessage").delay(3000).fadeOut(300);
    if (com1Action != fold) {
        $("#computer1CardABack").fadeOut(500);
        $("#computer1CardBBack").fadeOut(500);
        $("#computer1CardA").fadeIn(500);
        $("#computer1CardB").fadeIn(500);
    }
    if (com2Action != fold) {
        $("#computer2CardABack").fadeOut(500);
        $("#computer2CardBBack").fadeOut(500);
        $("#computer2CardA").fadeIn(500);
        $("#computer2CardB").fadeIn(500);
    }
    if (com3Action != fold) {
        $("#computer3CardABack").fadeOut(500);
        $("#computer3CardBBack").fadeOut(500);
        $("#computer3CardA").fadeIn(500);
        $("#computer3CardB").fadeIn(500);
    }
}

$(function () {
    $("#backButton").on("click", function () {
        $("#afterPoker").fadeOut(300);
        $("#beforePoker").fadeIn(300);
    })
})