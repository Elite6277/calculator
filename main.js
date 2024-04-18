// const calculator = (firstNumber, operator, secondNumber) => {
//   switch (operator) {
//     case "+":
//       return firstNumber + secondNumber
//     case "-":
//       return firstNumber - secondNumber
//     case "*":
//       return firstNumber * secondNumber
//     case "/":
//       return firstNumber / secondNumber
//     default:
//       return "Nadogry simbol"
//   }
// }

// alert(calculator(1, "&", 2))

// const calculator = () => {
//   const firstNumber = parseInt(prompt("1nji sany girizin:"))
//   const simbol = prompt("gosmak,ayyrmak,bolmek,kopeltmek opertaorlary:girizin:")
//   const secondNumber = parseInt(prompt("2nji sany girizin:"))
//   if (simbol == "+") {
//     console.log(firstNumber + secondNumber)
//   } else if (simbol == "+") {
//     console.log(firstNumber + secondNumber)
//   } else if (simbol == "-") {
//     console.log(firstNumber - secondNumber)
//   } else if (simbol == "*") {
//     console.log(firstNumber * secondNumber)
//   } else if (simbol == "/") {
//     console.log(firstNumber / secondNumber)
//   } else alert("Nadogry operator ya belgi")
// }

// calculator()

// const calculator = () => {
//   const operators = document.querySelectorAll(".symbols")

//   operators.forEach((item) => {
//     item.addEventListener("click", (e) => {
//       const text = e.textContext
//       if (text == "+") {
//         text = "dsa"
//       }
//     })
//   })
// }

// calculator()

// Калькулятор интерактивный
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".calculator input")
  const symbols = document.querySelectorAll(".calculator .symbols div")

  // Добавляем обработчик клика для каждого символа
  symbols.forEach((symbol) => {
    symbol.addEventListener("click", () => {
      const clickedSymbol = symbol.textContent // Получаем текст символа
      if (clickedSymbol === "C") {
        // Очищаем поле ввода при нажатии на "C"
        input.value = "0"
      } else if (clickedSymbol === "<=") {
        // Удаляем последний символ при нажатии на "<="
        input.value = input.value.slice(0, -1)
      } else if (clickedSymbol === "=") {
        // Вычисляем результат при нажатии на "="
        try {
          input.value = eval(input.value)
        } catch (error) {
          input.value = "Error"
        }
      } else {
        // Добавляем символ к текущему значению поля ввода
        if (input.value == 0) {
          input.value = ""
        }
        input.value += clickedSymbol
      }
    })
  })
})

//Snow
const Snow = (canvas, count, options) => {
  const ctx = canvas.getContext("2d")
  const snowflakes = []

  const add = (item) => snowflakes.push(item(canvas))

  const update = () => snowflakes.forEach((el) => el.update())

  const resize = () => {
    ctx.canvas.width = canvas.offsetWidth
    ctx.canvas.height = canvas.offsetHeight

    snowflakes.forEach((el) => el.resized())
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
    snowflakes.forEach((el) => el.draw())
  }

  const events = () => {
    window.addEventListener("resize", resize)
  }

  const loop = () => {
    draw()
    update()
    animFrame(loop)
  }

  const init = () => {
    for (let i = 0; i < count; i++) {
      add((canvas) => SnowItem(canvas, null, options))
    }
    events()
    loop()
  }

  init(count)
  resize()

  return { add, resize }
}

const defaultOptions = {
  color: "orange",
  radius: [0.5, 3.0],
  speed: [1, 3],
  wind: [-0.5, 3.0],
}

const SnowItem = (canvas, drawFn = null, opts) => {
  const options = { ...defaultOptions, ...opts }
  const { radius, speed, wind, color } = options
  const params = {
    color,
    x: Math.random() * canvas.offsetWidth,
    y: Math.random() * -canvas.offsetHeight,
    radius: getRandomArbitrary(...radius),
    speed: getRandomArbitrary(...speed),
    wind: getRandomArbitrary(...wind),
    isResized: false,
  }
  const ctx = canvas.getContext("2d")

  const updateData = () => {
    params.x = Math.random() * canvas.offsetWidth
    params.y = Math.random() * -canvas.offsetHeight
  }

  const resized = () => (params.isResized = true)

  const drawDefault = () => {
    ctx.beginPath()
    ctx.arc(params.x, params.y, params.radius, 0, 2 * Math.PI)
    ctx.fillStyle = params.color
    ctx.fill()
    ctx.closePath()
  }

  const draw = drawFn ? () => drawFn(ctx, params) : drawDefault

  const translate = () => {
    params.y += params.speed
    params.x += params.wind
  }

  const onDown = () => {
    if (params.y < canvas.offsetHeight) return

    if (params.isResized) {
      updateData()
      params.isResized = false
    } else {
      params.y = 0
      params.x = Math.random() * canvas.offsetWidth
    }
  }

  const update = () => {
    translate()
    onDown()
  }

  return {
    update,
    resized,
    draw,
  }
}

const el = document.querySelector(".container")
const wrapper = document.querySelector("body")
const canvas = document.getElementById("snow")

const animFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame

Snow(canvas, 150, { color: "white" })

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}
