<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Gw lagi gabut dan bikin UI calculator :v</title>
        <style>
            .container {
            width: 200px;
            margin: auto;
            margin-top: 100px;
            border: 2px solid black;
            border-radius: 10px;
            padding: 10px;
            background-color: lightgrey;
        }
            #number_input {
            width: 95%;
            height: 20px;
            margin-bottom: 10px;
            text-align: right;
            font-size: 24px;
            border: 1px solid black;
            border-radius: 5px;
            padding: 5px;
            background-color: white;
        }
            #button_container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 5px;
        }
        </style>
        <script src="makeuiworks.js"></script>
</head>
            
<body>
    <div class="container">
        <div id="number_display">
            <input type="text" id="number_input" value="0" disabled>
        </div>
        <div id="button_container">
            <button id="clear_btn">C</button>
            <button id="plus_or_minus_btn">+/-</button>
            <button id="percent_btn">%</button>
            <button id="delete_btn"><</button>
            <button id="seven_btn">7</button>
            <button id="eight_btn">8</button>
            <button id="nine_btn">9</button>
            <button id="divide_btn">÷</button>
            <button id="four_btn">4</button>
            <button id="five_btn">5</button>
            <button id="six_btn">6</button>
            <button id="multiply_btn">x</button>
            <button id="one_btn">1</button>
            <button id="two_btn">2</button>
            <button id="three_btn">3</button>
            <button id="minus_btn">-</button>
            <button id="zero_btn">0</button>
            <button id="dot_btn">.</button>
            <button id="equals_btn">=</button>
            <button id="plus_btn">+</button>
        </div>
    </div>
</body>
</html>
